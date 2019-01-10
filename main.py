"""This app returns prediction of sent photo and also handles reports of invalid predictions."""

__author__ = u"Patryk Niedźwiedziński"

import base64
import json
import os
import random
import uuid
import sys

import boto3
import botocore
import keras
import numpy as np
import redis
import tensorflow as tf
from flask import Flask, Response, jsonify, redirect, request, send_file
from PIL import Image

from net.train import model

templates = os.path.abspath("./public")
app = Flask(__name__, template_folder=templates, static_folder="build/static")

def auc(y_true, y_pred):
    auc = tf.metrics.auc(y_true, y_pred)[1]
    keras.backend.get_session().run(tf.local_variables_initializer())
    return auc

global graph
graph = tf.get_default_graph()
model.load_weights("first_try.h5")

s3 = boto3.resource('s3')

app.secret_key = os.environ["SECRET"]

# Redis db for reported images
redis_store = redis.Redis.from_url(os.environ["REDIS_APPLES_URL"])

# Redis db for sessions
session = redis.Redis.from_url(os.environ["REDIS_URL"])

def upload_file(filename):
    """This method upload given file to S3 Bucket."""
    s3.Bucket(os.environ['S3_BUCKET']).upload_file(Filename=filename, Key=filename[4:])
    print("\033[92m-- Uploaded {} --\033[0m".format(filename))


def add_headers(resp):
    """This adds headers needed for cross origin fetches."""
    resp.headers["Access-Control-Allow-Origin"] = "*"
    return resp


@app.route("/")
def index():
    return redirect("https://prd-ev.github.io/isthis/")


# Prediction

@app.route("/predict/", methods=["POST"])
def predict():
    """This endpoint returns predicted label of given photo."""
    img = Image.open(request.files["image"].stream)

    # Image preprocessing
    width, height = img.size
    crop_rectangle = ((width - height)//2, 0, (width - height)//2 + height, height)
    cropped = img.crop(crop_rectangle)
    img = cropped.resize((150, 150))
    img = img.rotate(-90)
    
    # Predict
    arr = keras.preprocessing.image.img_to_array(img)
    arr = np.array([arr])
    with graph.as_default():
        prediction = model.predict(arr)
    return add_headers(jsonify({"data": prediction.tolist()}))


# Reporting and labeling

@app.route("/report/", methods=["POST"])
def report_post():
    """
    Endpoint for reporting invalid prediction.
    
    Request:
        - form["label"] - contains label that prediction should return
        - files["image"] - original photo
    """
    label = str(request.form["label"])
    img = Image.open(request.files["image"].stream)

    # crop image to 150x150
    width, height = img.size
    crop_rectangle = (
        (width - height)//2,
        0,
        (width - height)//2 + height,
        height)
    cropped = img.crop(crop_rectangle)
    img = cropped.resize((150, 150))
    img = img.rotate(-90)

    # save image
    filename = "tmp/" + str(int(redis_store.get('max')) + 1) + ".jpeg"
    img.save(filename)
    upload_file(filename)

    # save to redis
    redis_store.incr('max')
    redis_store.set(filename, int(label))

    return add_headers(Response())


@app.route("/report/", methods=["GET"])
def report_get():
    """Endpoint for returning image to label."""

    # Select random image
    try:
        idx = random.randint(1, int(redis_store.get('max')))
    except TypeError:
        return add_headers(Response("DB Error, contact admin"))
    except ValueError:
        return add_headers(Response("Empty dataset, report something"))

    filename = str(idx) + ".jpeg"
    
    # Open file and encode
    data = 'https://' + os.environ['S3_BUCKET'] + '.s3.amazonaws.com/' + filename

    # Save image id to session
    if "key" not in request.args:
        session_id = str(uuid.uuid4())
    else:
        session_id = request.args.get("key")

    session.set(session_id, 'tmp/' + filename)
    print("\033[92m-- User {} will label {} --\033[0m".format(session_id, filename))

    return add_headers(jsonify({"data": data, "key": session_id}))


@app.route("/label/", methods=["POST"])
def report_update():
    """Endpoint to send label of image."""

    valid_request = "key" in request.args and "label" in request.args

    if not valid_request:
        return add_headers(Response("Invalid request", status=400))

    idx = session.get(request.args["key"])
    prev = redis_store.get(idx)
    label = request.args["label"]

    # apple = +1, not-apple = -1
    if label == "apple":
        redis_store.incr(idx)
    elif label == "not-apple":
        redis_store.decr(idx)

    # Reset session
    now = redis_store.get(idx)
    print("\033[92m-- Labeled {} from {} to {} as {}--\033[0m".format(idx, prev, now, label))
    session.set(request.args.get("key"), 0)

    return add_headers(Response(str(prev) + str(now)))


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")

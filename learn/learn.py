"""This app handles reports of invalid predictions."""

__author__ = u"Patryk Niedźwiedziński"

import base64
import random
import json
import uuid

import redis
from flask import Flask, Response, jsonify, redirect, request, send_file
from PIL import Image

app = Flask(__name__)

# load secret key from configuration file
with open("../learn.json") as fp:
    config = json.load(fp)
    app.secret_key = config['key']
    redis_password = config['redis']

# Redis db for reported images
redis_store = redis.Redis(host='redis', port=6379, db=0, password=redis_password)

# Redis db for sessions
session = redis.Redis(host='redis', port=6379, db=1, password=redis_password)


def add_headers(resp):
    """This adds headers needed for cross origin fetches."""
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp


@app.route('/')
def index():
    """Index view, redirects to frontend."""
    return redirect('https://prd-ev.github.io/isthis/')


@app.route('/report/', methods=["POST"])
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
    filename = 'tmp/' + str(redis_store.dbsize() + 1) + '.jpeg'
    img.save(filename)

    # save to redis
    redis_store.set(filename, int(label))

    return add_headers(Response())


@app.route('/report/', methods=["GET"])
def report_get():
    """Endpoint for returning image to label."""

    # Select random image
    try:
        idx = random.randint(1, redis_store.dbsize())
    except ValueError:
        return add_headers(Response("Empty dataset, report something"))

    filename = 'tmp/' + str(idx) + '.jpeg'
    
    # Open file and encode
    with open(filename, "rb") as image_file:
        data = base64.b64encode(image_file.read())

    # Save image id to session
    if "key" not in request.args:
        session_id = str(uuid.uuid4())
    else:
        session_id = request.args.get("key")

    session.set(session_id, filename)

    return add_headers(jsonify({"data": str(data), "key": session_id}))


@app.route("/label/", methods=["POST"])
def report_update():
    """Endpoint to send label of image."""

    valid_request = "key" in request.args and "label" in request.args

    if not valid_request:
        return add_headers(Response("Invalid request", status=400))

    idx = session.get(request.args['key'])
    prev = redis_store.get(idx)
    label = request.args['label']

    # apple = +1, not-apple = -1
    if label == "apple":
        redis_store.incr(idx)
    elif label == "not-apple":
        redis_store.decr(idx)

    # Reset session
    session.set(request.args.get('key'), 0)

    return add_headers(Response(str(prev) + str(redis_store.get(idx))))


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)

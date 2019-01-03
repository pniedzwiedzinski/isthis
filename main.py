"""This app returns prediction of sent photo."""

__author__ = u"Patryk Niedźwiedziński"

import os

import keras
import numpy as np
import tensorflow as tf
from flask import Flask, Response, jsonify, redirect, request, send_file
from PIL import Image

from net.train import model

templates = os.path.abspath('./public')
app = Flask(__name__, template_folder=templates, static_folder='build/static')

def auc(y_true, y_pred):
    auc = tf.metrics.auc(y_true, y_pred)[1]
    keras.backend.get_session().run(tf.local_variables_initializer())
    return auc

global graph
graph = tf.get_default_graph()
model.load_weights('first_try.h5')

@app.route('/')
def index():
    return redirect('https://prd-ev.github.io/isthis/')

@app.route('/predict/', methods=["POST"])
def predict():
    img = Image.open(request.files["image"].stream)
    width, height = img.size
    crop_rectangle = ((width - height)//2, 0, (width - height)//2 + height, height)
    cropped = img.crop(crop_rectangle)
    img = cropped.resize((150, 150))
    img = img.rotate(-90)
    arr = keras.preprocessing.image.img_to_array(img)
    arr = np.array([arr])
    with graph.as_default():
        prediction = model.predict(arr)
    resp = jsonify({"data": prediction.tolist()})
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp



if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')

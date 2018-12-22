from flask import Flask, render_template, jsonify, request, send_file
import os
import tensorflow as tf
import keras
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
    return render_template("index.html")

@app.route('/predict/', methods=["POST"])
def predict():
    img = keras.preprocessing.image.load_img(request.files["image"])
    arr = keras.preprocessing.image.img_to_array(img)
    resp = jsonify({"data": {"apple": 6.6, "not_apple": 93.4}})
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
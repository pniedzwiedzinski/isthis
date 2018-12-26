from flask import Flask, redirect, session, Response, request, send_file, jsonify
from PIL import Image
from flask_redis import FlaskRedis
import random
import base64

app = Flask(__name__)
app.secret_key = "secret" #TODO
app.config["REDIS_URL"] = "redis://:@redis:6379/0"
redis_store = FlaskRedis(app)

def returns(resp):
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

@app.route('/')
def index():
    return redirect('https://prd-ev.github.io/isthis/')

@app.route('/report/', methods=["POST"])
def report_post():
    label = str(request.form["label"])
    img = Image.open(request.files["image"].stream)
    width, height = img.size
    crop_rectangle = ((width - height)//2, 0, (width - height)//2 + height, height)
    cropped = img.crop(crop_rectangle)
    img = cropped.resize((150, 150))
    filename = 'tmp/' + redis_store.dbsize() + 1 + '.jpeg'
    img.save(filename)
    redis_store.set(filename, int(label))
    return returns(Response())

@app.route('/report/', methods=["GET"])
def report_get():
    try:
        idx = random.randint(1, redis_store.dbsize())
    except ValueError:
        return returns("Empty dataset, report something")
    filename = '../tmp/' + idx + '.jpeg'
    session['idx'] = filename
    with open(filename, "rb") as image_file:
        data = base64.b64encode(image_file.read())
    print(request.headers)
    print(session)
    return returns(jsonify({"data": str(data)}))

@app.route("/label/<label>/", methods=["POST"])
def report_update(label):
    print(request.headers)
    print(session)
    print("---------")
    idx = session['idx']
    prev = redis_store.get(idx)
    if label == "apple":
        redis_store.incr(idx)
    else:
        redis_store.decr(idx)
    session['idx'] = None
    return returns(Response(str(redis_store.get(idx)) + ' ' + str(prev)))


if __name__ == "__main__":
    app.run(port=5001, debug=True)
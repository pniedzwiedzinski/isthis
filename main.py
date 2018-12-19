from flask import Flask, render_template, jsonify, request, send_file

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/predict/', methods=["POST"])
def predict():
    img = request.files["image"]
    resp = jsonify({"data": {"apple": 6.6, "not_apple": 93.4}})
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp


if __name__ == "__main__":
    app.run(debug=True)
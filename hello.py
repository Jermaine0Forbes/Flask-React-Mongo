from flask import Flask
from flask import request
from markupsafe import escape 

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p> Hello World</p>"

@app.route("/hello")
def hello():
    name = request.args.get("name", "Flasks")
    return f"Hello, {escape(name)}!"
@app.post("/user")
def user():
    users = request.args.lists()
    return users
    # return [ user.to_json() for user in users ]
import sys
import os
# sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from flask import Flask
from flask import request
from markupsafe import escape 
from .blueprints.user_routes import user_bp
from .config.config import Config


app = Flask(__name__)

app.config.from_object(Config)
# app.config.from_object('Config')
# app.secret_key = app.config["SECRET_KEY"]
app.secret_key = Config.SECRET_KEY

app.register_blueprint(user_bp, url_prefix = "/user")

@app.route("/")
def hello_world():
    return f"<p> Hello World, {Config.ENVIRONMENT}</p>"

@app.route("/hello")
def hello():
    name = request.args.get("name", "Flasks")
    name =  app.config["SECRET_KEY"]
    return f"Hello, {escape(name)}!"
    # return f"Hello, {escape(name)}!"


if __name__ == "__main__":
    # app.run(debug=app.config["DEBUG"])
    app.run(debug=Config.DEBUG)
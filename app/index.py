from flask import request, render_template, Flask
from markupsafe import escape 
from .blueprints.user_routes import user_bp
from .config.config import Config


app = Flask(__name__)

app.config.from_object(Config)
app.secret_key = Config.SECRET_KEY

app.register_blueprint(user_bp, url_prefix = "/user")

@app.route("/", methods=['GET', 'POST'])
def hello_world():
    # return f"<p> Hello World, {Config.ENVIRONMENT}</p>"
    return render_template('view/public/index.html')

@app.route("/hello")
def hello():
    name = request.args.get("name", "Flasks")
    name =  app.config["DEBUG"]
    return f"Hello, {escape(name)}!"



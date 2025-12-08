from flask import request, render_template, Flask
from markupsafe import escape 
from .blueprints.user_routes import user_bp
from .config.config import Config
from flask_bcrypt import Bcrypt
from flask_cors import CORS


app = Flask(__name__, template_folder="view/build", static_folder="view/build/static")
bcrypt = Bcrypt(app)
app.config.from_object(Config)
app.secret_key = Config.SECRET_KEY
app.config['BCRYPT'] = bcrypt

app.register_blueprint(user_bp, url_prefix = "/user")
CORS(app, resources={r"/user/*": { "origins" : [Config.ALLOWED_ORIGIN]}})

@app.route("/", methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route("/hello")
def hello():
    name = request.args.get("name", "Flasks")
    name =  app.config["DEBUG"]
    return f"Hello, {escape(name)}!"



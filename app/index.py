from flask import request, render_template, Flask
from markupsafe import escape 
from .blueprints.user_routes import user_bp
from .config.config import Config
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from sqlalchemy import create_engine, text
from sqlalchemy_utils import database_exists
from .models.sqlalchemy.user import Base


app = Flask(__name__, template_folder="view/build", static_folder="view/build/static")
bcrypt = Bcrypt(app)
app.config.from_object(Config)
app.secret_key = Config.SECRET_KEY
app.config['BCRYPT'] = bcrypt

def init_db():
    print("attempting to connect")
    DB_URL = f"{Config.ALCHEMY_DATABASE_URI}/{Config.DB_NAME}"
    try:
        if Config.ALCHEMY_DATABASE_URI is not None:
            if not database_exists(DB_URL):
                engine = create_engine(Config.ALCHEMY_DATABASE_URI, echo=True)
                with engine.connect() as connection:
                    connection.execute(text(f"CREATE DATABASE IF NOT EXISTS {Config.DB_NAME}"))
                    connection.commit()
                    print(f"database {Config.DB_NAME}, has been created!")
            engine = create_engine(DB_URL, echo=True)
            Base.metadata.create_all(engine)
            print("database has been connected")
    except Exception as e:
           print(e)


app.register_blueprint(user_bp, url_prefix = "/user")
CORS(app, resources={r"/user/*": { "origins" : [Config.ALLOWED_ORIGIN]}})

     
@app.before_request
def before_everything():
     init_db()

@app.route("/", methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route("/hello")
def hello():
    name = request.args.get("name", "Flasks")
    name =  app.config["DEBUG"]
    return f"Hello, {escape(name)}!"



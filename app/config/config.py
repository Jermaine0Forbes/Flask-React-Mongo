from os import environ, path
from dotenv import load_dotenv

basedir = path.abspath("../app/config/"+path.dirname(__file__))
load_dotenv(path.join(basedir, '.env'))

class Config:
    SECRET_KEY = environ.get("SECRET_KEY")
    DEBUG = environ.get("DEBUG")
    ENVIRONMENT = environ.get("ENVIRONMENT")
    ALCHEMY_DATABASE_URI = environ.get("DATABASE_URL")
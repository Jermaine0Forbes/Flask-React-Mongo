import os

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY")
    DEBUG = os.environ.get("DEBUG")
    ENVIRONMENT = os.environ.get("ENVIRONMENT")
    ALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL")
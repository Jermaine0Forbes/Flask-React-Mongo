# user_routes.py
from flask import Blueprint, request, jsonify, current_app
from marshmallow import  ValidationError
from ..validation.login_validation import LoginSchema
import uuid

user_bp = Blueprint('user', __name__)


@user_bp.route('/profile')
def profile():
    return "User Profile"

@user_bp.route('/settings')
def settings():
    return "User Settings"

@user_bp.post("/signup")
def signup():
    json = request.json 
    schema = LoginSchema()
    if json is not None:
        try:
           
            user = schema.load(data = json)
            if isinstance(user, dict):
                bcrypt = current_app.config['BCRYPT']
                pswd = user.get("password")
                hashed = bcrypt.generate_password_hash(pswd).decode('utf-8')
                user.update({'password': hashed,  "uuid": uuid.uuid4()})
            return jsonify(user)
        except ValidationError as err:
            return jsonify(err.messages)
    else:
        return "Invalid json request data", 400

@user_bp.post("/login")
def login():
    json = request.json 
    schema = LoginSchema()
    if json is not None:
        try:
           
            user = schema.load(data = json)
            if isinstance(user, dict):
                bcrypt = current_app.config['BCRYPT']
                pswd = user.get("password")
                hashed = bcrypt.generate_password_hash(pswd).decode('utf-8')
                user.update({'password': hashed})
            return jsonify(user)
        except ValidationError as err:
            return jsonify(err.messages)
    else:
        return "Invalid json request data", 400
    

if __name__ == "__main__":
    print('inside user routes')
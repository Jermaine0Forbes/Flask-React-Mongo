# user_routes.py
from flask import Blueprint, request, jsonify
from marshmallow import  ValidationError
from ..validation.login_validation import LoginSchema

user_bp = Blueprint('user', __name__)

@user_bp.route('/profile')
def profile():
    return "User Profile"

@user_bp.route('/settings')
def settings():
    return "User Settings"

@user_bp.post("/json")
def user():
    json = request.json 
    print(type(json))
    schema = LoginSchema()

    if json is not None:
        try:
            user = schema.load(data = json)
            return jsonify(user)
        except ValidationError as err:
            return jsonify(err.messages)
    else:
        return "Invalid json request data", 400
    

if __name__ == "__main__":
    print('inside user routes')
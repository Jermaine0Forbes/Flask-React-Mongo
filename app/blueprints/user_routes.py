# user_routes.py
from flask import Blueprint, request

user_bp = Blueprint('user', __name__)

@user_bp.route('/profile')
def profile():
    return "User Profile"

@user_bp.route('/settings')
def settings():
    return "User Settings"

@user_bp.post("/json")
def user():
    users = {}

    if request.is_json :
        users = request.json
    
    users["foo"] = "bar"
    return users

if __name__ == "__main__":
    print('inside user routes')
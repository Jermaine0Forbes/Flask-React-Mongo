# user_routes.py
from flask import Blueprint, request, jsonify, current_app, abort, make_response
from marshmallow import  ValidationError
from ..validation.login_validation import LoginSchema
import uuid
import secrets
import jwt
import datetime
from sqlalchemy import select
from sqlalchemy.orm import Session
from ..models.sqlalchemy.user import User
from ..models.mongo.user import User as UserM

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
            if "password2" in json:
                del json['password2']
            user = schema.load(data = json)
            if isinstance(user, dict):
                bcrypt = current_app.config['BCRYPT']
                engine = current_app.config['ENGINE']
                username, password = user.values()
                stmt = select(User).where(User.username == username)
                with Session(engine) as session:
                        
                    result =  session.execute(stmt)

                    if result.first() is None:
                        hashed = bcrypt.generate_password_hash(password).decode('utf-8')
                        unique = uuid.uuid4().__str__()
                        register = User(username=username, password=hashed, uuid=unique)
                        session.add(register)
                        session.commit()
                    
                    else:
                        abort(400, "Username already exists" )
                    
                payload = {
                    "uuid": unique,
                        "username": username,
                        "exp": datetime.datetime.now() + datetime.timedelta(days=30),
                        "iat": datetime.datetime.now(),
                        "iss": request.base_url,
                }
                SECRET_KEY = secrets.token_hex()
                encoded = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
                return jsonify({"jwt": encoded, "uuid": unique})
        except ValidationError as err:
            return jsonify(err.messages)
    else:
        return  make_response("Invalid json request data",400)
    return "something went wrong", 400

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
    
@user_bp.post("/create/mongo")
def create_mongo():
    json = request.json 
    if json is not None:
        try:
          user = UserM()
          result = user.create(json)
        
          if result is dict:
            return jsonify({ "message":"success", "status":200, "data": result })
          else:
            return jsonify({ "message":"no data been retrieved", "status":500})
          
        except ValidationError as err:
            return jsonify(err.messages)
    else: 
        return jsonify({ "message":"Invalid json request data", "status":400})
    

if __name__ == "__main__":
    print('inside user routes')
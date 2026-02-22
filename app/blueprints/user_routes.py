# user_routes.py
from flask import Blueprint, request, jsonify, current_app, abort, make_response
from marshmallow import  ValidationError
from ..validation.login_validation import LoginSchema
import uuid
import jwt
import datetime
from sqlalchemy import select
from sqlalchemy.orm import Session
from ..models.sqlalchemy.user import User
from ..models.mongo.user import User as UserM
from ..config.utils import jwt_expired as expired

user_bp = Blueprint('user', __name__)


@user_bp.route('/profile')
def profile():
    auth  = request.headers.get("Authorization")
    isMongo = current_app.config['MONGO_ON']
    if not auth:
        return jsonify({"message": "Authorization header is missing"}), 401
    if auth is not None:
         try:
            parts = auth.split()
            if parts is not None and parts[0].lower() == 'bearer':
                token = parts[1]
                SECRET_KEY = current_app.config['SECRET_KEY']
                result = jwt.decode(jwt=token, key=SECRET_KEY, algorithms=["HS256"])

                if expired(result):
                    return jsonify({'message': 'jwt has expired'}), 400
                
                if isMongo:
                    userMongo = UserM()
                    user = userMongo.get_user(result['uuid'])
                    return jsonify(user), 200
                else:
                     return jsonify({'message': 'did not set up sql yet to fetch user'}), 500

            else:

                return jsonify({'message': 'decode failed'}), 500
         except Exception as err:

          return jsonify({'message': err}), 500
    else:
      return jsonify({ "message":"Invalid json request data"}), 400

@user_bp.route('/settings')
def settings():
    return "User Settings"

@user_bp.post("/signup")
def signup():
    json = request.json 
    schema = LoginSchema()
    isMongo = current_app.config['MONGO_ON']
    userMongo = UserM()
    if json is not None:
        try:
            if "password2" in json:
                del json['password2']
            user = schema.load(data = json)
            if isinstance(user, dict):
                bcrypt = current_app.config['BCRYPT']
                username = user['username']
                password = user['password']
                hashed = bcrypt.generate_password_hash(password).decode('utf-8')
                unique = uuid.uuid4().__str__()

                if isMongo :
                    if userMongo.user_exists(username):
                         abort(400, "Username already exists" )
                    userMongo.create(json | { password: hashed, 'uuid': unique})
                else:
                    engine = current_app.config['ENGINE']
                    stmt = select(User).where(User.username == username)
                    with Session(engine) as session:
                            
                        result =  session.execute(stmt)

                        if result.first() is None:

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
                SECRET_KEY = current_app.config['SECRET_KEY']
                # SECRET_KEY = secrets.token_hex()
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
    isMongo = current_app.config['MONGO_ON']
    userMongo = UserM()
    if json is not None:
        try: 
            user = schema.load(data = json)
            if isinstance(user, dict):
                pswd = user.get("password")
                username = user['username']
                if isMongo and userMongo.user_exists(username):
                    bcrypt = current_app.config['BCRYPT']
                    um = userMongo.get_creds(username)
                    if  bcrypt.checkpw(pswd, um['password']):
                        print("password is valid")
                    else:
                        abort(400, "password is invalid")
                else:
                    print('sql logic happening')
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
            return jsonify({ "message":"no data has been retrieved", "status":500})
          
        except ValidationError as err:
            return jsonify(err.messages)
    else: 
        return jsonify({ "message":"Invalid json request data", "status":400})
    

if __name__ == "__main__":
    print('inside user routes')
from datetime import datetime, timedelta
import jwt
from flask import Flask, Request

def is_str(val) -> str :
    return val if isinstance(val,str) else ""

def jwt_expired(jwt:dict) -> bool:
    exp = jwt['exp']
    return True if  int(datetime.now().timestamp()) >= exp else False

def jwt_encode(user: dict, req: Request,  app: Flask) -> str :
    if "uuid" not in user and  "username" not in user :
        raise Exception("user does not have the properties to create a successful jwt")
    
    payload = {
        "uuid": user["uuid"],
        "username": user["username"],
        "exp":datetime.now() + timedelta(days=30),
        "iat": datetime.now(),
        "iss": req.base_url,
    }

    SECRET_KEY = app.config['SECRET_KEY']

    encoded = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    
    return encoded
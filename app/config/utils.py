from datetime import datetime

def is_str(val) -> str :
    return val if isinstance(val,str) else ""

def jwt_expired(jwt:dict) -> bool:
    exp = jwt['exp']
    return True if  int(datetime.now().timestamp()) >= exp else False
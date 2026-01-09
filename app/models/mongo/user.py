from types import NoneType
from datetime import datetime

class User:

    __collection: str = "users"

    def __init__(self, id, user,  username, password, phone, address, email, position, location, uuid, created_at, updated_at):
        
        if isinstance(user, dict):
            for key, value in  user.items():

                if key in ['created_at', 'updated_at']:
                    try:
                        if isinstance(value, datetime) or isinstance(value, NoneType):
                            setattr(self, key, value)
                            continue
                        else:
                            raise ValueError(f"{key} is not datetime or null")
                    except Exception as e:
                        print(e)
                    

                try:
                    if not isinstance(value, str):
                        raise ValueError(f"{key} is not type string")
                    setattr(self,key, value)
                except Exception as e:
                    print(e)
                           
        else:
            self.id: int = id
            self.username: str = username
            self.password: str = password
            self.phone: str = phone
            self.address: str = address        
            self.email: str = email
            self.position: str = position
            self.location: str = location
            self.uuid: str = uuid
            self.created_at: datetime = created_at
            self.updated_at: datetime  = updated_at
    
    @property
    def name(self):
        return self.__collection

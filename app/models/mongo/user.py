from types import NoneType
from datetime import datetime
from typing import Any
from .model import Model

class User(Model):

    __collection: str = "users"

    def __init__(self):
        
       connected = self.connect(self.name)

       if connected is None:
            raise Exception("Collection has not been connected")
   
    def create(self, data: dict) -> None:
        self.has_required(data)
        
        data['created_at'] = datetime.now()

        self.save(data)
        pass

    def update(self, data: dict):
        if ['username', 'password'] not in data.keys():
            raise Exception("username and password are required fields")
        
        data['updated_at'] = datetime.now()
        self.save(data)
        pass
       
    
    @property
    def name(self) -> str :
        return self.__collection
    
    @classmethod
    def getName(cls) -> str:
        return cls.__collection
    
    def __getitem__(self, name:str) -> Any:
        return getattr(self, name)

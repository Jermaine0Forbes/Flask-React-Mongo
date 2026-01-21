from types import NoneType
from datetime import datetime
from typing import Any
from model import Model

class User(Model):

    __collection: str = "users"

    def __init__(self):
        
       connected = self.connect(self.name)

       if connected is None:
            raise Exception("Collection has not been connected")

       
    
    @property
    def name(self) -> str :
        return self.__collection
    
    def __getitem__(self, name:str) -> Any:
        return getattr(self, name)

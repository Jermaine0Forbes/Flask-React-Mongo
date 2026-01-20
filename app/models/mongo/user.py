from types import NoneType
from datetime import datetime
from typing import Any
from model import Model

class User(Model):

    __collection: str = "users"

    def __init__(self):
        
        self.connect(self.name)
    
    @property
    def name(self) -> str :
        return self.__collection
    
    def __getitem__(self, name:str) -> Any:
        return getattr(self, name)

import pymongo
from pymongo.collection import Collection
from types import NoneType
from ...config.config import Config
from ...config.utils import is_str

class Model:

    __db: Collection | NoneType = None

    def __init__(self):
        pass

    def create(self):
        pass

    def update(self):
        pass

    def delete(self):
        pass

    @property
    def db(self):
        return self.__db
    
    @db.setter
    def deb(self, val):
        self.__db = val

    def connect(self, coll: str):
        client = pymongo.MongoClient(Config.MONGO_CONNECTION)
        db_name = Config.DB_NAME
        collection = None

        if  db_name is not None:
            db = client[db_name]
            if db_name in client.list_database_names():
                collection = db[is_str(coll)]
                self.db(collection)
            else: 
                raise Exception("database has not been created")
        else:
            raise Exception('cannot find database name')
        return collection 

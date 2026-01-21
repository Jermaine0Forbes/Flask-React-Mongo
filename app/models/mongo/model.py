import pymongo
from pymongo.collection import Collection
from types import NoneType
from ...config.config import Config
from ...config.utils import is_str

class Model:

    __db: Collection | NoneType = None

    def __init__(self):
        pass

    def save(self, data: dict) -> None:
        if self.db is  None:
            raise Exception("Database collection is not connected")
        
        result = self.db.insert_one(data)

        if result.acknowledged is False:
            raise Exception("Data has not been saved")
        else:
            print("Data has been saved")
        pass


    def delete(self):
        pass

    @property
    def db(self):
        return self.__db
    
    @db.setter
    def db(self, val):
        self.__db = val

    def connect(self, coll: str):
        client = pymongo.MongoClient(Config.MONGO_CONNECTION)
        db_name = Config.DB_NAME
        collection = None

        if  db_name is not None:
            db = client[db_name]
            if db_name in client.list_database_names():
                collection = db[is_str(coll)]
                if collection is not None:
                    self.db = collection
            else: 
                raise Exception("database has not been created")
        else:
            raise Exception('cannot find database name')
        return collection 

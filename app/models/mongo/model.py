import pymongo
from pymongo.collection import Collection
from types import NoneType
from typing import List
from ...config.config import Config
from ...config.utils import is_str

class Model:

    __db: Collection | NoneType = None
    __required: List[str] = []
    __collection: str = ""

    def __init__(self):
        pass

    def has_required(self, data:dict):
         
         if not self.required:
             print(self.getName()+" has no required fields")
             return True
   
         if list(set(self.required) - set(data.keys())):
             arr = ", ".join(self.required)
             raise Exception(arr+" are required fields")
         
         print(self.getName()+" required fields are present")
         

    def save(self, data: dict):
        if self.db is  None:
            raise Exception("Database collection is not connected")
        
        print('preparing to save data')
        result = self.db.insert_one(data)

        if result.acknowledged is False:
            raise Exception("Data has not been saved")
        else:
            print("Data has been saved")
            return self.prepare_bson_data()
        
    def prepare_bson_data(self):

        if self.db is None:
            raise Exception("Database is not connected")

        bson =  self.db.find_one(sort=[('created_at', pymongo.DESCENDING)])

        if bson is None:
            raise Exception("There was no data found when fetching")
        
        bson['_id'] = str(bson['_id'])
        print("returning data back to user")
        return bson


    def delete(self):
        pass

    @property
    def db(self):
        return self.__db
    
    @db.setter
    def db(self, val):
        self.__db = val

    @property
    def required(self):
        return self.__required

    @required.setter
    def required(self, val:List[str]):
        self.__required = val


    @property
    def collection(self) -> str:
        return self.__collection
    
    @collection.setter
    def collection(self, val: str):
        self.__collection = val

    @classmethod
    def getName(cls) -> str:
        return cls.__collection


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

import pymongo
from ...config.config import Config
from ...config.utils import is_str

class Model:

    def __init__(self):
        pass

    def create(self):
        pass

    def update(self):
        pass

    def delete(self):
        pass

    def connect(self, coll: str):
        client = pymongo.MongoClient(Config.MONGO_CONNECTION)
        db_name = Config.DB_NAME
        collection = ""

        if  db_name is not None:
            db = client[db_name]
            if db_name in client.list_database_names():
                collection = db[is_str(coll)]
            else: 
                raise Exception("database has not been created")
        else:
            raise Exception('cannot find database name')
        return collection 

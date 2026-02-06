from .user import User
import pymongo
from ...config.utils import is_str

def import_models():
    return [User]



def init_mongo(connection_str: str, db_name: str):
    client = pymongo.MongoClient(connection_str)
    models = import_models()
    data = {
        "dummy": 'data',
    }
    db = None
    name = None

    if  db_name is not None:
        db = client[db_name]
        print(db)
        for model in models:
            name = model.getName() 
            print(f" collection name is {name}")
            collection = db[is_str(name)]
            if name not in db.list_collection_names():
                collection.insert_one(data)
                print(f"collection '{name}', has been created!")

        if db_name in client.list_database_names():
            print(f"database {db_name}, exists and is connected!")
        else: 
            raise Exception("database has not been created")
    else:
        raise Exception('cannot find database name')
    print(client.list_database_names())
    return db

from user import User
import pymongo

def init_mongo(connection_str: str, db_name: str):
    client = pymongo.MongoClient(connection_str)
    data = {
        "username": 'example',
        "password": 'password'
    }

    if  db_name is not None:
        db = client[db_name]
        print(db)
        if db_name in client.list_database_names():
            print(f"database {db_name}, has been created!")
            name = User.name 
            collection = db[name if isinstance(name,str) else ""]
            if "users" in db.list_collection_names():
                collection.insert_one(data)
                print(f"and collection 'users', has been created!")
                # app.config['MONGO_DB'] = db
            else:
                raise Exception("collection has not been created")
        else: 
            raise Exception("database has not been created")
    else:
        raise Exception('cannot find database name')
    print(client.list_database_names())

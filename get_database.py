from pymongo import MongoClient
from secret import CONNECTION_STRING

def get_database():
 
   # Provide the mongodb atlas url to connect python to mongodb using pymongo
 
   # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
   client = MongoClient(CONNECTION_STRING)
 
   # Create the database for our example
   return client['transactions']
  
# This is added so that many files can reuse the function get_database()
if __name__ == "__main__":   
  
   # Get the database
   dbname = get_database()

# venmo_api documentation: https://venmo.readthedocs.io/en/latest/
# Code for it ^ https://github.com/mmohades/Venmo
# Venmo API Unofficial Documentation: https://github.com/mmohades/VenmoApiDocumentation


# https://console.cloud.google.com/apis/credentials?project=gi-thetachi-np
# Created by Nick Procaccio

from datetime import datetime
from venmo_api import Client
from transaction import Transaction
from get_database import get_database
from add_to_sheet import add_row
from sort_by_org import find_org
from convert_time import convert
from summary import Summary
from dotenv import load_dotenv
load_dotenv()
import pymongo
import json
import re
import os

VENMO_EMAIL = os.environ.get('VENMO_EMAIL')
VENMO_PASSWORD = os.environ.get('VENMO_PASSWORD')
VENMO_USERNAME = os.environ.get('VENMO_USERNAME')
VENMO_ACCESS_TOKEN = os.environ.get('VENMO_ACCESS_TOKEN')
VENMO_USER_ID = os.environ.get('VENMO_USER_ID')

def transaction_string_to_json_dict(data):
    regex = "(\w+)\s?=\s?([\w.:/]+|\w+|[^,]+?),"
    main_data = re.findall(regex, data[:data.index("actor")-1])
    sub_data = re.findall(regex, data[data.index("actor=")+6:data.index("target=")-1])
    subsub_data = re.findall(regex, data[data.index("target=")+7:-1])
    
    main_dict = {key: value for key, value in main_data}
    sub_dict = {key: value for key, value in sub_data}
    subsub_dict = {key: value for key, value in subsub_data}
    
    main_dict["actor"] = sub_dict
    main_dict["target"] = subsub_dict
    
    return main_dict

def test_print(obj):
    print("Transaction ID: \t\t" + obj.id)
    print("Transaction Date: \t" + obj.date)
    print("Transaction Date Readable: \t" + str(obj.date_readable))
    print("Transaction Amount: \t\t" + obj.amount)
    print("Transaction Status: \t\t" + obj.status)
    print("Transaction Note: \t\t" + obj.note)
    print("Donor Username: \t\t" + obj.donor_username)
    print("Donor First Name: \t\t" + obj.donor_first_name)
    print("Donor Last Name: \t\t" + obj.donor_last_name)


def transaction_to_string(transaction):
    return f"(id={transaction.id}, payment_id={transaction.payment_id}, date_completed={transaction.date_completed}, date_created={transaction.date_created}, date_updated={transaction.date_updated}, payment_type={transaction.payment_type}, amount={transaction.amount}, audience={transaction.audience}, status={transaction.status}, note={transaction.note}, device_used={transaction.device_used}, actor={transaction.actor}, target={transaction.target}, comments={transaction.comments})"

#! ========================================= !#

# #* Initialize client using token
client = Client(access_token=VENMO_ACCESS_TOKEN)

#* Get the database
dbname = get_database()
t_collection = dbname["transaction"]
s_collection = dbname["summary"]
most_recent_transaction_logged = ""

#! If the database is NOT empty:
if 'transaction' in dbname.list_collection_names():

    # Amount that will be added to summary total_amount
    total_increase = 0.0

    # Get last transaction id and create abort flag
    most_recent_transaction_logged = t_collection.find().sort("date", pymongo.DESCENDING).limit(1).next()
    repeat_found = False

    # Get recent transactions
    print("===== Beginning Venmo transaction collection process! =====")
    transactions = client.user.get_user_transactions(user_id=VENMO_USER_ID)
    while transactions:
        for transaction in transactions:
            # Parse response string -> JSON object -> Transaction Object
            transaction_string = transaction_to_string(transaction)
            transaction_json_dict = transaction_string_to_json_dict(transaction_string)
            transaction_object = Transaction(
                transaction_json_dict['id'],
                transaction_json_dict['date_completed'],
                convert(datetime.fromtimestamp(int(transaction_json_dict['date_completed']))),
                float(transaction_json_dict['amount']),
                transaction_json_dict['status'],
                transaction_json_dict['note'],
                transaction_json_dict['actor']['username'],
                transaction_json_dict['actor']['first_name'],
                transaction_json_dict['actor']['last_name'],
                find_org(transaction_json_dict['note']))

            # If transaction is already stored in DB, stop collecting and adding
            if transaction_object.id == most_recent_transaction_logged['_id']:
                repeat_found = True
                break

            # If transaction is not in DB, add it to DB and sheet
            else:
                # Check if trasaction was outgoing
                if(str(transaction_object.donor_username).lower() != VENMO_USERNAME):
                    print("Adding transaction " + transaction_object.id + " to DB")

                    # Insert into MongoDb
                    transaction_json = transaction_object.to_json()
                    transaction_to_add = json.loads(transaction_json)
                    t_collection.insert_one(transaction_to_add)

                    # Add to sheet
                    print("Adding transaction " + transaction_object.id + " to Google Sheet")
                    add_row(transaction_object.to_list())

                    # Increment new amount to add to Summary
                    total_increase += transaction_object.amount


        # End collection if repeat transaction was found
        if repeat_found:
            print("=====   Ending Venmo transaction collection process!   =====")
            break

        # #? TESTING
        # print("=====   Ending Venmo transaction collection process EARLY for testing!   =====")
        # break;
        print("\n" + "=" * 15 + "\n\tNEXT PAGE\n" + "=" * 15 + "\n")
        transactions = transactions.get_next_page()
    
    # Get Summary Object
    summary_mongo_object = s_collection.find_one({ "_id": "1" })
    new_amount = summary_mongo_object["total_amount"] + total_increase
    new_date_last_updated = convert(datetime.now())             
    new_values = { "$set": { "total_amount": new_amount,  "date_last_updated": new_date_last_updated} }
    s_collection.update_one({"_id": "1"}, new_values)

            
#! If the database is empty
else:
    # Summary initial amount
    initial_total = 0.0
    count = 0

    # Get initial list of transactions
    print("===== Beginning Venmo transaction collection process! =====")
    transactions = client.user.get_user_transactions(user_id=VENMO_USER_ID)
    while transactions:
        for transaction in transactions:
            # Parse response string -> JSON object -> Transaction Object
            transaction_string = transaction_to_string(transaction)
            transaction_json_dict = transaction_string_to_json_dict(transaction_string)
            transaction_object = Transaction(
                transaction_json_dict['id'],
                transaction_json_dict['date_completed'],
                convert(datetime.fromtimestamp(int(transaction_json_dict['date_completed']))),
                float(transaction_json_dict['amount']),
                transaction_json_dict['status'],
                transaction_json_dict['note'],
                transaction_json_dict['actor']['username'],
                transaction_json_dict['actor']['first_name'],
                transaction_json_dict['actor']['last_name'],
                find_org(transaction_json_dict['note']))

            # Check if trasaction was outgoing
            if(str(transaction_object.donor_username).lower() != VENMO_USERNAME):
                # Add to DB 
                print("Adding transaction " + transaction_object.id + " to DB")
                transaction_json = transaction_object.to_json()
                transaction_to_add = json.loads(transaction_json)
                t_collection.insert_one(transaction_to_add)

                # Add to sheet
                print("Adding transaction " + transaction_object.id + " to Google Sheet")
                add_row(transaction_object.to_list())

                # Add to initial total
                initial_total += transaction_object.amount

                # Initially had 34 venmo transactions for GI in account
                # count = count + 1
                # if count == 35: 
                #     break

        # #? TESTING
        # print("=====   Ending Venmo transaction collection process EARLY for testing!   =====")
        # break;
        print("\n" + "=" * 15 + "\n\tNEXT PAGE\n" + "=" * 15 + "\n")
        transactions = transactions.get_next_page()
    
    print("=====   Ending Venmo transaction collection process!   =====")

    # Add initial summary object to DB
    summary_mongo_object = s_collection.find_one({ "_id": "1" })
    new_amount = summary_mongo_object["total_amount"] + initial_total
    new_date_last_updated = convert(datetime.now())             
    new_values = { "$set": { "total_amount": new_amount,  "date_last_updated": new_date_last_updated} }
    s_collection.update_one({"_id": "1"}, new_values)
    # summary_object = Summary("1", initial_total, transaction_object.date_readable) # maybe ill need this idk
    # new_date_last_updated = convert(datetime.now())     
    # new_values = { "$set": { "total_amount": initial_total,  "date_last_updated": new_date_last_updated} }
    # s_collection.update_one({"_id": "1"}, new_values)





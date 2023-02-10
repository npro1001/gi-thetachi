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
from secret import VENMO_EMAIL, VENMO_PASSWORD
import pymongo
import json
import re

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

#* Get your access token. You will need to complete the 2FA process
# access_token = Client.get_access_token(username=VENMO_EMAIL, password=VENMO_PASSWORD)
device_id = '50999091-09L6-8B17-60U3-6TU98D642ZC7'
access_token = '189ddbde8f168af2f2e69a046c34d341936003d4aa7f1db210e1521cf9a77595'

#* Initialize client using token
client = Client(access_token=access_token)

#* Get user ID
profile = client.user.get_my_profile()
# print(profile)


#* Get the database
dbname = get_database()
collection = dbname["transaction"]
most_recent_transaction_logged = ""


#! If the database is NOT empty:
if len(dbname.list_collection_names()) != 0:
    # Get last transaction id and create abort flag
    most_recent_transaction_logged = collection.find().sort("date", pymongo.DESCENDING).limit(1).next()
    repeat_found = False

    # Get recent transactions
    print("===== Beginning Venmo transaction collection process! =====")
    transactions = client.user.get_user_transactions(user_id=2575039018827776650)
    while transactions:
        for transaction in transactions:
            # Parse response string into JSON object -> Transaction Object
            transaction_string = transaction_to_string(transaction)
                # print(transaction_string)
            transaction_json_dict = transaction_string_to_json_dict(transaction_string)
                # print(transaction_json_dict)
            transaction_object = Transaction(
                transaction_json_dict['id'],
                transaction_json_dict['date_completed'],
                datetime.fromtimestamp(int(transaction_json_dict['date_completed'])),
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
                print("Adding transaction " + transaction_object.id + " to DB")

                # Insert into MongoDb
                transaction_json = transaction_object.to_json()
                transaction_to_add = json.loads(transaction_json)
                collection.insert_one(transaction_to_add)

                # Add to sheet
                add_row(transaction_object.to_list())

        # End collection if repeat transaction was found
        if repeat_found:
            print("=====   Ending Venmo transaction collection process!   =====")
            break

        print("\n" + "=" * 15 + "\n\tNEXT PAGE\n" + "=" * 15 + "\n")
        transactions = transactions.get_next_page()

#! If the database is empty
else:
    # Get initial list of transactions
    print("===== Beginning Venmo transaction collection process! =====")
    transactions = client.user.get_user_transactions(user_id=2575039018827776650)
    while transactions:
        for transaction in transactions:
            # Parse response string into JSON object -> Transaction Object
            transaction_string = transaction_to_string(transaction)
                # print(transaction_string)
            transaction_json_dict = transaction_string_to_json_dict(transaction_string)
                # print(transaction_json_dict)
            transaction_object = Transaction(
                transaction_json_dict['id'],
                transaction_json_dict['date_completed'],
                datetime.fromtimestamp(int(transaction_json_dict['date_completed'])),
                float(transaction_json_dict['amount']),
                transaction_json_dict['status'],
                transaction_json_dict['note'],
                transaction_json_dict['actor']['username'],
                transaction_json_dict['actor']['first_name'],
                transaction_json_dict['actor']['last_name'],
                find_org(transaction_json_dict['note']))

            # Add to DB 
            print("Adding transaction " + transaction_object.id + " to DB")
            transaction_json = transaction_object.to_json()
            transaction_to_add = json.loads(transaction_json)
            # collection.insert_one(transaction_to_add)   #! Comment for testing 


            # Add to sheet
            # print(transaction_object.to_list()
            add_row(transaction_object.to_list())

        print("\n" + "=" * 15 + "\n\tNEXT PAGE\n" + "=" * 15 + "\n")
        transactions = transactions.get_next_page()
    
    print("=====   Ending Venmo transaction collection process!   =====")


# TODO - Fix parsing error                       X
# TODO - Fix date to be readable                 X
# TODO - Fix all formatting                      X
# TODO - Sort based on organization              X
# TODO - flag unparsable orgs                    X
# TODO - Show totals for each org                X
# TODO - GitHub
# TODO - make a website showing completion 
# TODO - If username is self, make amount (-)




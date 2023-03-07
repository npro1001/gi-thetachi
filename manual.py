from datetime import datetime
from venmo_api import Client
from transaction import Transaction
from get_database import get_database
from add_to_sheet import add_row
from sort_by_org import find_org
from convert_time import convert
from summary import Summary
from dotenv import load_dotenv
from pytz import timezone
import uuid
load_dotenv()
import pymongo
import json
import re
import os

#* Get the database
dbname = get_database()
m_collection = dbname["manual_donations"]
s_collection = dbname["summary"]

# Generate a new random UUID for each manually entered donation
def generate_id():
    return str(uuid.uuid4())

def confirm(t):
    print("Id:\t\t" + t.id)
    print("Date Readable:\t" + str(t.date_readable))
    print("Amount:\t\t" + str(t.amount))
    print("Status:\t\t" + t.status)
    print("Note:\t\t" + t.note)
    print("Username:\t" + t.donor_username)
    print("First Name:\t" + t.donor_first_name)
    print("Last Name:\t" + t.donor_last_name)
    print("Organization:\t" + t.org)

    confirm = input("Confirm that the above donation is correct (Y/N):")
    if(confirm.lower() != "y"):
        print("Aborting this donation entry...\n")
    else:
        return True

count = 0

num_donations_string = input("How many donations would you like to add: ")
num_donations = int(num_donations_string)
est = timezone('US/Eastern')

while count < num_donations:
    print("\n == Entering Donation #" + str(count+1) + " == \n")
    transaction_id = generate_id()
    date = convert(datetime.now())
    date_str = convert(datetime.now())

    # Prompt user for transaction information
    amount = round(float(input("Enter transaction amount: ")),2)
    status = input("Enter transaction status: ")
    note = input("Enter transaction note: ")
    donor_username = input("Enter donor username: ")
    donor_first_name = input("Enter donor first name: ")
    donor_last_name = input("Enter donor last name: ")
    org = find_org(note)

    # Create temp transaction object
    transaction = Transaction(transaction_id, date, date_str, amount, status, note, donor_username, donor_first_name, donor_last_name, org)

    # Verify information entered correctly
    if(confirm(transaction)):
        # Add to DB 
        print("Adding transaction " + transaction.id + " to DB")
        transaction_json = transaction.to_json()
        transaction_to_add = json.loads(transaction_json)
        m_collection.insert_one(transaction_to_add)

        # Add to Sheet
        print("Adding transaction " + transaction.id + " to Google Sheet")
        add_row(transaction.to_list())

        # Add to Summary object
        summary_mongo_object = s_collection.find_one({ "_id": "1" })
        new_amount = summary_mongo_object["total_amount"] + transaction.amount
        new_date_last_updated = convert(datetime.now())             
        new_values = { "$set": { "total_amount": new_amount,  "date_last_updated": new_date_last_updated} }
        s_collection.update_one({"_id": "1"}, new_values)

        count = count + 1        

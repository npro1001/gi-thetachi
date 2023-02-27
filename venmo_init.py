from venmo_api import Client
import os
from dotenv import load_dotenv
load_dotenv()

# This script is for initial connection to the user's venmo account.
# It retrieves the access token, device id, and user id for the user. 

VENMO_EMAIL = os.environ.get('VENMO_EMAIL')
VENMO_PASSWORD = os.environ.get('VENMO_PASSWORD')

access_token = Client.get_access_token(username=VENMO_EMAIL, password=VENMO_PASSWORD)
device_id = '50999091-09L6-8B17-60U3-6TU98D642ZC7'
print(access_token)

#* Initialize client using token
client = Client(access_token=access_token)

#* Get user ID
profile = client.user.get_my_profile()
print(profile)
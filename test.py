import re
import json


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


s="(id=3734090456260937898, payment_id=3734090455640134971, date_completed=1675924270, date_created=1675924270, date_updated=1675924270, payment_type=pay, amount=4.0, audience=private, status=settled, note=Chipotle chips, device_used=iPhone, actor=User: (id=2562900963098624434, username=AlexandraRuggiero, first_name=Alexandra, last_name=R, display_name=Alexandra R, phone=None, profile_picture_url=https://pics.venmo.com/25533cca-e292-41bc-936d-43a708c609d0?width=460&height=460&photoVersion=2, about= , date_joined=1536304003, is_group=False, is_active=True), target=User: (id=2575039018827776650, username=Nick-Procaccio, first_name=Nick, last_name=Procaccio, display_name=Nick Procaccio, phone=None, profile_picture_url=https://pics.venmo.com/767a7300-7619-4986-9c32-02acdea63e80?width=460&height=460&photoVersion=1, about= , date_joined=1537750972, is_group=False, is_active=True), comments=[])"

print(s)

s = transaction_string_to_json_dict(s)
s2 = json.dumps(s, indent=4)

print("\n")
print("\n")
print(s)
print(s['actor']['username'])
print(type(s))
print(s2['actor']['username'])



# {
#     "id": "3734090456260937898",
#     "payment_id": "3734090455640134971",
#     "date_completed": "1675924270",
#     "date_created": "1675924270",
#     "date_updated": "1675924270",
#     "payment_type": "pay",
#     "amount": "4.0",
#     "audience": "private",
#     "status": "settled",
#     "note": "Chipotle chips",
#     "device_used": "iPhone",
#     "actor": "",
#     "username": "AlexandraRuggiero",
#     "first_name": "Alexandra",
#     "last_name": "R",
# }
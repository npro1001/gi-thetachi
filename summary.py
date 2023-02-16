import json

class Summary:

    def __init__(self, id, total_amount, date_last_updated):
        self.id = id
        self.total_amount = total_amount
        self.date_last_updated = date_last_updated

    def to_json(self):
        return json.dumps({
            '_id': self.id,
            'total_amount': self.total_amount,
            'date_last_updated': self.date_last_updated,
        }, default=str)
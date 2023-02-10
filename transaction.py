import json

class Transaction:

    def __init__(self, id, date, date_readable, amount, status, note, donor_username, donor_first_name, donor_last_name, org):
        self.id = id
        self.date = date
        self.date_readable = date_readable
        self.amount = amount
        self.status = status
        self.note = note
        self.donor_username = donor_username
        self.donor_first_name = donor_first_name
        self.donor_last_name = donor_last_name
        self.org = org

    @classmethod
    def from_json(cls, data):
        data = json.loads(data)
        return cls(data['id'], data['name'])

    def to_json(self):
        return json.dumps({
            '_id': self.id,
            'date': self.date,
            'date_readable': self.date_readable,
            'amount': self.amount,
            'status': self.status,
            'note': self.note,
            'donor_username': self.donor_username,
            'donor_first_name': self.donor_first_name,
            'donor_last_name': self.donor_last_name,
            'org': self.org,
        }, default=str)

    # Does not include date
    def to_list(self):
        return [self.id, str(self.date_readable), self.amount, self.status, self.note, self.donor_username, self.donor_first_name, self.donor_last_name, self.org]

    
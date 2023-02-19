from flask import Flask, render_template, jsonify, Response
from flask_sse import sse
from flask_cors import CORS, cross_origin
from apscheduler.schedulers.background import BackgroundScheduler
from get_database import get_database
import time
import redis
import json


app = Flask(__name__)
CORS(app)
app.register_blueprint(sse, url_prefix='/stream')

dbname = get_database()
s_collection = dbname["summary"]


@app.route('/', methods=['GET', 'OPTIONS'])
@cross_origin()
def index():
    return render_template('index.html')

def generate_data():
    while True:
        data = s_collection.find_one({ "_id": "1" })
        yield 'data: {}\n\n'.format(json.dumps(data))
        time.sleep(60) # Send data every 10 minutes

@app.route('/stream-data')
def stream_data():
    return Response(generate_data(), mimetype='text/event-stream')
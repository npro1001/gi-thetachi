from flask import Flask, send_from_directory, render_template, jsonify, Response
from flask_sse import sse
from flask_cors import CORS, cross_origin
from apscheduler.schedulers.background import BackgroundScheduler
from get_database import get_database
import time
import redis
import json


app = Flask(__name__, static_folder='static') # static_url_path='/gi-thetachi-expo-react')
CORS(app)
app.register_blueprint(sse, url_prefix='/stream')

dbname = get_database()
s_collection = dbname["summary"]


@app.route('/', methods=['GET', 'OPTIONS'])
@cross_origin()
def index():
    return send_from_directory(app.static_folder, 'index.html')

# Serve the entire static directory
@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)

@app.route('/static/js/<path:path>')
def send_js(path):
    return send_from_directory('static/js', path)

@app.route('/stream-data')
def stream_data():
    def generate_data():
        while True:
            data = s_collection.find_one({ "_id": "1" })
            yield 'data: {}\n\n'.format(json.dumps(data))
            time.sleep(60) # Send data every 10 minutes
    
    return Response(generate_data(), mimetype='text/event-stream')
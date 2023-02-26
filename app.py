from flask import Flask, send_from_directory, render_template, jsonify, Response
from flask_sse import sse
from flask_cors import CORS, cross_origin
from apscheduler.schedulers.background import BackgroundScheduler
from get_database import get_database
import time
import redis
import json
import os

port = int(os.environ.get('PORT', 5000)) # default to port 5000 if PORT environment variable is not set



app = Flask(__name__, static_folder='./gi-thetachi-create-react-app/release/')
CORS(app)
app.register_blueprint(sse, url_prefix='/stream')

dbname = get_database()
s_collection = dbname["summary"]

@app.route('/stream-data')
def stream_data():
    def generate_data():
        while True:
            data = s_collection.find_one({ "_id": "1" })
            yield 'data: {}\n\n'.format(json.dumps(data))
            time.sleep(60) # Send data every 10 minutes
    
    return Response(generate_data(), mimetype='text/event-stream')

@app.route('/', methods=['GET', 'OPTIONS'])
@cross_origin()
def index():
    return send_from_directory(app.static_folder, 'bundle.js')

# @app.route('/static/js/<path:path>')
# def send_js(path):
#     return send_from_directory(os.path.join(app.static_folder, 'static', 'js'), path)

# @app.route('/static/js/')
# def send_js_dir():
#     return send_from_directory(os.path.join(app.static_folder, 'static', 'js'), '')

# # Serve the entire static directory
# @app.route('/static/<path:path>')
# def send_static(path):
#     return send_from_directory(os.path.join(app.static_folder, 'static'), path)

# @app.route('/<path:path>')
# def serve_static(path):
#     return send_from_directory(app.static_folder, path)

@app.route('/<path:path>')
def serve_static(path):
    if path != '' and os.path.exists(app.static_folder + '/' + path):
        # Serve any static files requested
        return send_from_directory(app.static_folder, path)
    else:
        # Serve index.html for any unknown paths
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port)
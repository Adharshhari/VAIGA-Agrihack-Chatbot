from flask import Flask

app = Flask(__name__)

app.config['SECRET_KEY'] = '4d292250a25b00be5627f191'

from chat_app import routes

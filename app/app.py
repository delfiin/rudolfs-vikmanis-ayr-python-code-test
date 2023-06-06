from flask import Flask
from flask_restful import Api
from dotenv import load_dotenv
import os

from app.db.extensions import db
from app.routes.index import index_blueprint
from app.utils.short_url import ShortUrlConverter
from app.api.index import Shorten, Stats

app_path = os.path.dirname(os.path.abspath(__file__))
project_folder = os.path.expanduser(app_path)
load_dotenv(os.path.join(project_folder, ".env"))

config_file = "./setup.py"

app = Flask(
    __name__, template_folder="./client/templates", static_folder="./client/static"
)

app.url_map.converters["short_url"] = ShortUrlConverter

api = Api(app)
app.config.from_pyfile(config_file)
app.register_blueprint(index_blueprint)

with app.app_context():
    db.init_app(app)
    db.create_all()

    api.add_resource(Shorten, "/api/shorten")
    api.add_resource(Stats, "/api/stats/<short_url:short_url>")

from flask_restful import Resource, abort
from flask import request
from validators import url as validate_url
import requests

from app.db.models import Url
from app.db.extensions import db


class Shorten(Resource):
    """
    Return a shortened URL from a given Url

    URL: /api/shorten
    METHOD: POST
    PARAMS: url: long URL
    RETURN: { short_url }
    """

    @staticmethod
    def post():
        data = request.get_json()
        url = data.get("url")
        is_valid = url and validate_url(str(url))

        if not is_valid:
            abort(400, message="Invalid URL", url=url)

        try:
            response = requests.get(url, timeout=14)

        except requests.exceptions.ConnectTimeout as e:
            abort(400, message="Request timed out", url=url)

        except:
            abort(400, message="The resource could not be reached", url=url)

        if response.status_code == 404:
            abort(400, message="The resource could not be found", url=url)

        if response.status_code == 403:
            abort(
                400,
                message="The resource could not be accessed due to insufficient permissions",
                url=url,
            )

        if response.status_code != 200:
            print(response.status_code)
            abort(400, message="The resource could not be accessed", url=url)

        try:
            url_instance = Url(original_url=url)
            db.session.add(url_instance)
            db.session.commit()

        except:
            abort(500, message="An error occurred. Try again later", url=url)

        return {
            "short_url": url_instance.short_url,
        }


class Stats(Resource):
    """
    Return visitation statistics for a given Url

    URL: /api/stats/<short_url>
    METHOD: GET
    PARAMS: short_url: short URL parameter
    RETURN: { short_url, original_url, visits }
    """

    @staticmethod
    def get(short_url):
        url = db.session.query(Url).filter(Url.short_url == short_url).first()
        if url is None:
            abort(404, message="Short URL not found")
        return {
            "short_url": url.short_url,
            "original_url": url.original_url,
            "visits": url.visits,
        }

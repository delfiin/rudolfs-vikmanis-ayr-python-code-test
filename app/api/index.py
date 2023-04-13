from flask_restful import Resource
from flask import request

from app.db.models import Url


class Shorten(Resource):
    """
    Return a shortened URL from a given Url

    URL: /api/shorten
    METHOD: POST
    PARAMS: url: long URL
    RETURN: shortened URL
    """
    @staticmethod
    def post():
        data = request.get_json()

        """
            ...Insert code to create shortened URL
        """

        return data['url']

from flask import render_template, Blueprint, redirect, abort
from werkzeug.exceptions import NotFound
from ..db.models import Url
from ..db.extensions import db

index_blueprint = Blueprint("index_blueprint", "index", template_folder="templates")


@index_blueprint.route("/<short_url:short_url>/")
def redirect_short_url(short_url):
    url_instance = db.session.query(Url).filter(Url.short_url == short_url).first()
    if url_instance is None:
        abort(404)
    url_instance.visits += 1
    db.session.add(url_instance)
    db.session.commit()
    return redirect(url_instance.original_url)


@index_blueprint.route("/<path:path>")
@index_blueprint.route("/", defaults={"path": ""})
def frontend(path):
    return render_template("index.html")


@index_blueprint.errorhandler(NotFound)
def not_found(*args, **kwargs):
    return render_template("index.html"), 404

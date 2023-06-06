from datetime import datetime
from sqlalchemy import event
from .extensions import db
from ..utils.short_url import generate_short_url

class Url(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    original_url = db.Column(db.String(512), nullable=False)
    short_url = db.Column(db.String(5), unique=True, nullable=False)
    visits = db.Column(db.Integer, default=0, nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.now, nullable=False)

@event.listens_for(Url, 'before_insert')
def before_insert_url(mapper, conn, url_instance):
    while True:
        short_url = generate_short_url()
        check_url_instance = db.session.query(Url).filter(Url.short_url == short_url).first()
        if check_url_instance is None:
            break
        print("collision with %s" % short_url)
    url_instance.short_url = short_url
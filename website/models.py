"""
from . import db
from flask_login import UserMixin #helps users log in
from sqlalchemy.sql import func

#setup note schema
class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(10000))
    date = db.Column(db.DateTime(timezone=True), default=func.now)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

#setup user schema
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    first_name = db.Column(db.String(150))
    notes = db.relationship('Note') #reference all of a user's notes
"""
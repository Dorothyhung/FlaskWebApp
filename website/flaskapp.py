from flask import Blueprint, render_template

flaskapp = Blueprint('flaskapp', __name__)

@flaskapp.route('/flaskapp')
def fa():
    return render_template("flaskapp.html")
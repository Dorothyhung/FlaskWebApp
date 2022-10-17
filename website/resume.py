from flask import Blueprint

resume = Blueprint('resume', __name__)

@auth.route('/resume')
def resume():
    return "<h1>Resume</h1>"

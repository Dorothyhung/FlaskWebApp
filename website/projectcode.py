from flask import Blueprint, render_template

projectcode = Blueprint('projectcode', __name__)

@projectcode.route('/projectcode')
def spotifyapp():
    return render_template("projectcode.html")
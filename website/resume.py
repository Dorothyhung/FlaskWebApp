from flask import Blueprint, render_template

resume = Blueprint('resume', __name__)

@resume.route('/resume')
def doc():
    return render_template("resume.html")

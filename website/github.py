from flask import Blueprint, render_template

github = Blueprint('github', __name__)

@github.route('/github')
def gh():
    return render_template("github.html")
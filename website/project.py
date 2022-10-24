from flask import Blueprint, render_template

project = Blueprint('project', __name__)

@project.route('/project')
def projectlink():
    return render_template("project.html")
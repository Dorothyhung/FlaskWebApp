from flask import Blueprint, render_template

notesapp = Blueprint('notesapp', __name__)

@notesapp.route('/notesapp')

def notehome():
    return render_template("notesapp.html")
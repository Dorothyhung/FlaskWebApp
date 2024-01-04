from flask import Blueprint, render_template

views = Blueprint('views', __name__)

@views.route('/')
def home():
    return render_template("index.html")

@views.route('/resume')
def resume():
    return render_template("resume.html")

@views.route('/certificates')
def certificates():
    return render_template("cert.html")

@views.route('/game')
def game():
    return render_template("game.html")

@views.route('/counter')
def counter():
    return render_template("counter.html")

@views.route('/project')
def spotifyproject():
    return render_template("project.html")

@views.route('/projectcode')
def spotifycode():
    return render_template("projectcode.html")

@views.route('/flaskapp')
def flaskapp():
    return render_template("flaskapp.html")

@views.route('/horsepower')
def horsepower():
    return render_template("horsepower.html")

@views.route('/contact')
def contactme():
    return render_template("contact.html")
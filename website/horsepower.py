from flask import Blueprint, render_template

horsepower = Blueprint('horsepower', __name__)

@horsepower.route('/horsepower')
def doc():
    return render_template("horsepower.html")

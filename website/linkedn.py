from flask import Blueprint, render_template

linkedn = Blueprint('linkedn', __name__)

@linkedn.route('/linkedn')
def linklink():
    return render_template("linkedn.html")

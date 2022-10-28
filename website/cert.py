from flask import Blueprint, render_template

cert = Blueprint('cert', __name__)

@cert.route('/certificates')
def certs():
    return render_template("cert.html")
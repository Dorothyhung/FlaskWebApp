
from flask import Blueprint, render_template, request, flash, redirect, url_for
#from .models import User
#from werkzeug.security import generate_password_hash, check_password_hash
#from . import db


auth = Blueprint('auth', __name__)

@auth.route('/notesapplogin', methods=['GET', 'POST'])
def login():
    data = request.form
    print(data)
    return render_template("notesapplogin.html", name="NAME")

@auth.route('/notesappsignup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form.get('email')
        first_name = request.form.get('firstName')
        password1 = request.form.get('password1')
        password2 = request.form.get('password2')

        if len(email) < 4:
            flash('Email must be greater than 3 characters', category='error')
        elif len(first_name) < 2:
            flash('First name must be greater than 1 character', category='error')
        elif password1 != password2:
            flash('Passwords must match', category='error')
        elif len(password1) < 7:
            flash('Password must be greater than 6 character', category='error')
        else:
            new_user = User(email=email, first_name=first_name, password=generate_password_hash(password1, method='sha256'))
            #db.session.add(new_user)
            #db.session.commit()
            flash('Account created!', category='success')
            return redirect(url_for('notesapp.noteshome'))

    return render_template("notesappsignup.html")

@auth.route('/notesapplogout')
def logout():
    return render_template("notesapplogout.html")
    
from flask import Flask
#from flask_sqlalchemy import SQLAlchemy
#from os import path

#create database
#db = SQLAlchemy()
#DB_NAME = "database.db"



def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'wow'
    #app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    #db.init_app(app)

    from .views import views
    from .resume import resume
    from .cert import cert
    from .project import project
    from .projectcode import projectcode
    from .horsepower import horsepower
    from .flaskapp import flaskapp
    from .notesapp import notesapp
    #from .auth import auth

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(resume, url_prefix='/')
    app.register_blueprint(cert, url_prefix='/')
    app.register_blueprint(project, url_prefix='/')
    app.register_blueprint(projectcode, url_prefix='/')
    app.register_blueprint(horsepower, url_prefix='/')
    app.register_blueprint(flaskapp, url_prefix='/')
    app.register_blueprint(notesapp, url_prefix='/')
    #app.register_blueprint(auth, url_prefix='/')

    #from . import models

    #with app.app_context():
    #    db.create_all()


    return app


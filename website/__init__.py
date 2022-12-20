from flask import Flask
#from flask_sqlalchemy import SQLAlchemy
#from os import path
#import pyodbc as odbc
#import pandas as pd
#import sqlalchemy
#import psycopg2
#import urllib.parse as up



"""url = up.urlparse('postgres://nftfhbsb:ys0LGtiq29f4zFG6Bqnelk7d20VAySV2@mahmud.db.elephantsql.com/nftfhbsb')
conn = psycopg2.connect(database=url.path[1:], user=url.username, password=url.password, host=url.hostname, port=url.port )
cursor  = conn.cursor()
#cursor.execute('static\database.sql')
#conn.commit()
print('Table created')"""

"""
connstring = ("Driver={SQL Server Native Client 11.0};"
            "Server=USXXX00345,67800;"
            "Database=DB02;"
            "Trusted_Connection=yes;")
connection = pyodbc.connect(connstring)"""

#!!database might be the problem on public website although it works locally
#create database
#db = SQLAlchemy()
#DB_NAME = "database.db"



def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'wow'
    #app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    #db.init_app(app)

    from .views import views
    from .auth import auth

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    #from . import models

    #with app.app_context():
    #    db.create_all()


    return app


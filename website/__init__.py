from flask import Flask

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'wow'

    from .views import views
    from .resume import resume

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(resume, url_prefix='/')


    return app


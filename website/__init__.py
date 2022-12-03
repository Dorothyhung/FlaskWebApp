from flask import Flask

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'wow'

    from .views import views
    from .resume import resume
    from .cert import cert
    from .project import project
    from .projectcode import projectcode
    from .horsepower import horsepower
    from .flaskapp import flaskapp
    from .notesapp import notesapp
    from .notesapplogin import notesapplogin

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(resume, url_prefix='/')
    app.register_blueprint(cert, url_prefix='/')
    app.register_blueprint(project, url_prefix='/')
    app.register_blueprint(projectcode, url_prefix='/')
    app.register_blueprint(horsepower, url_prefix='/')
    app.register_blueprint(flaskapp, url_prefix='/')
    app.register_blueprint(notesapp, url_prefix='/')
    app.register_blueprint(notesapplogin, url_prefix='/')


    return app
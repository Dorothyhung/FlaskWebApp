from flask import Flask

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'wow'

    from .views import views
    from .resume import resume
    from .linkedn import linkedn
    from .project import project
    from .projectcode import projectcode
    from .github import github
    from .flaskapp import flaskapp

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(resume, url_prefix='/')
    app.register_blueprint(linkedn, url_prefix='/')
    app.register_blueprint(project, url_prefix='/')
    app.register_blueprint(projectcode, url_prefix='/')
    app.register_blueprint(github, url_prefix='/')
    app.register_blueprint(flaskapp, url_prefix='/')


    return app
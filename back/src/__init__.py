from flask import Flask

from src.extensions import db
from src.commands import init_db_command, populate_db_command
from src.models import User
from src.config import Config
from src.views import users_bp
from src.views import lobby_bp
# from src.views import auth_blueprint, users_bp


COMMANDS = [
    init_db_command,
    populate_db_command
]

BLUEPRINTS = [
    # auth_blueprint,
    users_bp,
    lobby_bp
]

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    register_extenstions(app)
    register_commands(app)
    register_blueprints(app)

    

    return app

def register_extenstions(app):
    db.init_app(app)


def register_blueprints(app):
    for blueprint in BLUEPRINTS:
        app.register_blueprint(blueprint)   


def register_commands(app):
    for command in COMMANDS:
        app.cli.add_command(command)
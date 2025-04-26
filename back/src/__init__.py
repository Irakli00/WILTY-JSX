from flask import Flask

from src.extensions import db
from src.commands import init_db_command, populate_db_command
from src.models import User
from src.config import Config


COMMANDS = [
    init_db_command,
    populate_db_command
]

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    register_extenstions(app)
    register_commands(app)

    

    return app

def register_extenstions(app):
    db.init_app(app)





def register_commands(app):
    for command in COMMANDS:
        app.cli.add_command(command)
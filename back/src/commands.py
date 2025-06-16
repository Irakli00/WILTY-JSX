from flask.cli import with_appcontext
import click

from src.models import User, Active_lobby
from src.extensions import db


def init_db():
    db.drop_all()
    db.create_all()


@click.command("init_db")
@with_appcontext
def init_db_command():
    click.echo("Database creation in porgress")
    init_db()
    click.echo("Database created")



@click.command("populate_db")
@with_appcontext
def populate_db_command():
    click.echo("populating db")
    lobby1 = Active_lobby(lobby_id='123')
    user2 = User(id="123", associated_username='TEST',sid='111111')
    lobby1.create()
    user2.create()

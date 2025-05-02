from flask.cli import with_appcontext
import click

from src.models import User
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
    # user1 = User(username="joe", password="joejoe")
    # user1.password = "dan" 
    # user2 = User(username="dan", password="dandan")
    # user1.create()
    # user2.create()

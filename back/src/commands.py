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
    lobby1 = Active_lobby(lobby_id='123',created_at='2025-01-01',deleted_at='2029-02-02')
    lobby2 = Active_lobby(lobby_id='456',created_at='2025-02-02',deleted_at='2025-03-03')
    lobby3 = Active_lobby(lobby_id='789',created_at='2025-02-02',deleted_at='2025-04-04')
    lobby1.create()
    lobby2.create()
    lobby3.create()
    
    user1 = User(id="123", associated_username='TEST 0',room_id='000')
    user2 = User(id="456", associated_username='TEST 1',room_id='000')
    user1.create()
    user2.create()

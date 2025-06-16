from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash


from src.extensions import db
from src.models.base import BaseModel



class User(BaseModel, UserMixin):
    __tablename__ = "users"

    id = db.Column(db.String, primary_key=True)  # playerId
    sid = db.Column(db.String)
    associated_username = db.Column(db.String)

    room_id = db.Column(db.String, db.ForeignKey("active_lobbies.lobby_id"))
    lobby = db.relationship("Active_lobby", back_populates="users")

    # _password = db.Column(db.String)


    # @property
    # def password(self):
    #     return self._password
    
    # @password.setter
    # def password(self, value):
    #     self._password = generate_password_hash(value)


    # def check_password(self, password):
    #     return check_password_hash(self.password, password)
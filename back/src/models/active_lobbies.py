from werkzeug.security import generate_password_hash, check_password_hash


from src.extensions import db
from src.models.base import BaseModel


class Active_lobby(BaseModel):
    __tablename__ = "active_lobbies"

    id = db.Column(db.Integer, primary_key=True)
    lobby_id = db.Column(db.String, unique=True)
    users = db.relationship("User", back_populates="lobby")

from flask import Blueprint,jsonify,request

from src.extensions import db
from src.models import User

users_bp = Blueprint('users', __name__,)

@users_bp.route('/existing_users', methods=['GET', 'POST']) 
def index():
    all_users = User.query.all()
    all_usernames = [user.username for user in User.query.all()]

    return jsonify({'users':all_usernames},)
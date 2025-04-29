from flask import Blueprint,jsonify,request

from src.extensions import db
from src.models import User

lobby_bp = Blueprint('lobby', __name__,)

@lobby_bp.route('/lobby_manager', methods=['GET', 'POST']) 
def index():
      return jsonify({'users': 'hi'})
    

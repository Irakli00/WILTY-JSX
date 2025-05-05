from flask import Blueprint,jsonify,request, url_for

from src.extensions import db
from src.models import Active_lobby

lobby_bp = Blueprint('lobby', __name__,)

@lobby_bp.route('/lobby_manager', methods=['GET', 'POST'])
def index():

    if request.method == 'GET':
        all_active_lobbies = db.session.query(Active_lobby).all()

        lobbies_array = [
                {
                "id": lobby.id,
                "lobby_id": lobby.lobby_id
                }
                for lobby in all_active_lobbies
        ]

        return jsonify({
            'active_ones': lobbies_array
        })
    
    if request.method == 'POST':
        data = request.get_json()
        lobby_id = data.get('userId')

        if not lobby_id:
            return jsonify({'error': 'userId is required'}), 400

        existing = Active_lobby.query.filter_by(lobby_id=lobby_id).first()
        if existing:
            return jsonify({'message': 'Lobby already exists', 'lobbyId': lobby_id}), 200

        new_lobby = Active_lobby(lobby_id=lobby_id)
        db.session.add(new_lobby)
        db.session.commit()

        return jsonify({'added_lobby': lobby_id}), 201
    

@lobby_bp.route('/lobby/<lobby_id>', methods=['GET'])
def get_lobby(lobby_id):
    lobby_query = db.session.query(Active_lobby).filter(Active_lobby.lobby_id == lobby_id).first()
  
    if lobby_query:
        return jsonify({
            "status": "success",
            "lobby_id": lobby_id,
        })
    else:
        return jsonify({
            "status": "error",
            "message": "Lobby not found"
        }), 404

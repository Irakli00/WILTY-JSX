from flask import Blueprint,jsonify,request, url_for

from src.extensions import db
from src.models import Active_lobby

lobby_bp = Blueprint('lobby', __name__,)


@lobby_bp.route('/lobby_manager', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        data = request.get_json()
        
        lobby_id = data.get('userId')
        
        existing = db.session.query(Active_lobby).filter_by(lobby_id=lobby_id).first()

        if not existing:
            new_lobby = Active_lobby(lobby_id=lobby_id)
            db.session.add(new_lobby)
            db.session.commit()
        else:
            print("Lobby already exists")
      

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
    else:
        return jsonify({"hello": 'hadla'})

@lobby_bp.route('/lobby/<lobby_id>', methods=['GET'])
def get_lobby(lobby_id):
    lobby_query = db.session.query(Active_lobby).filter(Active_lobby.lobby_id == lobby_id).first()
  
    # print(lobby_id , lobby_query)

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

@lobby_bp.route('/lobbies', methods=['GET'])
def list_lobbies():
    all_active_lobbies = db.session.query(Active_lobby).all()

    lobbies_array = [
        {
          "id": lobby.id,
          "lobby_id": lobby.lobby_id
        }
        for lobby in all_active_lobbies
    ]
    return jsonify({
        "active_lobbies": lobbies_array
    })
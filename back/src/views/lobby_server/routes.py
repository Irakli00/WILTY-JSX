from flask import Blueprint,jsonify,request, url_for

from src.extensions import db
from src.models import Active_lobby

lobby_bp = Blueprint('lobby', __name__,)

active_lobbies =[]

# # active_lobbies1 = db.session.query(Active_lobby).all()
# active_lobbies1 = db.session.query(Active_lobby)
# print(active_lobbies1)


@lobby_bp.route('/lobby_manager', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        data = request.get_json()
        
        # Generate a unique lobby ID if not provided
        lobby_id = data.get('userId')
        print('id:',lobby_id)
        
        # Store lobby data
        active_lobbies.append( {
            'lobbie_id': lobby_id
        })
        
        # Return the lobby ID in the response
        return jsonify({
            "active_ones": active_lobbies
        })
    else:
        return jsonify({"hello": 'hadla'})

@lobby_bp.route('/lobby/<lobby_id>', methods=['GET'])
def get_lobby(lobby_id):
    # Check if the lobby exists
    print(lobby_id ,active_lobbies)

    if True:
        return jsonify({
            "status": "success",
            "lobby_id": lobby_id,
            # "lobby_data": active_lobbies['lobby_id']
        })
    else:
        return jsonify({
            "status": "error",
            "message": "Lobby not found"
        }), 404

@lobby_bp.route('/lobbies', methods=['GET'])
def list_lobbies():
    return jsonify({
        "active_lobbies": active_lobbies
    })
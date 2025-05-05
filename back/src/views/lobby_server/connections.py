from flask import Blueprint, request, jsonify
from flask_socketio import join_room, leave_room, emit

connections_bp = Blueprint('connections', __name__)
connected_clients = set()

@connections_bp.route('/connections_manager', methods=['GET', 'POST'])
def index():
    print('c->',connected_clients)
    return jsonify({'hello': 'world'})

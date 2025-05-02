from flask import Blueprint, request, jsonify

connections_bp = Blueprint('connections', __name__)

@connections_bp.route('/connections_manager', methods=['GET', 'POST'])
def index():
    return jsonify({'hello': 'world'})

# This function will attach your socket events to the main app
def socketio_events(socketio):
    @socketio.on('connect')
    def handle_connect():
        print('Client connected')
        socketio.emit('response', {'message': 'You are connected!'})

    @socketio.on('message_from_client')
    def handle_message(data):
        print('Received message:', data)
        socketio.emit('message_from_server', {'response': 'Got your message!'})
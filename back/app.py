from flask_cors import CORS
from src import create_app
from flask_socketio import SocketIO
from flask_socketio import join_room, leave_room, send

import eventlet
eventlet.monkey_patch()  # Optional but helpful

flask_app = create_app()
# Enable CORS for the entire application
CORS(flask_app,origins="*")

socketio = SocketIO(flask_app, cors_allowed_origins="*")

@socketio.on('join_lobby')
def on_join(data):
    # maybe get data from db and create room
    print(data)
    username = data['username']
    room = data['room']
    join_room(room)
    send(username + ' has entered the room.', to=room)

    # Print current rooms and users (on this server instance)
    print("=== Active Rooms ===")
    for room_name, members in socketio.server.manager.rooms['/'].items():
        print(f"Room: {room_name}")
        print(f"Members: {members}")

@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', to=room)

if __name__ == '__main__':
    socketio.run(flask_app, debug=True,)

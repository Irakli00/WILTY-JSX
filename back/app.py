from flask_cors import CORS
from flask import request
from src import create_app
from flask_socketio import SocketIO
from flask_socketio import join_room, leave_room, send, emit

import eventlet
# eventlet.monkey_patch()  #Optional but helpful

flask_app = create_app()
# Enable CORS for the entire application
CORS(flask_app,origins="*")

socketio = SocketIO(flask_app, cors_allowed_origins="*")

@socketio.on('join_lobby')
def on_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    send(username + ' has entered the room.', to=room)
    emit('joined_lobby', room, to=request.sid) 
    
    # Print current rooms and users (on this server instance)
    # print("=== Active Rooms ===")
    # for room_name, members in socketio.server.manager.rooms['/'].items():
    #     if room_name == room:
    #         print(f"Room: {room_name}")
    #         print(f"Members: {members}")

@socketio.on('get_room')
def handle_get_room(data):
    room = data['room']
    namespace = '/'  # default namespace
    try:
        room_members = socketio.server.manager.rooms[namespace][room]
        room_info = list(room_members)
    except KeyError:
        room_info = []
        
    print('-->', room, room_info)
    emit('rooms_info', {'room': room, 'members': room_info})

@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', to=room)

if __name__ == '__main__':
    socketio.run(flask_app, debug=True,)

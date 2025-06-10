from flask_cors import CORS
from flask import request
from src import create_app
from flask_socketio import SocketIO
from flask_socketio import join_room, leave_room, send, emit

flask_app = create_app()
# Enable CORS for the entire application
CORS(flask_app,origins="*")

socketio = SocketIO(flask_app, cors_allowed_origins="*")


@socketio.on('join_lobby')
def on_join(data):
    host_id = None
    if host_id == None:
        host_id = request.sid
    
    username = data['username']
    room = data['room']
    sid = request.sid


    room_members = socketio.server.manager.rooms['/'].get(room, set())

    if len(room_members) >= 3:
        print('---->',room_members)
        emit('room_full', {'message': 'Room is full'}, to=sid)
        return

    join_room(room)

    emit('set_host_id', host_id)
    emit('joined_lobby',to=room)

    # send(f'{username} has entered the room.', to=room)
    # emit('joined_lobby', room, to=request.sid) 

    # print("=== Active Rooms ===")
    # for room_name, members in socketio.server.manager.rooms['/'].items():
    #     if room_name == room:
    #         print(f"Room: {room_name}")
    #         print(f"Members: {len(members)}")

@socketio.on('get_sid')
def handle_get_sid():
    emit('client_sid',{'sid':request.sid})

@socketio.on('get_room')
def handle_get_room(data):
    room = data['room']
    namespace = '/'  # default namespace
    try:
        room_members = socketio.server.manager.rooms[namespace][room]
        room_info = list(room_members)
    except KeyError:
        room_info = []
        
    # print('-->', room, room_info)
    emit('rooms_info', {'room': room, 'members': room_info})

@socketio.on('start_game')
def handle_start_game(data):
    room = data['room']
    emit('game_started', {'room': room}, to=room)

@socketio.on('open_card')
def handle_card_oppened(data):
    room = data['room']
    if(data['playerToRead'] == request.sid):
        emit('card_oppened', {'room': room}, to=room)

@socketio.on('close_card')
def handle_card_oppened(data):
    room = data['room']
    if(data['playerToRead'] == request.sid):
        emit('card_closed', {'room': room}, to=room)

@socketio.on('current_to_read')
def handle_current_player(data):
    print(data['players'][data['turn']], request.sid)
    
    emit('now_reads',{'currentPlayer':data['players'][data['turn']],'clientID':request.sid})

@socketio.on('next_round')
def handle_current_player(data):
    room = data['room']

    print(f"Client {request.sid} triggered next_round in room {room}")
    emit('next_round_starts', {'room': room}, to=room)

@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', to=room)

if __name__ == '__main__':
    socketio.run(flask_app, debug=True,)

from flask_cors import CORS
from flask import request
from src import create_app
from flask_socketio import SocketIO
from flask_socketio import join_room, leave_room, send, emit

flask_app = create_app()
# Enable CORS for the entire application
CORS(flask_app,origins="*")

socketio = SocketIO(flask_app, cors_allowed_origins="*")


# -------------------------------------
# connected_users = {}
# @socketio.on('offer')
# def handle_offer(data):
#     target_sid = data['target'] 
#      # socket.id of the recipient
#     emit('offer', {
#         'target':target_sid,
#         'sdp': data['sdp'],
#     }, to=target_sid)

# -------------------------------------

# -------------------------------------
@socketio.on('offer')
def handle_offer(data):
    emit('offer', {
        'target': data['target'],
        'sdp': data['sdp'],
    }, to=data['target'])

@socketio.on('answer')
def handle_answer(data):
    emit('answer', {
        'sdp': data['sdp'],
    }, to=data['target'])
# -------------------------------------

@socketio.on('join_lobby')
def on_join(data):
    room = data['room']
    username = data['username']
    status = data['status'] 
    host_id = None
    sid = request.sid

    room_members = socketio.server.manager.rooms['/'].get(room, set())

    if host_id == None:
        host_id = sid

    if status == 'spectator':
        emit('joined_as_spectator')

    if len(room_members) <2 and status == 'player':
        join_room(room)
        emit('set_host_id', host_id)
        emit('joined_lobby', {'username': username, 'room': room}, room=room)
        # print(list(room_members), sid)

        if sid not in list(room_members) and sid != host_id:
         print('----------you are a spectator---------')
        #  emit('spectator_offer',{'message': 'Wanna be a spectator?'})
    else:
        emit('room_full', {'message': 'Room is full'}, to=sid)
        return

    # send(f'{username} has entered the room.', to=room)
    # emit('joined_lobby', room, to=request.sid) 

    # print("=== Active Rooms ===")
    # for room_name, members in socketio.server.manager.rooms['/'].items():
    #     if room_name == room:
    #         print(f"Room: {room_name}")
    #         print(f"Members: {len(members)}")

@socketio.on('join_as_spectator')
def on_spectator(data):
    answer= data['answer']
    emit('spectator_response', {'status':answer})


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
    # print(data['players'][data['turn']], request.sid)
    
    emit('now_reads',{'currentPlayer':data['players'][data['turn']],'clientID':request.sid})

@socketio.on('next_round')
def handle_current_player(data):
    room = data['room']

    emit('next_round_starts', {'room': room}, to=room)

@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', to=room)

if __name__ == '__main__':
    socketio.run(flask_app, debug=True,)

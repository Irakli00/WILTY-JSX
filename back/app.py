from flask_cors import CORS
from flask import request
from src import create_app
from flask_socketio import SocketIO
from flask_socketio import join_room, leave_room, send, emit
from datetime import date,timedelta

from src.extensions import db
from src.models import User, Active_lobby

flask_app = create_app()
# Enable CORS for the entire application
CORS(flask_app,origins="*")

socketio = SocketIO(flask_app, cors_allowed_origins="*")

@socketio.on('init')
def on_init():
    today = date.today()
    
    lobbies = db.session.query(Active_lobby).filter(Active_lobby.deleted_at<=today).all()

    lobby_members = [user for lobby in lobbies for user in lobby.users] #lol

    for member in lobby_members:
        member.room_id = None
        db.session.commit()

    for lobby in lobbies:
        db.session.delete(lobby)
        db.session.commit()

@socketio.on('join_lobby')
def on_join(data):
    host_id = None
    if host_id == None:
        host_id = request.sid
    
    username = data['username']
    room = data['roomId']
    sid = request.sid
    user_id = data['playerId']
    room_members = socketio.server.manager.rooms['/'].get(room, set())

    player = {
        'username':username,
        'sid':sid,
        'user_id':user_id  
    }

    lobby = db.session.query(Active_lobby).filter_by(lobby_id=room).first()

    if len(room_members) >= 6:
        emit('room_full', {'message': 'Room is full'}, to=sid)
        return
    
    user = db.session.query(User).filter_by(id=user_id).first()
    
    if not user:
        user = User(id=user_id, associated_username=username, room_id=room,lobby=lobby,sid=sid)
        db.session.add(user)
        db.session.commit()

    join_room(room)

    emit('set_host_id', host_id)
    emit('joined_lobby',{'player':player}, to=room)

@socketio.on('playerName_update')
def on_update(data):
    user_id = data['playerId']
    username = data['username']

    if not user_id or not username:
        emit('error', {'message': 'Missing playerId or username'})
        return

    user = db.session.query(User).filter_by(id=user_id).first()

    if not user:
        emit('no_user', {'message': 'User not found'})
        return

    user.associated_username = username
    db.session.commit()

    emit('username_updated', {'username': user.associated_username, 'sid': user.sid}, broadcast=True)

@socketio.on('user_disconnect')
def on_disconnect(data):
    sid = request.sid
    user_id=data['id']
    user = db.session.query(User).filter_by(id=user_id).first()

    if user:
        print(f"User {user.associated_username} disconnected.")
        db.session.delete(user)
        db.session.commit()
    emit('user_disconnected',{'user':sid},)

@socketio.on('get_sid')
def handle_get_sid():
    emit('client_sid',{'sid':request.sid})

@socketio.on('get_room')
def handle_get_room(data):
    room = data.get("roomId") or data.get('roomIdQuery') #idunno

    # if not room:
    #     print("No")
    #     return
    
    lobby = db.session.query(Active_lobby).filter_by(lobby_id=room).first()

    if not lobby:
        delta = timedelta(days=1)
        created_at = date.today()
        deleted_at = created_at + delta

        lobby = Active_lobby(lobby_id=room,created_at=created_at, deleted_at=deleted_at)

        db.session.add(lobby)
        db.session.commit()

    player_usernames=[user.associated_username for user in lobby.users]
    room_members = [member.sid for member in lobby.users]
    user_ids = [member.id for member in lobby.users]
    
    emit('rooms_info', {'roomId': room, 'userSids': room_members, 'userNicknames':player_usernames,'userIds':user_ids})

@socketio.on('start_game')
def handle_start_game(data):
    room = data['roomId']
    emit('game_started', {'roomId': room}, to=room)

@socketio.on('open_card')
def handle_card_oppened(data):
    room = data['roomId']

    if data['playerToRead'] == request.sid:
        emit('card_oppened', {'roomId': room}, to=room)

@socketio.on('close_card')
def handle_card_oppened(data):
    room = data['roomId']
    if(data['playerToRead'] == request.sid):
        emit('card_closed', {'roomId': room}, to=room)

@socketio.on('current_to_read')
def handle_current_player(data):    
    emit('now_reads',{'currentPlayer':data['players'][data['turn']],'clientID':request.sid})

@socketio.on('next_round')
def handle_current_player(data):
    room = data['roomId']

    # print(f"Client {request.sid} triggered next_round in room {room}")
    emit('next_round_starts', {'roomId': room}, to=room)

@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['roomId']
    leave_room(room)
    send(username + ' has left the room.', to=room)

if __name__ == '__main__':
    socketio.run(flask_app, debug=True,)

from flask_cors import CORS
from src import create_app
from flask_socketio import SocketIO

import eventlet
eventlet.monkey_patch()  # Optional but helpful

flask_app = create_app()
# Enable CORS for the entire application
CORS(flask_app,origins="*")

socketio = SocketIO(flask_app, cors_allowed_origins="*")


if __name__ == '__main__':
    socketio.run(flask_app, debug=True,)

from flask_cors import CORS
from src import create_app
from flask_socketio import SocketIO

flask_app = create_app()
# Enable CORS for the entire application
CORS(flask_app)
socketio = SocketIO(flask_app, cors_allowed_origins="*")


if __name__ == '__main__':
    flask_app.run(debug=True)
    socketio.run(flask_app, debug=True)

from src import create_app
from flask_cors import CORS

flask_app = create_app()
CORS(flask_app)

if __name__ == '__main__':
    flask_app.run(debug=True)
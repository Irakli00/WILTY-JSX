from flask_cors import CORS
from src import create_app

flask_app = create_app()
# Enable CORS for the entire application
CORS(flask_app)

if __name__ == '__main__':
    flask_app.run(debug=True)
from flask import Blueprint,jsonify,request

from src.extensions import db
from src.models import User

users_bp = Blueprint('users', __name__,)

@users_bp.route('/existing_users', methods=['GET', 'POST']) 
def index():
    if request.method == 'POST':
        data = request.get_json()
        print("Received POST data:", data)
        
        # Create a new User object from the JSON data
        new_user = User(username=data.get('nickName'))  # Adjust based on your User model
        
        # Add to db
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({
            "message": "User added successfully", 
            "user": {"id": new_user.id, "username": new_user.username}
        })


    if request.method == 'GET':
        all_users = User.query.all()
        
        response_from_server = [{
                'id':user.id,
                'nickName':user.username,
                "playerStory": {
                "story": "story 1",
                "truth": "true",
            },
        } for user in all_users]

        return jsonify({'users': response_from_server})
    

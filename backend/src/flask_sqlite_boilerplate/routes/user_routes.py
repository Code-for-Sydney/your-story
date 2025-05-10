from flask import Blueprint, jsonify, request
from ..models.user import User
from .. import db

user_bp = Blueprint('user', __name__)

@user_bp.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'created_at': user.created_at
    } for user in users])

@user_bp.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    
    if not data or not data.get('username') or not data.get('email'):
        return jsonify({'error': 'Missing required fields'}), 400
    
    user = User(
        username=data['username'],
        email=data['email']
    )
    
    try:
        db.session.add(user)
        db.session.commit()
        return jsonify({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'created_at': user.created_at
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'User creation failed'}), 400 
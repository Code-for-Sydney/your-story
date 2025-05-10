from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import func

# Initialize extensions without app
db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)

    # Configure SQLite database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize extensions with app
    db.init_app(app)
    migrate.init_app(app, db)

    # Import models here, after db is initialized and within app context if needed for setup
    from .models.starter_prompt import StarterPrompt

    with app.app_context():
        # Starter Prompt Route
        @app.route('/api/starter-prompt', methods=['GET'])
        def get_starter_prompt():
            prompt = StarterPrompt.query.order_by(func.random()).first()
            if not prompt:
                return jsonify({'error': 'No starter prompts available'}), 404
            return jsonify(prompt.to_dict())

        # Register CLI commands (will simplify cli.py next)
        from .cli import init_db_command, seed_prompts_command # Updated command names
        app.cli.add_command(init_db_command)
        app.cli.add_command(seed_prompts_command)

    # Simple base route
    @app.route('/')
    def index():
        return {'message': 'Welcome to Simplified Flask API'}

    return app 
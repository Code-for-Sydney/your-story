from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# Initialize Flask app
app = Flask(__name__)

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Import and register blueprints
from .routes.user_routes import user_bp
app.register_blueprint(user_bp, url_prefix='/api')

# Routes
@app.route('/')
def index():
    return {'message': 'Welcome to Flask API'}

def create_app():
    # Register CLI commands
    from .cli import init_db, drop_db, seed_db
    app.cli.add_command(init_db)
    app.cli.add_command(drop_db)
    app.cli.add_command(seed_db)
    return app 
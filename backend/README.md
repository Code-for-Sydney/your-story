# Flask SQLite Boilerplate

A basic Flask application with SQLite database integration.

## Project Structure

```
.
├── pyproject.toml      # Project configuration and dependencies
├── run.py             # Application entry point
├── src/               # Source code directory
│   └── flask_sqlite_boilerplate/
│       ├── __init__.py    # Package initialization
│       ├── models/        # Database models
│       │   └── user.py   # User model
│       ├── routes/       # API routes
│       │   └── user_routes.py # User-related endpoints
│       └── cli.py        # Database management commands
└── instance/          # Instance-specific files
    └── app.db         # SQLite database file (created by Flask)
```

## Setup

1. Install uv (if not already installed):
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

2. Create a virtual environment:
```bash
uv venv
```

3. Activate the virtual environment:
- On macOS/Linux:
```bash
source .venv/bin/activate
```
- On Windows:
```bash
.venv\Scripts\activate
```

4. Install dependencies:
```bash
uv pip install -e .
```

## Database Management

The application provides several CLI commands for database management. You need to set the `FLASK_APP` environment variable before running these commands:

1. Set the Flask application:
```bash
export FLASK_APP=run.py
```

2. Initialize the database:
```bash
flask init-db
```

3. Seed the database with sample data:
```bash
flask seed-db
```

4. Drop all database tables (requires confirmation):
```bash
flask drop-db
```

## Running the Application

1. Start the Flask development server:
```bash
python run.py
```

2. The server will start at `http://localhost:5000`

## API Endpoints

- `GET /`: Welcome message
- `GET /api/users`: Get all users
- `POST /api/users`: Create a new user
  - Required fields: username, email

## Database

The application uses SQLite as the database backend. The database file (`app.db`) will be created in the `instance` directory when you run the `flask init-db` command. This is Flask's default location for instance-specific files like databases and configuration files that shouldn't be committed to version control.

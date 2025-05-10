# Flask SQLite Boilerplate (Simplified)

A radically simplified Flask application with SQLite for serving starter prompts.

## Project Structure

```
.
├── pyproject.toml      # Project configuration and dependencies
├── run.py              # Application entry point
├── src/
│   └── flask_sqlite_boilerplate/
│       ├── __init__.py     # Package initialization, contains app factory and routes
│       ├── models/
│       │   └── starter_prompt.py  # StarterPrompt model
│       └── cli.py          # Database management commands (init-db, seed-prompts)
└── instance/
    └── app.db            # SQLite database file (created by Flask)
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
   (macOS/Linux) `source .venv/bin/activate` or (Windows) `.venv\Scripts\activate`

4. Install dependencies:
```bash
uv pip install -e .
```

## Database Management

Set `FLASK_APP=run.py` environment variable.

1. Initialize the database (creates tables based on models):
```bash
flask init-db
```

2. Seed the database with sample starter prompts:
```bash
flask seed-prompts
```

## Database Migrations

If you modify the `StarterPrompt` model:

1. Initialize migrations (only if you haven't before):
```bash
flask db init
```

2. Create a new migration:
```bash
flask db migrate -m "Describe model changes for starter_prompt"
```

3. Apply the migration:
```bash
flask db upgrade
```

## Running the Application

```bash
python run.py
```
The server will start at `http://localhost:5000`.

## API Endpoints

- `GET /`: Welcome message
- `GET /api/starter-prompt`: Get a random starter prompt
  - Returns: `{"prompt": "...", "illustration": "..."}` or `{"error": "..."}` (404)

## Database

Uses SQLite, database file `instance/app.db` is created by `flask init-db`.

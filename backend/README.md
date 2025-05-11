# FastAPI Visual Novel Scene Server

A FastAPI application for serving scene data for a visual novel from a JSONL file.

## Project Structure

```
.
├── pyproject.toml        # Project configuration and dependencies (for uv/pip)
├── data/
│   └── scenes.jsonl      # Scene data in JSONL format
└── src/
    └── main.py           # FastAPI application and Pydantic models
```

## Setup

1.  **Install uv (if not already installed):**
    ```bash
    curl -LsSf https://astral.sh/uv/install.sh | sh
    ```
    *Alternatively, if you have pipx, you can use `pipx install uv`.*

2.  **Create and activate a virtual environment using `uv`:**
    ```bash
    uv venv  # Creates a .venv directory
    source .venv/bin/activate  # On macOS/Linux
    # .venv\Scripts\activate.bat  # On Windows
    ```

3.  **Install dependencies using `uv`:**
    With the virtual environment activated, run:
    ```bash
    uv pip install -e .
    ```
    This command reads the dependencies from `pyproject.toml` and installs them.
    *(The `-e` flag installs the project in editable mode, which is useful for development.)*

## Data File

The application serves scene data from `data/scenes.jsonl`. Each line in this file should be a JSON object representing a scene. Each scene object must contain:
-   `prompt`: A string representing the short text displayed to the viewer.
-   `illustration`: A string representing the path to the illustration image.

Example content for `data/scenes.jsonl`:
```json
{"prompt": "A beautiful sunrise over a mountain range.", "illustration": "images/sunrise.png"}
{"prompt": "A cozy cabin in a snowy forest.", "illustration": "images/cabin_snow.jpg"}
{"prompt": "A bustling medieval marketplace.", "illustration": "images/market.webp"}
```
Make sure this file exists in the `data/` directory relative to where you run the application, or update the path in `src/main.py`.

## Running the Application

Navigate to the root directory of the project and ensure your virtual environment (created with `uv`) is activated.

Then run:
```bash
python src/main.py
```
The server will start, and by default, it will be accessible at `http://0.0.0.0:8000`.

## API Endpoints

-   **`GET /`**
    -   Description: A simple welcome message.
    -   Response: `{"Hello": "World"}`

-   **`GET /scenes`**
    -   Description: Retrieves a list of all scenes from `data/scenes.jsonl`.
    -   Response Model: `List[Scene]` (where `Scene` is a Pydantic model with `prompt: str` and `illustration: str`)
    -   Example Success (200 OK) Response:
        ```json
        [
            {"prompt": "A beautiful sunrise over a mountain range.", "illustration": "images/sunrise.png"},
            {"prompt": "A cozy cabin in a snowy forest.", "illustration": "images/cabin_snow.jpg"}
        ]
        ```
    -   Behavior: If `data/scenes.jsonl` is not found, it returns an empty list `[]`.

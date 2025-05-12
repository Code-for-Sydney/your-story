all: frontend backend run

frontend:
	cd frontend && npm i
	cd frontend && npm run build-web

backend:
	cd backend && [ -d .venv ] || uv venv .venv
	cd backend && . .venv/bin/activate && uv sync

run:
	backend/.venv/bin/python backend/src/main.py

.PHONY: all frontend backend run

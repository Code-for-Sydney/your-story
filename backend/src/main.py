from typing import List
import json

from fastapi import FastAPI
from pydantic import BaseModel


class Scene(BaseModel):
    prompt: str
    illustration: str


app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/scenes", response_model=List[Scene])
def read_scenes():
    scenes = []
    try:
        with open("data/scenes.jsonl", "r") as f:
            for line in f:
                if line.strip(): # Ensure line is not empty
                    scenes.append(Scene(**json.loads(line)))
    except FileNotFoundError:
        # Handle the case where the file doesn't exist, e.g., return an empty list or an error
        return [] # Or raise HTTPException(status_code=404, detail="Scenes file not found")
    return scenes

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
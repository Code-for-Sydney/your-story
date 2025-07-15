from typing import List
import json
import random
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
import uuid
import requests
from dotenv import load_dotenv
import os
import base64

load_dotenv()


class BaseScene(BaseModel):
    prompt: str
    illustration: str

class Scene(BaseModel):
    id: str
    scene: BaseScene

class Story(BaseModel):
    id: str
    style: str
    story: List[Scene]

class GenerateImageRequest(BaseModel):
    id: str
    scene_description: str

app = FastAPI()

# remove 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,  # Set to True if you need to allow cookies or authorization headers
    allow_methods=["*"],     # Allow all HTTP methods (GET, POST, PUT, etc.)
    allow_headers=["*"],     # Allow all headers
)

@app.get("/assets/illustrations/{image_name}")
def get_image(image_name):
    return FileResponse(f"backend/assets/illustrations/{image_name}")

@app.get("/api/human-prompt")
def read_scenes():
    scenes = []
    try:
        with open("backend/data/scenes.jsonl", "r") as f:
            for line in f:
                if line.strip(): # Ensure line is not empty
                    scenes.append(BaseScene(**json.loads(line)))
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="Internal server error.")
    return random.choice(scenes)

@app.post("/api/create-story")
def create_story(scene: Scene):
    story_id = uuid.uuid4()
    story_json = {
        "id": str(story_id),
        "style": "gritty comic book",
        "story": [scene.model_dump()]
        }
    try:
        with open("backend/data/stories.jsonl", "a") as f:
            f.write(json.dumps(story_json) + "\n")
            f.close()
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="Internal server error.")
    return {
        "id": str(story_id),
    }

#not necessary to store description, repurpose for image generation
@app.post("/api/generate-scene-image")
def create_scene_image(request: GenerateImageRequest):
    current_story = ""
    try:
        with open("backend/data/stories.jsonl", "r") as f:
            for line in f:
                story = json.loads(line)
                if str(story["id"]) == str(request.id):
                    for scene in story["story"]:
                        current_story += scene["scene"]["prompt"] + "\n"
                    break
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="Internal server error.")
    prompt = f'''The following text is a scene in a story.
    {request.scene_description}
    Generate an illustration for this scene in a {story["style"]} style.'''
    model = "@cf/black-forest-labs/flux-1-schnell"
    headers = {"Authorization": f"Bearer {os.environ.get("CLOUDFLARE_API_KEY")}"}
    try:
        response = requests.post(f"{os.environ.get("API_BASE_URL")}{model}", headers=headers, json={"prompt": prompt})
        image_id = uuid.uuid4()
        print(response)
        data = response.json()
        with open(f"backend/assets/illustrations/{image_id}.png", "wb") as f:
            f.write(base64.b64decode(data["result"]["image"]))
    except:
        raise HTTPException(status_code=500, detail="Failed to generate image.")
    return {
        "image": f"assets/illustrations/{image_id}.png"
    }


# Mount the frontend's dist directory to be served at the root
# The path is relative to this main.py file (backend/src/main.py)
app.mount("/", StaticFiles(directory="frontend/dist", html=True), name="app_root")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
from typing import List
import json
import random
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException, Body
import uuid
from dotenv import load_dotenv
import os
import base64
from functions import make_ai_call, image_converter_system_prompt, human_prompt_system_prompt

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

@app.get("/assets/illustrations/{image_name}")
def get_image(image_name):
    return FileResponse(f"backend/assets/illustrations/{image_name}")

@app.get("/api/human-prompt")
def read_scenes():
    text_model = "@cf/meta/llama-3.2-1b-instruct"
    image_model = "@cf/black-forest-labs/flux-1-schnell"
    settings = ['fantasy', 'space-based sci-fi', 'cyberpunk dystopia', 'alternate modern history']
    initial_prompt_input = {
    "messages": [
        {"role": "system", "content": human_prompt_system_prompt},
        {"role": "user", "content": random.choice(settings)}
    ]
    }
    try:
        human_prompt = make_ai_call(text_model, initial_prompt_input)
        image_converter_prompt = {
            "messages": [
                {"role": "system", "content": image_converter_system_prompt},
                {"role": "user", "content": human_prompt["result"]["response"]}
            ]
        }
        image_converter = make_ai_call(text_model, image_converter_prompt)
        image_response = make_ai_call(image_model, {"prompt": image_converter["result"]["response"]})
        image_id = uuid.uuid4()
        with open(f"backend/assets/illustrations/{image_id}.png", "wb") as f:
            f.write(base64.b64decode(image_response["result"]["image"]))
    except:
        raise HTTPException(status_code=500, detail="Internal server error.")
    return {
        "prompt": human_prompt["result"]["response"],
        "illustration": f"assets/illustrations/{image_id}.png"
    }

@app.post("/api/create-story")
def create_story(scene: Scene):
    story_id = uuid.uuid4()
    story_json = {
        "id": str(story_id),
        "story": [scene.model_dump()]
        }
    try:
        with open("backend/data/stories.jsonl", "a") as f:
            f.write(json.dumps(story_json) + "\n")
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
    prompt = request.scene_description
    text_model = "@cf/meta/llama-3.2-1b-instruct"
    image_model = "@cf/black-forest-labs/flux-1-schnell"
    text_model_input = {
      "messages": [
        {"role": "system", "content": image_converter_system_prompt},
        {"role": "user", "content": f"Scene description: {prompt}\n\nPrevious scenes:\n{current_story}"}
      ]
    }
    text_response = make_ai_call(text_model, text_model_input)
    image_prompt = f'''
     {text_response["result"]["response"]}'''
    print(image_prompt)
    image_response = make_ai_call(image_model, {"prompt": image_prompt})
    image_id = uuid.uuid4()
    with open(f"backend/assets/illustrations/{image_id}.png", "wb") as f:
        f.write(base64.b64decode(image_response["result"]["image"]))
    return {
        "image": f"assets/illustrations/{image_id}.png"
    }

@app.post("/api/update-story/{id}")
def update_story(id: str, scene: Scene):
    try:
        print("here")
        with open("backend/data/stories.jsonl", "r") as read_file, open("backend/data/temp.jsonl", "a") as write_file:
            for line in read_file:
                if json.loads(line)['id'] == id:
                    story_object = json.loads(line)
                    new_story = story_object['story']
                    new_story.append(scene.model_dump())
                    story_object['story'] = new_story
                    print(story_object)
                    write_file.write(json.dumps(story_object) + "\n")
                else:
                    write_file.write(line)
            os.replace("backend/data/temp.jsonl", "backend/data/stories.jsonl")
    except:
        raise HTTPException(status_code=500, detail="Internal server error.")
    
@app.get("/api/get-story/{id}")
def get_story(id: str):
    try:
        with open("backend/data/stories.jsonl", "r") as f:
            for line in f:
                if json.loads(line)['id'] == id:
                    return json.loads(line)
    except:
        raise HTTPException(status_code=404, detail="Story not found")

@app.get("/view/{id}")
def serve_react_view(id: str):
    # Serve the React app's entry point regardless of the ID
    return FileResponse(os.path.join("frontend/dist", "index.html"))

@app.get("/{full_path:path}")
async def serve_react_app(full_path: str):
    file_path = os.path.join("frontend/dist", "index.html")
    return FileResponse(file_path)

# Mount the frontend's dist directory to be served at the root
# The path is relative to this main.py file (backend/src/main.py)
app.mount("/", StaticFiles(directory="frontend/dist", html=True), name="app_root")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
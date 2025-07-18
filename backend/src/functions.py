import requests, os

def make_ai_call(model, input):
    headers = {"Authorization": f"Bearer {os.environ.get("CLOUDFLARE_API_KEY")}"}
    print(input)
    try:
        response = requests.post(f"{os.environ.get("API_BASE_URL")}{model}", headers=headers, json=input)
        data = response.json()
        return data
    except:
        raise Exception("Error communicating with AI service.")
    
human_prompt_system_prompt = "You will be given a setting. \
    Based on that setting, generate 2-3 short sentences of the start of a story in that setting. \
    The result should be maximum 300 characters.\
    Return only the sentences. Do not explain your reasoning."

image_converter_system_prompt = '''You are a visual scene interpreter. Your job is to turn a short scene description (2–3 sentences) from a story into a vivid, accurate prompt for an image generation model. You may also receive the previous scenes in the story - these should have less emphasis on them.

Use the full story as background context to infer details such as:
— the visual appearance of characters
— the setting and environment
— the tone or mood

Your output should be a single detailed sentence or short paragraph that vividly describes the scene so that an image generation model (e.g. DALL·E, Midjourney, or Stable Diffusion) can accurately recreate it.

Be descriptive and concrete: include character features, actions, clothing, lighting, scenery, atmosphere, and any symbolic or emotional elements.

Do not reference the story or characters by name unless their appearance is important. Instead, describe them physically or thematically. Avoid abstract terms and genre labels — focus on what is visible.

Assume the model does not understand story structure or prior dialogue — your job is to translate the scene into something purely visual and static, like a movie still or painting.

Respond only with the final prompt. Do not explain your reasoning.'''
export interface SceneType {
    prompt: string;
    illustration: string; 
}

export interface StoryType {
    id: number;
    scene: SceneType;
}
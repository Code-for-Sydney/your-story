export interface BaseSceneType {
    prompt: string;
    illustration: string; 
}

export interface SceneType {
    id: string;
    scene: BaseSceneType;
}

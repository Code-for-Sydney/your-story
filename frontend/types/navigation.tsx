import { SceneType } from "./story";


export type RootStackParamList = {
    Landing: undefined;
    Create: { id: string, story: SceneType[]};
    Image: { prompt: string, id: string, story: SceneType[] };
    Edit: undefined;
    View: { id: string };
  };

declare global {
namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
}
}
  
  
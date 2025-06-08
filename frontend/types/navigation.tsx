import { StoryType } from "./story";


export type RootStackParamList = {
    Landing: undefined;
    Create: { story: StoryType[]};
    Image: { prompt: string, story: StoryType[] };
    Edit: undefined;
    View: { story: StoryType[] };
  };

declare global {
namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
}
}
  
  
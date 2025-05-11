export type RootStackParamList = {
    Landing: undefined;
    Create: undefined;
    Image: { scene: string };
    Edit: undefined;
    View: undefined;
  };

declare global {
namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
}
}
  
  
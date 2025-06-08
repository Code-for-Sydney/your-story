import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LandingScreen from './app/pages/LandingScreen';
import CreateScene from './app/pages/CreateScene';
import GenImage from './app/pages/GenImage';
import ViewStory from './app/pages/ViewStory';
import { RootStackParamList } from './types/navigation';



const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Landing' screenOptions={{headerShown: false}}>
        <Stack.Screen name="Landing" component={LandingScreen}/>
        <Stack.Screen name="Create" component={CreateScene}/>
        <Stack.Screen name="Image" component={GenImage}/>
        <Stack.Screen name="View" component={ViewStory}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


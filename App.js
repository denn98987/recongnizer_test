import React from "react";
import PredictCard from "./components/PredictCard";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GalleryScreen from "./screens/GalleryScreen";
import CameraScreen from "./screens/CameraScreen";

const App = () => {
  const Tab = createBottomTabNavigator();
  const GalleryStack = createStackNavigator();
  const CameraStack = createStackNavigator();

  const GalleryStackScreen = () => (
    <GalleryStack.Navigator>
      <GalleryStack.Screen name="From Gallery" component={GalleryScreen} />
      <GalleryStack.Screen name="Recognized" component={PredictCard} />
    </GalleryStack.Navigator>
  );

  const CameraStackScreen = () => (
    <CameraStack.Navigator>
      <CameraStack.Screen name="Camera" component={CameraScreen} />
      <CameraStack.Screen name="Recognized" component={PredictCard} />
    </CameraStack.Navigator>
  );

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Gallery" component={GalleryStackScreen} />
        <Tab.Screen name="Camera" component={CameraStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

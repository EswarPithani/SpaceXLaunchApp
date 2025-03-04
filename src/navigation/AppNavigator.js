import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LaunchListScreen from "../screens/LaunchListScreen";
import LaunchDetailsScreen from "../screens/LaunchDetailsScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LaunchList" component={LaunchListScreen} />
      <Stack.Screen name="LaunchDetails" component={LaunchDetailsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

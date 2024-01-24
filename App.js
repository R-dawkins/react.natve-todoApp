import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from './src/components/LoginScreen'
import TodoScreen from './src/components/TodoScreen'

const Stack = createStackNavigator();

const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        <Stack.Screen name="TodoScreen" component={TodoScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
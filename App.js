import React from "react";
import { NavigationContainer } from "@react-navigation/native";


import DetailScreen from './src/screens/DetailScreen';

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen 
          name="Detail" 
          component={DetailScreen} 
          options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

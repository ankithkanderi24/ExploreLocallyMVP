import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './Screens/loginScreen'; 
import CallPage from './Screens/callscreen'; // Assuming CallPage is the component you want to navigate to

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Call" component={CallPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

import React, { useEffect, useState } from 'react';
import { StyleSheet, LogBox } from 'react-native';
LogBox.ignoreAllLogs();
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './Screens/loginScreen';
import RegistrationScreen from './Screens/registrationScreen';
import AdvisorWaitingScreen from './Screens/AdvisorWaitingScreen';
import AdvisorRegistrationInformationScreen from './Screens/AdvisorRegistrationInformationScreen';
import SearchAdvisorsScreen from './Screens/SearchAdvisorsScreen';
import RatingScreen from './Screens/RatingScreen';
import DashboardScreen from './Screens/DashboardScreen';
import CallPage from './Screens/callscreen';
import { API_URL } from './API_Constant';

console.disableYellowBox = true;

const Stack = createStackNavigator();


const App = () => {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState(null);
  
  useEffect(() => {
    if (username) { 
      fetch(`${API_URL}/advisors/getall`)
        .then((response) => response.json())
        .then((jsonData) => setData(jsonData))
        .catch((error) => console.error(error));
    }
  }, [username]);
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login">
          {props => <LoginScreen {...props} onLogin={setUsername} />}
        </Stack.Screen>
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name = "Waiting" component={AdvisorWaitingScreen} />
        <Stack.Screen name = "AdvisorRegistration" component={AdvisorRegistrationInformationScreen} />
        <Stack.Screen name="SearchAdvisors" component={SearchAdvisorsScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen}/>
        <Stack.Screen name="RateAdvisor" component={RatingScreen} />
        <Stack.Screen name = "Call" component = {CallPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default App;
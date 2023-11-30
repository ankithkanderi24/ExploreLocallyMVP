import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Switch, Text, Alert, Image, TouchableOpacity } from 'react-native';
import { API_URL } from '../API_Constant';


const RegistrationScreen = ({ onRegister, navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isAdvisor, setIsAdvisor] = useState(false);  

  const handleRegistration = () => {
    const userType = isAdvisor ? 'advisors' : 'users';
    let urlSuffix = isAdvisor ? `/${username}/${password}/${email}/${phoneNumber}/${address}` : `/${username}/${password}/${email}`;
  
    fetch(`${API_URL}/${userType}/register${urlSuffix}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      const statusCode = response.status;
      return response.text().then(text => ({
        status: statusCode,
        text: text
      }));
    })
    .then(({ status, text }) => {
      console.log("Server Response:", text);
      if (status === 400) {
        onRegister(username);
        navigation.navigate('Login');
      } else if (status === 200 && isAdvisor) {
        navigation.navigate('AdvisorRegistration', { username, phoneNumber, address });
      } else if (status == 200 && !isAdvisor) {
        navigation.navigate('Login')
        Alert.alert('Successful Registration')
      } else {
        Alert.alert('Registration Failed:', text);
      }
    })
    .catch(error => console.error(error));
  };

  const selectUserType = (type) => {
    setIsAdvisor(type === 'advisor');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../Images/Logo.png')} style={styles.logo}/>

      <TextInput
        placeholder="Username"
        placeholderTextColor="#34495e"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#34495e"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="#34495e"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      {isAdvisor && (
        <>
          <TextInput
            placeholder="Address"
            placeholderTextColor="#34495e"
            value={address}
            onChangeText={setAddress}
            style={styles.input}
          />
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor="#34495e"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            style={styles.input}
          />
        </>
      )}

<View style={styles.selectionContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: !isAdvisor ? '#3498db' : '#fff' }]}
          onPress={() => selectUserType('user')}>
          <Text style={[styles.buttonText, { color: !isAdvisor ? '#fff' : '#000' }]}>User</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: isAdvisor ? '#3498db' : '#fff' }]}
          onPress={() => selectUserType('advisor')}>
          <Text style={[styles.buttonText, { color: isAdvisor ? '#fff' : '#000' }]}>Advisor</Text>
        </TouchableOpacity>
      </View>

      <Button
        title={isAdvisor ? "Apply to platform" : "Register"}
        onPress={handleRegistration}
        color="#3498db" 
      />

      <Button
        title="Back to Login"
        onPress={() => navigation.goBack()}
        color="#e74c3c"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ecf0f1',  // Light gray background for contrast
  },
  selectionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    alignItems: 'center',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#3498db',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    height: 45,
    borderRadius: 5,  
    borderColor: '#3498db',  
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    elevation: 3,  
    shadowOffset: { width: 1, height: 1 }, 
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  logo: {
    width: 100,
    height: 100, 
    resizeMode: 'contain',
    marginBottom: 20, 
    alignSelf: 'center',
  },
  submitButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
  backButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default RegistrationScreen;


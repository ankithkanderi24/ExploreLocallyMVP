import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {

  const handleLogin = () => {
    navigation.navigate('Call');  // Navigate to callscreen when the button is pressed
  };

  return (
    <View style={styles.container}>
      <Button title="Login" onPress={handleLogin} color="#3498db" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ecf0f1',
  }
});

export default LoginScreen;

import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PersonCard = ({username, location, interests, languages, rating }) => {
  const navigation = useNavigation();

  const renderArrayAsString = (array) => {
    return Array.isArray(array) && array.length ? array.join(', ') : 'None';
  };

  const goToCallScreen = () => {
    navigation.navigate('Call', {username});
  };

  const displayRating = typeof rating === 'number' ? `${rating.toFixed(1)} / 5.0` : 'Not rated yet';

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{username}</Text>
      <Text style={styles.text}>Location: {location}</Text>
      <Text style={styles.text}>Languages: {renderArrayAsString(languages)}</Text>
      <Text style={styles.text}>Interests: {renderArrayAsString(interests)}</Text>
      <Text style={styles.text}>Rating: {displayRating !== null ? displayRating : 'No Rating Yet'}</Text>
      <TouchableOpacity style={styles.button} onPress={goToCallScreen}>
        <Text style={styles.buttonText}>Call</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#3498db', 
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold', 
    marginBottom: 10,
    color: 'white', 
  },
  text: {
    color: 'white'
  },
  button: {
    backgroundColor: 'white', 
    paddingVertical: 5, 
    paddingHorizontal: 10, 
    borderRadius: 5,
    marginTop: 10,
    width: 'auto',
    alignItems: 'center'
  },
  buttonText: {
    color: 'black', 
    fontSize: 16, 
  },
});


export default PersonCard;
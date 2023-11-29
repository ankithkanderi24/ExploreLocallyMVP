import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
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
      <Text>Location: {location}</Text>
      <Text>Languages: {renderArrayAsString(languages)}</Text>
      <Text>Interests: {renderArrayAsString(interests)}</Text>
      <Text>Rating: {displayRating !== null ? displayRating : 'No Rating Yet'}</Text>
      <Button title="Call" onPress={goToCallScreen} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    marginBottom: 10,
  },
});


export default PersonCard;
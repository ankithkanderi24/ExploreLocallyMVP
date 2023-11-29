import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Rating } from 'react-native-ratings';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../API_Constant';

const RatingScreen = ({ route }) => {
    const navigation = useNavigation();
    const { username} = route.params;
    const [userRating, setUserRating] = useState(Math.round(userRating) || 1);

    const submitRating = async () => {
        const apiUrl = `${API_URL}/advisors/rate/${username}/${userRating}`;
        try {
            const response = await fetch(apiUrl, { method: 'POST' });
            const data = await response.json();
            console.log('Rating submitted:', data);
            navigation.navigate('SearchAdvisors');
        } catch (error) {
            console.error('Error submitting rating:', error);
            Alert.alert("Error", "There was a problem submitting your rating.");
        }
    };

    const handleRatingComplete = (rating) => {
        console.log('Rating selected:', rating);
        setUserRating(rating);
    };

    const navigateBack = () => {
      navigation.navigate('SearchAdvisors');
  };




    return (
    <View style={styles.container}>
        <Text style={styles.text}>Rate {username}</Text>
        <Rating
            showRating
            type='star'
            startingValue={Math.round(userRating)}
            onFinishRating={handleRatingComplete}  
            style={styles.rating}
        />
        <TouchableOpacity style={styles.button} onPress={submitRating}>
                <Text style={styles.buttonText}>Submit Rating</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.backButton]} onPress={navigateBack}>
                <Text style={styles.buttonText}>Return to Search</Text>
        </TouchableOpacity>
    </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  rating: {
    marginBottom: 40,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default RatingScreen;
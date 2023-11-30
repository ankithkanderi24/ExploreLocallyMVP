import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Button, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { API_URL } from '../API_Constant';


const AdvisorRegistrationInformationScreen = ({ route, navigation }) => {


  const { username, phoneNumber, address } = route.params;
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [openLocation, setOpenLocation] = useState(false);
  const [openLanguages, setOpenLanguages] = useState(false);
  const [openInterests, setOpenInterests] = useState(false);

  const locations = [
    { label: 'New York', value: 'New York' },
    { label: 'Rome', value: 'Rome' },
    { label: 'Paris', value: 'Paris' },
    { label: 'Tokyo', value: 'Tokyo' },
    { label: 'Sydney', value: 'Sydney' },
    { label: 'Buenos Aires', value: 'Buenos Aires' }
  ];
    
  const languages = [
    { label: 'English', value: 'English' },
    { label: 'Italian', value: 'Italian' },
    { label: 'French', value: 'French' },
    { label: 'Japanese', value: 'Japanese' },
    { label: 'Spanish', value: 'Spanish' }
  ];
    
  const interests = [
    { label: 'Budget', value: 'Budget' },
    { label: 'Outdoors', value: 'Outdoors' },
    { label: 'Nightlife', value: 'Nightlife' },
    { label: 'Family-Friendly', value: 'Family-Friendly' },
    { label: 'Scenic', value: 'Scenic' },
    { label: 'Foodie', value: 'Foodie' }
  ];

  const handleLanguageToggle = (language) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter((item) => item !== language));
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  const handleInterestToggle = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleRegistrationInformation = () => {
    const data = {
      languages: selectedLanguages,
      interests: selectedInterests,
      location: selectedLocation,
    };
  
    fetch(`${API_URL}/advisors/registerinformation/${username}/${phoneNumber}/${address}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        const statusCode = response.status;
        return response.text().then(text => ({
          status: statusCode,
          text: text,
        }));
      })
      .then(({ status, text }) => {
        if (status === 200) {
          Alert.alert('Successful Application, please wait for approval')
          navigation.navigate('Login');
        } else {
          Alert.alert('Registration Failed', text);
        }
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'An error occurred during registration.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Destination You Plan to Advise On:</Text>
        <DropDownPicker
        open={openLocation}
        value={selectedLocation}
        items={locations}
        setOpen={setOpenLocation}
        setValue={setSelectedLocation}
        zIndex={3000}
        IndexInverse={1000}
        style={styles.picker}
        />

        <Text style={styles.label}>Select Proficient Languages:</Text>
        <DropDownPicker
          open={openLanguages}
          value={selectedLanguages}
          items={languages}
          setOpen={setOpenLanguages}
          setValue={setSelectedLanguages}
          multiple={true}
          zIndex={2000}
          zIndexInverse={2000}
          style={styles.picker}
        />

        <Text style={styles.label}>Select Your Specific Areas of Knowledge:</Text>
        <DropDownPicker
          open={openInterests}
          value={selectedInterests}
          items={interests}
          setOpen={setOpenInterests}
          setValue={setSelectedInterests}
          multiple={true}
          zIndex={1000}
          zIndexInverse={3000}
          style={styles.picker}
        />

      <TouchableOpacity style={styles.button} onPress={handleRegistrationInformation}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingBottom: 100, 
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#000',
    alignSelf: 'stretch',
  },
  picker: {
    height: 40,
    marginBottom: 15,
    width: '100%',
  },
  button: {
    backgroundColor: '#0066CC',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 30,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default AdvisorRegistrationInformationScreen;
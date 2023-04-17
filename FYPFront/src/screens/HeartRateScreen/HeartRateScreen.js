import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { Checkbox } from 'react-native-paper';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../../components/CustomButton/CustomButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const HeartRateScreen = () => {

  const navigation = useNavigation();
  const [pulse, setPulse] = useState('');
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [error, setError] = useState(null);

  const addHRandBP = async (isChecked) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post('https://ouvatek.herokuapp.com/api/heartrate',
        { checked: isChecked, pulse, systolic, diastolic },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        },
      );
      if (response.status === 200) {
        isChecked ? navigation.navigate('HeartRate') : navigation.navigate('Measurement');
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const onCheckValuePressed = () => {
    addHRandBP(true);
  };

  const onSubmitPressed = () => {
    addHRandBP(false);
  };

  const onSeeGraphPressed = () => {
    navigation.navigate('Graph');
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon
          name="heart-pulse"
          style={styles.icon}
        />
        <Text style={styles.error}>{error}</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.txtTitle}>Please Enter Your Heart Rate</Text>
        <Icon
          name='help-circle-outline'
          style={styles.helpIcon}
        />
      </View>
      <View style={[styles.inputContainer, { marginBottom: 20 }]}>
        <TextInput
          onChangeText={setPulse}
          value={pulse}
          placeholder="70"
          keyboardType="numeric"
          style={styles.input}
        />
        <Text style={styles.txt}>BPM</Text>
      </View>


      <View style={styles.titleContainer}>
        <Text style={styles.txtTitle}>Please Enter Your Blood Pressure</Text>
        <Icon
          name='help-circle-outline'
          style={styles.helpIcon}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={setSystolic}
          value={systolic}
          placeholder="120"
          keyboardType="numeric"
          style={styles.input}
        />

        <Text style={{ fontSize: 35 }}>/</Text>

        <TextInput
          onChangeText={setDiastolic}
          value={diastolic}
          placeholder="80"
          keyboardType="numeric"
          style={styles.input}
        />
        <Text style={styles.txt}>mmHg</Text>
      </View>

      <View style={styles.btnContainer}>
        <CustomButton
          text="Check Values"
          onPress={onCheckValuePressed}
          type='Teritiary'
        />
      </View>

      <View style={styles.btnContainer}>
        <CustomButton
          text="See Graph"
          onPress={onSeeGraphPressed}
          type='Secondary'
        />
      </View>
      <CustomButton
        text="Submit"
        onPress={onSubmitPressed}
      />


    </View>
  );
};

export default HeartRateScreen;

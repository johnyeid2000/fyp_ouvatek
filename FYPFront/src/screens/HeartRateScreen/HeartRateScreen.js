import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
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
  const [date, setDate] = useState([]);
  const [time, setTime] = useState([]);
  const [valueHR, setValueHR] = useState([]);
  const [valueSys, setValueSys] = useState([]);
  const [valueDias, setValueDias] = useState([]);
  const [isPressed, setIsPressed] = useState(false);
  const [isPressedCheckVal, setIsPressedCheckVal] = useState(false);
  const [error, setError] = useState(null);

  const labels = date.map((d, i) => `${d} ${time[i]}`);


  const addHRandBP = async (isChecked) => {
    isChecked ? setIsPressedCheckVal(true) : setIsPressed(true);
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
        setError(` ${response.data.respiratoryStatus} \n ${response.data.bloodPressure}`);
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      isChecked ? setIsPressedCheckVal(false) : setIsPressed(false);
    }
  };

  const getProfileData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('https://ouvatek.herokuapp.com/api/heartratevalue', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const dates = [];
      const times = [];
      const valuesHR = [];
      const valuesSys = [];
      const valuesDias = [];
      // console.log(response.data.data);
      response.data.data.forEach((d) => {
        dates.push(d.hr_date);
        times.push(d.hr_time);
        valuesHR.push(d.HR_val);
        valuesSys.push(d.Sys_val);
        valuesDias.push(d.Dias_val);
      });
      setDate(dates);
      setTime(times);
      setValueHR(valuesHR);
      setValueSys(valuesSys);
      setValueDias(valuesDias);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getProfileData();
    });
    return unsubscribe;
  }, [navigation]);

  const onCheckValuePressed = () => {
    addHRandBP(true);
  };

  const onSubmitPressed = () => {
    addHRandBP(false);
  };

  const onSeeGraphPressed = () => {
    if (valueHR.length) {
      navigation.navigate('ChooseGraph', { labels, valueHR, valueDias, valueSys });
    } else {
      setError('You have no measurements to see on the graph');
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
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
            text={isPressedCheckVal ? "Checking values" : "Check Values"}
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
          text={isPressed ? 'Submitting...' : 'Submit'}
          onPress={onSubmitPressed}
        />

        <CustomButton
          text="Go back"
          onPress={() => navigation.goBack()}
          type='Teritiary'
        />
      </View>
    </ScrollView>
  );
};

export default HeartRateScreen;

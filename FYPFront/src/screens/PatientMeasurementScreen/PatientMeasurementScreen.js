import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { Avatar, Title, Caption } from 'react-native-paper';
import styles from './styles';
import MeasurementButton from '../../components/MeasurementButton/MeasurementButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const PatientMeasurementScreen = ({ route }) => {

  const navigation = useNavigation();
  const { id, pat_id } = route.params;
  const [userData, setUserData] = useState('');

  const getPatientData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post('https://ouvatek.herokuapp.com/api/getpatient', { id }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setUserData(response.data.specificData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPatientData();
  }, []);


  const HeartRatePressed = () => {
    navigation.navigate('CheckHRandBP', { pat_id });
  };
  const TemperaturePressed = () => {
    navigation.navigate('CheckTemperature', { pat_id });
  };
  const BloodGlucosePressed = () => {
    navigation.navigate('CheckBloodGlucose', { pat_id });
  };
  const LabTestPressed = () => {
    console.warn('Check lab test pressed');
  };
  const SpO2Pressed = () => {
    navigation.navigate('CheckSPO2', { pat_id });
  };
  const FetusPressed = () => {
    console.warn('Check Fetus Pressed');
  };
  const WeightPressed = () => {
    navigation.navigate('CheckWeight', { pat_id });
  };
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <Avatar.Image
            source={{ uri: 'https://dub01pap003files.storage.live.com/y4m0SSC9fzPryBlevyPGjBpQlVmCD52-SGGPDA-Hk8H2ps-cfOXNJ_Jt_G7wR64SL0IwM9SyZz7ocmciHVwZ52Ij1OrTg1MS2IQogTINfsqc7KU2eFR2Z2zXB0BmAbDAE0_cmbOEtQfuA13NUuitrJ3KQr0YHT4hgjwqAUGU2iG5iNfenB95VV2l3JT6vKPQ-6u?width=200&height=200&cropmode=none' }}
            size={80}
            style={{ backgroundColor: 'white' }}
          />
          <View style={{ marginLeft: 20 }}>
            <Title style={[styles.title, {
              marginTop: 15,
              marginBottom: 5,
            }]}>{userData.first_name} {userData.last_name}</Title>
            <Caption style={styles.caption}>{userData.trimester_name}</Caption>
          </View>
        </View>
      </View>

      <ScrollView style={{ marginTop: 20 }}>
        <MeasurementButton
          text="Check Heart rate & blood pressure"
          onPress={HeartRatePressed}
          IconName="heart-pulse"
        />

        <MeasurementButton
          text="Check Temperature"
          onPress={TemperaturePressed}
          IconName="thermometer"
        />

        <MeasurementButton
          text="Check Blood glucose"
          onPress={BloodGlucosePressed}
          IconName="diabetes"
        />

        <MeasurementButton
          text="Check Lab test"
          onPress={LabTestPressed}
          IconName="test-tube"
        />

        <MeasurementButton
          text="Check SpO2"
          onPress={SpO2Pressed}
          IconName="percent-outline"
        />

        <MeasurementButton
          text="Check Weight"
          onPress={WeightPressed}
          IconName="scale-bathroom"
        />

        <MeasurementButton
          text="Check Fetus"
          onPress={FetusPressed}
          IconName="baby-face-outline"
        />
      </ScrollView>
    </SafeAreaView>
  );

};

export default PatientMeasurementScreen;

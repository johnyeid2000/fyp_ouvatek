import React from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { Avatar, Title, Caption } from 'react-native-paper';
import styles from './styles';
import MeasurementButton from '../../components/MeasurementButton/MeasurementButton';

import { useNavigation } from '@react-navigation/native';

const PatientMeasurementScreen = ({ route }) => {

  const navigation = useNavigation();
  const { id } = route.params;

  const HeartRatePressed = () => {
  };
  const TemperaturePressed = () => {
  };
  const BloodGlucosePressed = () => {
  };
  const LabTestPressed = () => {
  };
  const SpO2Pressed = () => {
  };
  const FetusPressed = () => {
  };
  const WeightPressed = () => {
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
            }]}></Title>
            <Caption style={styles.caption}></Caption>
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

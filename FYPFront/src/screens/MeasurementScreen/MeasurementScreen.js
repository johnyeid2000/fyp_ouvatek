import React from 'react';
import {View, Text} from 'react-native';
import MeasurementButton from '../../components/MeasurementButton/MeasurementButton';

const MeasurementScreen = () => {
  const HeartRatePressed = () => {
    console.warn('Heart Rate and blood pressure Pressed');
  };
  const TemperaturePressed = () => {
    console.warn('Temperature Pressed');
  };
  const BloodGlucosePressed = () => {
    console.warn('Blood Glucose Pressed');
  };
  const LabTestPressed = () => {
    console.warn('Lab Test Pressed');
  };
  const SpO2Pressed = () => {
    console.warn('SpO2 Pressed');
  };
  const FetusPressed = () => {
    console.warn('Fetus Pressed');
  };

  return (
    <View>
      <View style={{marginTop: '10%'}}>
        <MeasurementButton
          text="Heart rate & blood pressure"
          onPress={HeartRatePressed}
          IconName="heart-pulse"
        />
      </View>
      <MeasurementButton
        text="Temperature"
        onPress={TemperaturePressed}
        IconName="thermometer"
      />

      <MeasurementButton
        text="Blood glucose"
        onPress={BloodGlucosePressed}
        IconName="diabetes"
      />

      <MeasurementButton
        text="Lab test"
        onPress={LabTestPressed}
        IconName="test-tube"
      />

      <MeasurementButton
        text="SpO2"
        onPress={SpO2Pressed}
        IconName="percent-outline"
      />

      <MeasurementButton
        text="Fetus"
        onPress={FetusPressed}
        IconName="baby-face-outline"
      />
    </View>
  );
};

export default MeasurementScreen;

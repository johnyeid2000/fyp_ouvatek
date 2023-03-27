import React , {useEffect} from 'react';
import {View, Text, BackHandler, Alert} from 'react-native';
import MeasurementButton from '../../components/MeasurementButton/MeasurementButton';

import {useNavigation} from '@react-navigation/native';


const MeasurementScreen = () => {

  const navigation = useNavigation();


      useEffect(() => {
    const handleBackPress = () => {
      if (navigation.isFocused()) {
        Alert.alert(
          'Are you sure you want to Logout?',
          '',
          [
            { text: 'NO', onPress: () => false, style: 'cancel' },
            { text: 'YES', onPress: () => navigation.navigate("SignIn")},
          ],
          { cancelable: false }
        );

        // Prevent going back to the previous screen
        return true;
      }

      // Allow going back to the previous screen
      return false;
    };

    // Add the event listener
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    // Remove the event listener when the component is unmounted
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [navigation]);

  const HeartRatePressed = () => {
    navigation.navigate('HeartRate');
    //console.warn('Heart Rate and blood pressure Pressed');
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

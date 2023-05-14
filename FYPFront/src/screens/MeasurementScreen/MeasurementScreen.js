import React, { useEffect } from 'react';
import { View, Text, BackHandler, Alert } from 'react-native';
import MeasurementButton from '../../components/MeasurementButton/MeasurementButton';
import { useNavigation } from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';
import styles from './styles';

PushNotification.createChannel(
  {
    channelId: 'reminder', // The ID of the notification channel
    channelName: 'Reminder', // The name of the notification channel
    channelDescription: 'Reminders for taking measurements', // The description of the notification channel
    soundName: 'default', // The sound to play when the notification is triggered
    importance: 4, // The priority of the notification channel (4 = high)
    vibrate: true, // Whether to vibrate the device when the notification is triggered
  },
);

const setupNotification = () => {
  PushNotification.localNotification({
    message: "Remember to enter your measurements today!",
    channelId: 'reminder',
  });
};

const MeasurementScreen = () => {

  const navigation = useNavigation();

  useEffect(() => {
    const now = new Date();
    if (now.getDay() === 5) { // 5 represents Friday in JavaScript's Date object
      setupNotification();
    }

    const handleBackPress = () => {
      if (navigation.isFocused()) {
        Alert.alert(
          'Are you sure you want to Logout?',
          '',
          [
            { text: 'NO', onPress: () => false, style: 'cancel' },
            { text: 'YES', onPress: () => navigation.navigate("SignIn") },
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
  };
  const TemperaturePressed = () => {
    navigation.navigate('Temperature');
  };
  const BloodGlucosePressed = () => {
    navigation.navigate('BloodGlucose');
  };
  const LabTestPressed = () => {
    navigation.navigate('LabTest');
  };
  const SpO2Pressed = () => {
    navigation.navigate('Spo2');
  };
  const FetusPressed = () => {
    navigation.navigate('Fetus');
  };
  const WeightPressed = () => {
    navigation.navigate('Weight');
  };

  return (
    <View style={styles.container}>
      <MeasurementButton
        text="Heart rate & blood pressure"
        onPress={HeartRatePressed}
        IconName="heart-pulse"
      />

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
        text="Weight"
        onPress={WeightPressed}
        IconName="scale-bathroom"
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

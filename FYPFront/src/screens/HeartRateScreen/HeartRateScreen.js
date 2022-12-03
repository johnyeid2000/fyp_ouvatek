import React , {useState} from 'react';
import {View, Text, TextInput} from 'react-native';

import CustomButton from "../../components/CustomButton/CustomButton";

import Icon  from "react-native-vector-icons/MaterialCommunityIcons";

import styles from './styles';

import {useNavigation} from '@react-navigation/native';

const HeartRateScreen = () => {

  const navigation = useNavigation();

  const onSeeGraphPressed = () => {
    navigation.navigate('Graph');
  };

  const onSubmitPressed = () => {
    console.warn('submit pressed');
  };

  const [pulse, setPulse] = useState('');
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');


  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon 
          name="heart-pulse"
          style={styles.icon}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.txtTitle}>Please Enter Your Heart Rate</Text>
        <Icon
          name='help-circle-outline'
          style={styles.helpIcon}
        />
      </View>
      <View style={styles.inputContainer}>
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

        <Text style={{fontSize:35}}>/</Text>

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
                text="See Graph"
                onPress={onSeeGraphPressed}
                type='Teritiary'
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

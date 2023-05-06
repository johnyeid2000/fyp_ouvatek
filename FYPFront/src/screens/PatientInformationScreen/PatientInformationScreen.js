import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, BackHandler, Pressable } from "react-native";
import { Checkbox } from 'react-native-paper';
import axios from "axios";
import CustomPicker from '../../components/CustomPicker/CustomPicker';
import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomDatePicker from "../../components/CustomDatePicker/CustomDatePicker";
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const PatientInformationScreen = ({ route }) => {
  const [birthDate, setBirthDate] = useState('');
  const [BloodType, setBloodType] = useState([]);
  const [selectedBloodType, setSelectedBloodType] = useState(null);
  const [height, setHeight] = useState('');
  const [firstPregnancyDay, setFirstPregnancyDay] = useState('');
  const [Medication, setMedication] = useState([]);
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [checkDiabetes, setCheckDiabetes] = useState(false);
  const [checkHypertension, setCheckHypertension] = useState(false);
  const [Surgeries, setSurgeries] = useState([]);
  const [selectedSurgeries, setSelectedSurgeries] = useState(null);
  const [isPressed, setIsPressed] = useState(false);
  const [checkPrevPreg, setCheckPrevPreg] = useState(false);
  const [patientInfoStatus, setPatientInfoStatus] = useState(null);
  const navigation = useNavigation();
  const { id } = route.params;

  useEffect(() => {
    axios.get('https://ouvatek.herokuapp.com/api/bloodtype')
      .then(response => {
        setBloodType(response.data.rows);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get('https://ouvatek.herokuapp.com/api/medication')
      .then(response => {
        setMedication(response.data.rows);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get('https://ouvatek.herokuapp.com/api/surgeries')
      .then(response => {
        setSurgeries(response.data.rows);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      backHandler.remove();
    };
  }, []);

  const handleBackPress = () => {
    // Return true to prevent default back navigation
    return true;
  };

  const signUpPatient = async () => {
    setIsPressed(true);
    try {
      const response = await axios.post('https://ouvatek.herokuapp.com/api/patientsignup',
        { id, birthDate, height, selectedBloodType, firstPregnancyDay, selectedMedication, checkDiabetes, checkHypertension, selectedSurgeries, checkPrevPreg },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      if (response.status === 200) {
        navigation.navigate("ConfirmEmail", { id: id });
      }
    } catch (error) {
      setPatientInfoStatus(error.response.data.message);
    } finally {
      setIsPressed(false);
    }
  };

  const onSubmitPressed = () => {
    signUpPatient();
  };

  const onSignInPressed = () => {
    navigation.navigate("SignIn");
  };

  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <View style={styles.root}>
        <Text style={styles.title}>Please fill all the information to complete your file</Text>
        <Text style={styles.error}>{patientInfoStatus}</Text>

        <CustomDatePicker
          label="Birth Date"
          IconName="calendar"
          value={birthDate}
          onChange={setBirthDate}
          isMaxDateDisabled={true}
        />

        <CustomPicker
          label="Blood Type"
          IconName="blood-bag"
          selOption={selectedBloodType}
          setSelOption={setSelectedBloodType}
          opt={BloodType.map(bloodType => ({ label: bloodType.type_name, value: bloodType.type_id }))}
        />

        <CustomInput
          label="Height"
          IconName="human-male-height"
          placeholder="Enter Your height in meters"
          value={height}
          setValue={setHeight}
          keyType="numeric"
        />

        <CustomDatePicker
          label="First Pregnancy Day"
          IconName="calendar-heart"
          value={firstPregnancyDay}
          onChange={setFirstPregnancyDay}
          isMaxDateDisabled={true}
          isMinDateDisabled={true}
        />

        <CustomPicker
          label="Medication"
          IconName="medical-bag"
          selOption={selectedMedication}
          setSelOption={setSelectedMedication}
          opt={Medication.map(medication => ({ label: medication.medication_name, value: medication.medication_id }))}
        />

        <Text style={styles.txt}>Check the box next to your corresponding case(s):</Text>

        <View style={styles.checkboxContainer}>
          <Pressable style={styles.checkbox} onPress={() => { setCheckDiabetes(!checkDiabetes); }}>
            <Checkbox
              status={checkDiabetes ? 'checked' : 'unchecked'}
              color='#651B70'
            />
            <Text>Diabetes </Text>
          </Pressable>

          <Pressable style={styles.checkbox} onPress={() => { setCheckHypertension(!checkHypertension); }}>
            <Checkbox
              status={checkHypertension ? 'checked' : 'unchecked'}
              color='#651B70'
            />
            <Text>Hypertension </Text>
          </Pressable>

          <Pressable style={styles.checkbox} onPress={() => { setCheckPrevPreg(!checkPrevPreg); }}>
            <Checkbox
              status={checkPrevPreg ? 'checked' : 'unchecked'}
              color='#651B70'
            />
            <Text>Previous Pregnancies </Text>
          </Pressable>

        </View>

        <CustomPicker
          label="Previous surgeries"
          IconName="scissors-cutting"
          selOption={selectedSurgeries}
          setSelOption={setSelectedSurgeries}
          opt={Surgeries.map(surgery => ({ label: surgery.surgeries_name, value: surgery.surgeries_id }))}
        />

        <CustomButton
          text={isPressed ? 'Submitting...' : 'Submit'}
          onPress={onSubmitPressed}
        />

        <CustomButton
          text="Have an account? Sign In"
          onPress={onSignInPressed}
          type='Teritiary'
        />
      </View>
    </ScrollView>
  );
};

export default PatientInformationScreen


import React, {useState} from "react";
import { Text, View, ScrollView } from "react-native";
import { Checkbox } from 'react-native-paper';

import CustomPicker from '../../components/CustomPicker/CustomPicker';
import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton/CustomButton";

import styles from './styles';

import {useNavigation} from '@react-navigation/native';

const PatientInformationScreen =() =>{
    const [BDay, setBDay] = useState('');
    const [BloodType, setBloodType] = useState('option1');
    const [PregDay, setPregDay] = useState('');
    const [Medication, setMedication] = useState('option1m');
    const [checkDiabetes, setCheckDiabetes] = useState(false);
    const [checkHypertension, setCheckHypertension] = useState(false);
    const [Surgeries, setSurgeries] = useState('optionsSurgeries');
    const [checkPrevPreg, setCheckPrevPreg] = useState('');

    const optionsBloodType = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' }
    ];

    const optionsMedication = [
        { label: 'Option 1', value: 'option1m' },
        { label: 'Option 2', value: 'option2m' },
        { label: 'Option 3', value: 'option3m' }
    ];

    const optionsSurgeries = [
        { label: 'Option 1', value: 'option1s' },
        { label: 'Option 2', value: 'option2s' },
        { label: 'Option 3', value: 'option3s' }
    ];

    const [patientInfoStatus, setPatientInfoStatus] = useState("");

    const navigation = useNavigation();

    // const postDataUsingAsyncAwait = async () => {
    //     try {
    //       await axios.post(
    //         '127.0.0.1:3000/login', JSON.stringify({'email': email, 'password': password, 'checked':checked})
    //       )
    //       .then(function (response){

    //         if(response.data.message){
    //             setPatientInfoStatus(response.data.message);
    //         }
    //         else{
    //             navigation.navigate("SignIn");
    //         }
    //       })
    //     } catch (error) {
    //       // handle error
    //       //alert(error.message);
    //       alert("test test");
    //     }
    //   };

    const onSubmitPressed = () => {
        //postDataUsingAsyncAwait()
        navigation.navigate("SignIn");
    };

    const onSignInPressed = () => {
        navigation.navigate("SignIn");
    };

    return(
        <ScrollView>
        <View style={styles.root}>
            <Text style={styles.title}>Please fill all the information to complete your file</Text>
            <Text style={styles.error}>{patientInfoStatus}</Text>

            <CustomInput
                label="Birth Date"
                IconName="calendar"
                placeholder="Enter Your Birth Date"
                value={BDay}
                setValue={setBDay}
            />

            <CustomPicker
                label="Blood Type"
                IconName="blood-bag"
                selOption={BloodType}
                setSelOption={setBloodType}
                opt={optionsBloodType}
            />
            
            <CustomInput
                label="First Pregnancy Day"
                IconName="calendar-heart"
                placeholder="Enter Your first day of pregnancy"
                value={PregDay}
                setValue={setPregDay}
            />

            <CustomPicker
                label="Medication"
                IconName="medical-bag"
                selOption={Medication}
                setSelOption={setMedication}
                opt={optionsMedication}
            />

            <Text style={styles.txt}>Check the box next to your corresponding case(s):</Text>

            <View style={styles.checkboxContainer}>
                <View style={styles.checkbox}>
                <Checkbox
                    status={checkDiabetes ? 'checked' : 'unchecked'}
                    onPress={() => { setCheckDiabetes(!checkDiabetes); }}
                    color='#651B70'
                />
                <Text>Diabetes </Text>
            </View>

            <View style={styles.checkbox}>
                <Checkbox
                    status={checkHypertension ? 'checked' : 'unchecked'}
                    onPress={() => { setCheckHypertension(!checkHypertension); }}
                    color='#651B70'
                />
                <Text>Hypertension </Text>
            </View>

            <View style={styles.checkbox}>
                <Checkbox
                    status={checkPrevPreg ? 'checked' : 'unchecked'}
                    onPress={() => { setCheckPrevPreg(!checkPrevPreg); }}
                    color='#651B70'
                />
                <Text>Previous Pregnancies </Text>
            </View>

            </View>
            
            <CustomPicker
                label="Previous surgeries"
                IconName="scissors-cutting"
                selOption={Surgeries}
                setSelOption={setSurgeries}
                opt={optionsSurgeries}
            />

            <CustomButton
                text="Submit"
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


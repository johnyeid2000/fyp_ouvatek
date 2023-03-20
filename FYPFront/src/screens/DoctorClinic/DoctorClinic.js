import React, {useState} from "react";
import { Text, View, ScrollView } from "react-native";

import CustomPicker from '../../components/CustomPicker/CustomPicker';
import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton/CustomButton";
import styles from './styles';

import {useNavigation} from '@react-navigation/native';

const DoctorClinic =() =>{
    const [country, setCountry] = useState('option1c');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [building, setBuilding] = useState('');
    const [floor, setFloor] = useState('');

    const [doctorClinicStatus, setDoctorClinicStatus] = useState("");

    const optionsCountry = [
        { label: 'Option 1', value: 'option1c' },
        { label: 'Option 2', value: 'option2c' },
        { label: 'Option 3', value: 'option3c' }
    ];

    const navigation = useNavigation();

    // const postDataUsingAsyncAwait = async () => {
    //     try {
    //       await axios.post(
    //         '127.0.0.1:3000/login', JSON.stringify({'email': email, 'password': password, 'checked':checked})
    //       )
    //       .then(function (response){

    //         if(response.data.message){
    //             setDoctorInfoStatus(response.data.message);
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
        //navigation.navigate("SignIn");
        navigation.navigate('ConfirmEmail');
    };

    const onClinicPressed = () => {
        setCountry("");
        setCity("");
        setStreet("");
        setBuilding("");
        setFloor("");
        // reload the page
        navigation.replace("DoctorClinic");
    };

    const onSignInPressed = () => {
        navigation.navigate("SignIn");
    };

    return(
    <ScrollView>
        <View style={styles.root}>
            <Text style={styles.title}>Enter your clinic location</Text>
            <Text style={styles.error}>{doctorClinicStatus}</Text>
            
            <CustomPicker
                label="Country"
                IconName="map-marker-radius"
                selOption={country}
                setSelOption={setCountry}
                opt={optionsCountry}
            />

            <CustomInput
                label="City"
                IconName="city"
                placeholder="Enter Your City"
                value={city}
                setValue={setCity}
            />

            <CustomInput
                label="Street"
                IconName="road-variant"
                placeholder="Enter Your Street"
                value={street}
                setValue={setStreet}
            />

            <CustomInput
                label="Building"
                IconName="office-building"
                placeholder="Enter Your Building"
                value={building}
                setValue={setBuilding}
            />

            <CustomInput
                label="Floor"
                IconName="home-floor-a"
                placeholder="Enter the Floor"
                value={floor}
                setValue={setFloor}
            />
            
            <CustomButton
                text="Add Another Clinic"
                onPress={onClinicPressed}
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



export default DoctorClinic 


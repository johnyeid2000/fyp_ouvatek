import React, { useState, useEffect } from "react";
import { Text, View, ScrollView } from "react-native";
import axios from "axios";
import CustomPicker from '../../components/CustomPicker/CustomPicker';
import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton/CustomButton";
import styles from './styles';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
const AddClinicScreen = ({ route }) => {

    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [building, setBuilding] = useState('');
    const [floor, setFloor] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const { doctorId, getProfileData } = route.params;

    const [doctorClinicStatus, setDoctorClinicStatus] = useState("");

    useEffect(() => {
        axios.get('https://ouvatek.herokuapp.com/api/countries')
            .then(response => {
                setCountries(response.data.rows);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const navigation = useNavigation();

    const insertDoctorClinic = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post('https://ouvatek.herokuapp.com/api/doctorlocation',
                { doctorId, selectedCountry, city, street, building, floor, phoneNumber },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                },
            );
            if (response.status === 200) {
                navigation.navigate('EditLocation');
                // getProfileData();
                // navigation.goBack();
            }
        } catch (error) {
            setDoctorClinicStatus(error.response.data.message);
        }
    };

    const onSubmitPressed = () => {
        insertDoctorClinic();
    };

    return (
        <ScrollView keyboardShouldPersistTaps='handled'>
            <View style={styles.root}>
                <Text style={styles.title}>Enter your clinic location</Text>
                <Text style={styles.error}>{doctorClinicStatus}</Text>

                <CustomPicker
                    label="Country"
                    IconName="map-marker-radius"
                    selOption={selectedCountry}
                    setSelOption={setSelectedCountry}
                    opt={countries.map(country => ({ label: country.country_name, value: country.country_id }))}
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

                <CustomInput
                    label="Clinic Phone Number"
                    IconName="phone-outline"
                    placeholder="Enter the clinic phone number"
                    value={phoneNumber}
                    setValue={setPhoneNumber}
                />

                <CustomButton
                    text="Submit"
                    onPress={onSubmitPressed}
                />

            </View>
        </ScrollView>
    );
};



export default AddClinicScreen


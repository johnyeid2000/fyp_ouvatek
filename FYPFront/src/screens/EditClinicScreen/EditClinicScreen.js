import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from "react-native";
import CustomPicker from '../../components/CustomPicker/CustomPicker';
import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton/CustomButton";
import styles from './styles';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const EditClinicScreen = ({ route }) => {

    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [building, setBuilding] = useState('');
    const [floor, setFloor] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [doctorClinicStatus, setDoctorClinicStatus] = useState("");
    const { locationId } = route.params;
    const [isPressed, setIsPressed] = useState(false);


    const navigation = useNavigation();


    useEffect(() => {
        axios.get('https://ouvatek.herokuapp.com/api/countries')
            .then(response => {
                setCountries(response.data.rows);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const getProfileData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get('https://ouvatek.herokuapp.com/api/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const address = response.data.address.find((a) => a.clinic_id === locationId);

            if (address) {
                setSelectedCountry(address.country_id);
                setCity(address.city);
                setStreet(address.street);
                setBuilding(address.building);
                setFloor(address.floor);
                setPhoneNumber(address.number);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getProfileData();
    }, []);

    const editDoctorClinic = async () => {
        setIsPressed(true);
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post('https://ouvatek.herokuapp.com/api/editlocation',
                { locationId, selectedCountry, city, street, building, floor, phoneNumber },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                },
            );
            if (response.status === 200) {
                navigation.navigate("EditLocation");
            }
        } catch (error) {
            setDoctorClinicStatus(error.response.data.message);
        } finally {
            setIsPressed(false);
        }
    };

    const onSubmitPressed = () => {
        editDoctorClinic();
    };


    return (
        <ScrollView keyboardShouldPersistTaps='handled'>
            <View style={styles.root}>
                <Text style={styles.title}>Edit your clinic information</Text>
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
                    text={isPressed ? 'Submitting...' : 'Submit'}
                    onPress={onSubmitPressed}
                />
            </View>
        </ScrollView>
    );
};

export default EditClinicScreen;


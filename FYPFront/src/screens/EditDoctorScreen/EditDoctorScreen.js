import React from 'react';
import { Text, View } from 'react-native';
import CustomButton from '../../components/CustomButton';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';


const EditDoctorScreen = () => {
    const navigation = useNavigation();

    const onGeneralInfoPressed = () => {
        navigation.navigate('EditGeneral');
    };

    const onDoctorInfoPressed = () => {
        navigation.navigate('EditDoctorInfo');
    };

    const onLocationPressed = () => {
        navigation.navigate('EditLocation');
    };

    return (
        <View style={styles.container}>

            <Text style={styles.txt}>Press on the corresponding button to edit the information needed</Text>

            <CustomButton
                text="Edit General Information"
                onPress={onGeneralInfoPressed}
            />

            <CustomButton
                text="Edit Doctor Information"
                onPress={onDoctorInfoPressed}
            />

            <CustomButton
                text="Edit Clinics Information"
                onPress={onLocationPressed}
            />

        </View>
    );
};

export default EditDoctorScreen;


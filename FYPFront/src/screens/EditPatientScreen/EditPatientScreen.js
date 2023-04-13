import React from 'react';
import { Text, View } from 'react-native';
import CustomButton from '../../components/CustomButton';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';


const EditPatientScreen = () => {

    const navigation = useNavigation();

    const onPatientInfoPressed = () => {
        navigation.navigate('EditGeneral');
    };

    const onPregnancyPressed = () => {
        navigation.navigate('EditPregnancy');
    };

    return (
        <View style={styles.container}>

            <Text style={styles.txt}>Press on the corresponding button to edit the information needed</Text>

            <CustomButton
                text="Edit Patient Information"
                onPress={onPatientInfoPressed}
            />

            <CustomButton
                text="Edit Pregnancy Information"
                onPress={onPregnancyPressed}
            />

        </View>
    );
};

export default EditPatientScreen;


import React from 'react';
import { View, Text } from 'react-native';
import CustomButton from "../../components/CustomButton/CustomButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const FetusScreen = () => {

    const navigation = useNavigation();

    const onSubmitPressed = () => {
        console.warn('submit pressed');
    };

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Icon
                    name="baby-face-outline"
                    style={styles.icon}
                />
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.txtTitle}>Please Enter Your Fetal abnormalities</Text>
                {/* <Icon
                    name='help-circle-outline'
                    style={styles.helpIcon}
                /> */}
            </View>

            <CustomButton
                text="Submit"
                onPress={onSubmitPressed}
            />

            <View style={{ marginTop: 10 }}>
                <CustomButton
                    text="Go back"
                    onPress={() => navigation.goBack()}
                    type='Teritiary'
                />
            </View>

        </View>
    );
};

export default FetusScreen;

import React from 'react';
import { View, Text } from 'react-native';
import CustomButton from "../../components/CustomButton/CustomButton";
import styles from './styles';

const DevicesScreen =()=>{

    const onSearchDevicePressed = () => {
        console.warn('Search device pressed');
    };

    return(
        <View>
            <View style={styles.btnView}>
                <CustomButton
                    text="Add a device"
                    onPress={onSearchDevicePressed}
                    type='Primary'
                />
            </View>

            <View style={styles.txtView}>
                <Text style={styles.txt}>No Device connected</Text>
            </View>
        </View>
    )
}

export default DevicesScreen
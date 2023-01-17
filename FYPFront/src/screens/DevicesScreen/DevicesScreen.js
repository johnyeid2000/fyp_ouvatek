import React from 'react';
import { View, Text } from 'react-native';
import CustomButton from "../../components/CustomButton/CustomButton";
import styles from './styles';
import axios from 'axios';

const DevicesScreen =()=>{

    const onSearchDevicePressed = () => {
        console.warn('Search device pressed');
    };
    const getDataUsingAsyncAwaitGetCall = async () => {
        try {
          const response = await axios.get(
            'https://jsonplaceholder.typicode.com/posts/1',
          );
          alert(JSON.stringify(response.data));
        } catch (error) {
          // handle error
          alert(error.message);
        }
      };
    return(
        <View>
            <View style={styles.btnView}>
                <CustomButton
                    text="Add a device"
                    onPress={getDataUsingAsyncAwaitGetCall}
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
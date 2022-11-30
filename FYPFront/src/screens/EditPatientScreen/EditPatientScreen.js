import React, {useState} from 'react';
import { Image, View } from 'react-native';

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

import styles from './styles';

const EditPatientScreen = () => {
    const [username, setUsername] = useState('');
    const [location, setLocation] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const onSubmitPressed = () => {
        console.warn('submit');
    }

  return (
    <View style={styles.container}>
              <Image
                source={require('../../assets/images/1.jpg')}
                style={styles.img} />

        <CustomInput
                label="Username"
                IconName="account-outline"
                placeholder="Enter Your Username"
                value={username}
                setValue={setUsername}
            />

            <CustomInput
                label="Location"
                IconName="map-marker-radius"
                placeholder="Enter Your Location"
                value={location}
                setValue={setLocation}
            />

            <CustomInput
                label="Phone Number"
                IconName="phone"
                placeholder="Enter Your Phone Number"
                value={phoneNumber}
                setValue={setPhoneNumber}
            />

    {/* for now submit pressed is seen when the submit button is clicked */}
        <CustomButton
                text="Submit"
                onPress={onSubmitPressed}
            />
    </View>
  );
};

export default EditPatientScreen;


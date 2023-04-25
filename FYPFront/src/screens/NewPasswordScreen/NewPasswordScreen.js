import React, { useState } from 'react';
import { Text, View } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import styles from './styles';
import axios from 'axios';

import { useNavigation } from '@react-navigation/native';

const NewPasswordScreen = ({ route }) => {
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [newPassStatus, setNewPassStatus] = useState('');
  const [isPressed, setIsPressed] = useState(false);

  const { id } = route.params;

  const navigation = useNavigation();

  const onSubmitPressed = async () => {
    setIsPressed(true);
    try {
      const response = await axios.post('https://ouvatek.herokuapp.com/api/changepass',
        { password, passwordRepeat, id },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      if (response.status === 200) {
        navigation.navigate("SignIn");
      }
    } catch (error) {
      setNewPassStatus(error.response.data.message);
    } finally {
      setIsPressed(false);
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Reset your password</Text>
      <Text style={styles.error}>{newPassStatus}</Text>

      <CustomInput
        label='Password'
        placeholder="Enter New Password"
        IconName='lock-outline'
        value={password}
        setValue={setPassword}
        secureTextEntry
        isPassword
      />

      <CustomInput
        label='Confirm Password'
        placeholder="Confrim your new password"
        IconName='lock-outline'
        value={passwordRepeat}
        setValue={setPasswordRepeat}
        secureTextEntry
        isPassword
      />

      <CustomButton
        text={isPressed ? 'Submitting...' : 'Submit'}
        onPress={onSubmitPressed}
      />

    </View>
  );
};

export default NewPasswordScreen;

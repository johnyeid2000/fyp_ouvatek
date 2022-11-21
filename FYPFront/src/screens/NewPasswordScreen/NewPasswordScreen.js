import React, {useState} from 'react';
import {Text, View} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import styles from './styles';

import {useNavigation} from '@react-navigation/native';

const NewPasswordScreen = () => {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const navigation = useNavigation();

  const onSubmitPressed = () => {
    navigation.navigate('Home');
  };

  const onSignInPressed = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Reset your password</Text>

      <CustomInput placeholder="Code" value={code} setValue={setCode} />

      <CustomInput
        placeholder="Enter New Password"
        value={newPassword}
        setValue={setNewPassword}
        secureTextEntry
      />

      <CustomButton text="Submit" onPress={onSubmitPressed} />

      <CustomButton
        text="Back to Sign In"
        onPress={onSignInPressed}
        type="Teritiary"
      />
    </View>
  );
};

export default NewPasswordScreen;

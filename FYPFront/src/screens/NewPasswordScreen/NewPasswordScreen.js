import React, { useState } from 'react';
import { Text, View } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import styles from './styles';

import { useNavigation } from '@react-navigation/native';

const NewPasswordScreen = () => {
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
  const [newPassStatus, setNewPassStatus] = useState('');

  const navigation = useNavigation();

  const onSubmitPressed = () => {
    navigation.navigate("SignIn");
  };

  
// const onSubmitPressed = async () => {
//   try {
//     const response = await axios.post('https://ouvatek.herokuapp.com/api/...', 
//     {newPassword, newPasswordConfirmation},
//         {
//             headers: {'Content-Type': 'application/json'},
//         },
//     );
//     const id = response.data.userId;
//     if(response.status===200){
//         navigation.navigate("SignIn");
//     }
//   } catch (error) {
//     setNewPassStatus(error.response.data.message);
//   }
// };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Reset your password</Text>
      <Text style={styles.error}>{newPassStatus}</Text>

      <CustomInput
        label='Password'
        placeholder="Enter New Password"
        IconName='lock-outline'
        value={newPassword}
        setValue={setNewPassword}
        secureTextEntry
        isPassword
      />

      <CustomInput
        label='Confirm Password'
        placeholder="Confrim your new password"
        IconName='lock-outline'
        value={newPasswordConfirmation}
        setValue={setNewPasswordConfirmation}
        secureTextEntry
        isPassword
      />

      <CustomButton text="Submit" onPress={onSubmitPressed} />

    </View>
  );
};

export default NewPasswordScreen;

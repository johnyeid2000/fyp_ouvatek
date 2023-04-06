import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from './styles';


const CustomInput = ({ label, IconName, value, setValue, placeholder, secureTextEntry, keyType, isPassword = false, customStyleIcon, customStyle }) => {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.root}>
      <Text style={styles.label}> {label}</Text>
      <View style={styles.container}>
        <Icon
          name={IconName}
          style={[styles.icon, customStyleIcon]}
        />
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          style={[styles.input, customStyle]}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyType}
        />
        {isPassword && (
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Icon
              name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      </View>

    </View>
  );
};


export default CustomInput


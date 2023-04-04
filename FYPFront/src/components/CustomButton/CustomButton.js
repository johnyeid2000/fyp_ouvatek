import React from "react";
import { Text, Pressable } from "react-native";
import styles from './styles';

const CustomButton = ({ onPress, text, disabled = false, type = 'Primary' }) => {

    return (
        <Pressable
            onPress={onPress}
            style={[styles.container, styles[`container_${type}`], disabled && styles.container_Disabled]}
            disabled={disabled}>
            <Text style={[styles.text, styles[`text_${type}`], disabled && styles.text_Disabled]}>
                {text}
            </Text>
        </Pressable>
    );
};



export default CustomButton


import React from "react";
import { View,Text, Pressable} from "react-native";
import styles from './styles';
import  Icon  from "react-native-vector-icons/MaterialCommunityIcons";

const MeasurementButton =({onPress, text, IconName}) =>{

    return(
        <Pressable 
            onPress={onPress} 
            style={styles.container}>
            <Icon
                    name={IconName}
                    style={styles.icon}
                />
            <Text style={styles.text}>
                {text}
            </Text>
        </Pressable>
    );
};



export default MeasurementButton 


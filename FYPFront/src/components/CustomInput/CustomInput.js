import React from "react";
import { Text, View, TextInput} from "react-native";
import  Icon  from "react-native-vector-icons/MaterialCommunityIcons";
import styles from './styles';


const CustomInput =({label, IconName, value, setValue, placeholder, secureTextEntry, keyType}) =>{

    return(
        <View style={styles.root}>
            <Text style={styles.label}> {label}</Text>
            <View style={styles.container}>
                <Icon
                    name={IconName}
                    style={styles.icon}
                />
                <TextInput
                    value={value}
                    onChangeText={setValue}
                    placeholder={placeholder}
                    style={styles.input}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyType}

                />
            </View>

        </View>
    );
};


export default CustomInput 


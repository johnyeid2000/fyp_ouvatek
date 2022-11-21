import React from "react";
import { Text, View, TextInput} from "react-native";
import styles from './styles';


const CustomInput =({value, setValue, placeholder, secureTextEntry}) =>{

    return(
        <View style={styles.container}>
            <TextInput
                value={value}
                onChange={setValue}
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
};


export default CustomInput 


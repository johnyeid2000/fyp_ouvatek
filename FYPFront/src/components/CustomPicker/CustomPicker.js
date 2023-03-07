import React from "react";
import { Text, View, TextInput} from "react-native";
import { Picker } from "@react-native-picker/picker";
import  Icon  from "react-native-vector-icons/MaterialCommunityIcons";
import styles from './styles';


const CustomPicker =({label, IconName, selOption,setSelOption, opt}) =>{
 
    return(
        <View style={styles.root}>
            <Text style={styles.label}> {label}</Text>
            <View style={styles.container}>
                <Icon
                    name={IconName}
                    style={styles.icon}
                />
                <Picker
                  selectedValue={selOption}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex) =>
                  setSelOption(itemValue)}
                  >
                  {opt.map((option, index) => (
                    <Picker.Item
                      key={index}
                      label={option.label}
                      value={option.value}
                      style={styles.pickerItem} 
                    />
                  ))}
                </Picker>
            </View>

        </View>
    );
};


export default CustomPicker 


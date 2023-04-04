import React, { useState } from "react";
import { Text, View, TextInput, Platform, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";

const CustomDatePicker = ({ label, IconName, value, onChange, isMaxDateDisabled, isMinDateDisabled}) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [maxDate, setMaxDate] = useState(new Date());
  var today = new Date();
  const minDate = new Date();
  minDate.setMonth(today.getMonth() - 8);
  minDate.setDate(today.getDate() - 15);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate !== undefined) {
      setDate(selectedDate);
      onChange(moment(selectedDate).format("YYYY-MM-DD"));
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleFirstPregnancyDayChange = (event, selectedDate) => {
    if (selectedDate !== undefined) {
      const newMaxDate = new Date(selectedDate);
      setMaxDate(newMaxDate);
    }
  };
  

  return (
    <View style={styles.root}>
      <Text style={styles.label}> {label}</Text>
      <View style={styles.container}>
        <Icon name={IconName} style={styles.icon} />
        <TouchableOpacity onPress={showDatepicker} style= {{width:'100%'}}>
          <TextInput
            editable={false}
            placeholder="Select date"
            value={value}
            style={{color:'black'}}
          />
        </TouchableOpacity>
      </View>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          minimumDate={isMinDateDisabled? minDate : undefined}
          maximumDate={isMaxDateDisabled ? maxDate : undefined}
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

export default CustomDatePicker;

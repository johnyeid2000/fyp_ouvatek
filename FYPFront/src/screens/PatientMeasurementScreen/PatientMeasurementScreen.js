import React from 'react';
import {View, SafeAreaView, ScrollView} from 'react-native';
import { Avatar, Title, Caption, Text } from 'react-native-paper';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useNavigation} from '@react-navigation/native';

const PatientMeasurementScreen = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
    
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image 
                source={require('../../assets/images/1.jpg')}
                size={80}
              />
              <View style={{marginLeft: 20}}>
                <Title style={[styles.title, {
                  marginTop:15,
                  marginBottom: 5,
                }]}>Jane Doe</Title>
                <Caption style={styles.caption}>First Trimester</Caption>
              </View>
            </View>
          </View>
    
          <ScrollView style={styles.userInfoSection}>
          <View style={[styles.row, styles.innerRow]}>
            <Text style={styles.txtRow}>Diabetic</Text>
            <Text style={[styles.txtRow,{marginLeft:'20%'}]}>Not Hypertensive</Text>
          </View>
            <View style={styles.row}>
              <Text style={[styles.txtRow, {fontWeight:'bold'}]}>Heart Rate and Blood Pressure</Text>
              <View style={styles.innerRow}>
                <Text style={styles.txtRow}>HR: 70</Text>
                <Text style={styles.txtRow}>Sys: 125</Text>
                <Text style={styles.txtRow}>Dias: 85</Text>
              </View>
              <View style={styles.innerRow}>
                <Text style={styles.txtRow}>Date: 2022-05-08</Text>
                <Text style={styles.txtRow}>Time: 14:11:17</Text>
              </View>
            </View>
            <View style={styles.row}>
            <Text style={[styles.txtRow, {fontWeight:'bold'}]}>Temperature</Text>
              <Text style={styles.txtRow}>37.00°C</Text>
              <View style={styles.innerRow}>
                <Text style={styles.txtRow}>Date: 2022-05-08</Text>
                <Text style={styles.txtRow}>Time: 14:11:28</Text>
              </View>
            </View>
            <View style={styles.row}>
            <Text style={[styles.txtRow, {fontWeight:'bold'}]}>Blood Glucose</Text>
              <Text style={styles.txtRow}>No values</Text>
            </View>
            <View style={styles.row}>
            <Text style={[styles.txtRow, {fontWeight:'bold'}]}>SpO2</Text>
              <Text style={styles.txtRow}>No values</Text>
            </View>
            <View style={styles.row}>
            <Text style={[styles.txtRow, {fontWeight:'bold'}]}>Lab Tests</Text>
              <Text style={styles.txtRow}>No values</Text>
            </View>
            <View style={styles.row}>
            <Text style={[styles.txtRow, {fontWeight:'bold'}]}>Fetus's Measurements</Text>
              <Text style={styles.txtRow}>No values</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      );

  };

export default PatientMeasurementScreen;

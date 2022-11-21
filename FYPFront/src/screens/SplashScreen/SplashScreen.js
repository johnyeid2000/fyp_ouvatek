import React from 'react';
import { Text, View, Image } from 'react-native';
import Logo from '../../assets/images/OuvatekLogo.png';
import styles from './styles';

const SplashScreen = ({navigation}) => {

    setTimeout(() => {
        navigation.navigate('SignIn')
    },3000)

    return(
        <View style={styles.root}>
            <Image
            source={Logo} 
            style={styles.image}  
            />

            <Text style={styles.text}>Ouvatek</Text>
        </View>        
    )
}

export default SplashScreen;
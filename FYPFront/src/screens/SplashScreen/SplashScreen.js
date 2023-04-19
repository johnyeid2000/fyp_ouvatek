import React from 'react';
import { Text, View, Image } from 'react-native';
//import Logo from '../../assets/images/OuvatekLogo.png';
import styles from './styles';

const SplashScreen = ({ navigation }) => {

    setTimeout(() => {
        navigation.navigate('SignIn')
    }, 3000)

    return (
        <View style={styles.root}>
            <Image
                //source={Logo} 
                source={{ uri: 'https://dub01pap003files.storage.live.com/y4msy5Pq6s7gnYTlXL9bRQaz6VL8RA5aQ8Dps8AoCYWQ0MWmnL27n1zvwfRruzURydk0j7dKWBoUBe_W4tqb0Dn7JA8CII5sllB16Hme4uG8DKYixDSbt-t57XlHgGbAVwnxYi2zwE19wuc0DSAbCg2TSkB2LyEWHGl7qrSAW0kIWlMFB1Bfm7LkdSQA3Kxgztk?width=736&height=438&cropmode=none' }}
                style={styles.image}
            />

            <Text style={styles.text}>Ouvatek</Text>
        </View>
    )
}

export default SplashScreen;
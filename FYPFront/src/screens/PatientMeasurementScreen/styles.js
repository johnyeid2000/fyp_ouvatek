import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    userInfoSection: {
      marginTop:25,
      paddingHorizontal: 30,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      fontWeight: '500',
    },
    row: {
      marginBottom: 10,
      borderWidth:1,
      borderColor: '#cccccc',
      padding:10,
      //backgroundColor: 'rgba(101, 27, 112, 0.5)',
    },
    txtRow:{
        color:"black",
        marginLeft: 10,
    },
    innerRow:{
        flexDirection:'row',
    }
  
  });

  export default styles;
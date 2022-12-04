import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        padding:20
    },

    newReq:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:10,
        marginBottom:20
    },
    iconAccept:{
        fontSize:25,
        color:'green'
    },
    iconDecline:{
        fontSize:25,
        color:'red'
    },
});


export default styles;
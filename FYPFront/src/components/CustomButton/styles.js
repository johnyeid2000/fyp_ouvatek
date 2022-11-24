import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        width:'100%',

        alignItems:'center',
        borderRadius:5,

    },

    container_Primary:{
        backgroundColor:'#651B70',
         padding:15,
        marginVertical:5,

    },

    container_Secondary:{
        borderColor:'#651B70',
        borderWidth:2,
    },

    container_Teritiary:{
        padding:7,
        marginVertical:2,
    },

    text:{
        color:'white',
        fontWeight:'bold',
    },
    text_Secondary:{
        color:'#651B70',
    },
    text_Teritiary:{
        color:'gray',
    },
});

export default styles;
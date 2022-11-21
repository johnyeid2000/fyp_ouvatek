import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        width:'100%',

        padding:15,
        marginVertical:5,

        alignItems:'center',
        borderRadius:5,

    },

    container_Primary:{
        backgroundColor:'#651B70',

    },

    container_Secondary:{
        borderColor:'#651B70',
        borderWidth:2,
    },

    container_Teritiary:{
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
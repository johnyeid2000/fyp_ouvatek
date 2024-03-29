import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        padding: 20
    },

    iconContainer: {
        alignItems: 'center',
    },
    icon: {
        fontSize: 130,
        color: '#651B70',
    },
    error: {
        fontSize: 16,
        color: 'red',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    txtTitle: {
        fontSize: 16,
        marginVertical: 5,
    },
    // helpIcon: {
    //     fontSize: 14,
    //     marginLeft: 3,
    //     marginBottom: 10
    // },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        backgroundColor: 'white',
        width: '30%',
        height: 40,

        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,

        marginVertical: 5,
        textAlign: 'center',
    },
    txt: {
        marginLeft: 20,
        fontWeight: 'bold',
        fontSize: 16
    },
    btnContainer: {
        marginVertical: 10,
    }

});


export default styles;
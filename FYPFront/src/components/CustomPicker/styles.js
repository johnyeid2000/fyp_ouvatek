import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    root: {
        width: '100%',
    },
    container: {
        backgroundColor: 'white',
        width: '100%',

        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,

        paddingLeft: 10,
        marginVertical: 5,

        flexDirection: 'row',
        alignItems: 'center'
    },
    label: {
        marginVertical: 2,
        fontWeight: '800',
    },
    icon: {
        fontSize: 22,
    },
    picker: {
        width: 200,
        flex: 1
    },
    pickerItem: {
        fontSize: 14,
        color: 'black'
    }
});

export default styles;
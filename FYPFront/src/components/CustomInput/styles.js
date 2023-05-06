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
    input: {
        width: '80%'
    },
    label: {
        marginVertical: 2,
        fontWeight: '800',
    },
    icon: {
        fontSize: 22,
        marginRight: 10,
    }
});

export default styles;
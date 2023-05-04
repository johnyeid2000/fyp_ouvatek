import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#651B70',
        marginVertical: 10,
    },
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        marginLeft: '-53%'
    },
    text: {
        color: 'gray',
        marginVertical: 5
    },
    error: {
        fontSize: 16,
        color: 'red',
        marginBottom: 5
    },
});

export default styles;
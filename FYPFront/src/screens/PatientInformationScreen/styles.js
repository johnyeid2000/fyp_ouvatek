import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    root: {
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#651B70',
        marginVertical: 10,
    },
    txt: {
        marginTop: 5,
        fontWeight: 'bold',
    },
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 1,
        marginBottom: 1,
    },
    checkboxContainer: {
        marginBottom: 5,
    },
    error: {
        fontSize: 16,
        color: 'red',
        marginBottom: 5
    },
});

export default styles;
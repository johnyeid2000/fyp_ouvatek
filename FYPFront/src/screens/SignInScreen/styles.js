import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: '100%',
    },
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        marginLeft: '-54%'
    },
    error: {
        fontSize: 16,
        color: 'red',
        marginBottom: 5
    },
    btnContainer: {
        marginVertical: 10
    }
});

export default styles;
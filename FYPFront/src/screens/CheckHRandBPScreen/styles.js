import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#651B70',
        borderRadius: 10
    },
    cellHeader: {
        flex: 1,
        padding: 5,
        textAlign: 'center',
        color: 'white'
    },
    error: {
        fontSize: 16,
        color: 'red',
        marginBottom: 10
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#651B70',
        borderRadius: 10
    },
    cell: {
        flex: 1,
        padding: 6,
        textAlign: 'center',
        borderRadius: 10
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10

    },
    btn: {
        width: '45%',
    }
});
export default styles;
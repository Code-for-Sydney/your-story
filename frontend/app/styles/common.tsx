import { StyleSheet } from 'react-native';

const common = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#222222',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        maxWidth: 600
    },
    text: {
        fontSize: 16,
        color: '#fff'
    },
    promptText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        opacity: 1
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF6347'
    },
    promptOverlay: {
        alignSelf: 'flex-end',
        padding: 10,
        margin: 5,
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 10,
        width: '99%'
    },
    image: {
        margin: 5,
        width: '99%',
        maxHeight: 400,
        borderRadius: 10
    },
    header: {
        padding: 20,
    },
    subtleText: {
        fontSize: 14,
        color: '#aaa',
        marginBottom: 5,
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#2e2e2e',
        borderRadius: 10
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    button: {
        padding: 15,
        margin: 10,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
    },
    greyContainer: {
        backgroundColor: '#2e2e2e',
        padding: 10,
        borderRadius: 10
    }
});

export default common;
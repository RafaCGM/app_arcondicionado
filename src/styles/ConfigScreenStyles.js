import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 20,
    },
  
    waveContainerBottom: {
        width: '100%',
        height: 200,
        backgroundColor: '#4CAF50', 
        position: 'absolute',
        bottom: 0,
        zIndex: 1,
    },
    buttonContainer: {
        width: '90%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 150,
        zIndex: 2,
    },
    button: {
        width: '48%', 
        height: 55,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        elevation: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 40,
        textAlign: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },

    '@media (min-width: 768px)': {
        buttonContainer: {
            width: '80%', 
        },
        button: {
            width: '30%', 
            height: 60,
            fontSize: 20, 
        },
        title: {
            fontSize: 36, 
        },
    },
});
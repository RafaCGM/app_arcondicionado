import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        justifyContent: 'center',
        alignItems: 'center',
    },
   
    waveContainer: {
        width: '100%',
        height: 200,
        backgroundColor: '#4CAF50', 
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        position: 'absolute',
        top: 0,
        zIndex: 1,
        '@media (min-width: 768px)': {
            height: 100,
            
        },
    },
    
    waveContainerBottom: {
        width: '100%',
        height: 50,
        backgroundColor: '#4CAF50', 
        position: 'absolute',
        bottom: 0,
        zIndex: 1,
        '@media (min-width: 768px)': {
            height: 250, 
        },
    },
    containerbox: {
        width: '90%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 15,
        elevation: 5, 
        alignItems: 'center',
        position: 'absolute',
        top: 120,
        maxWidth: 400, 
        zIndex: 2, 
    },
    titulo1: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 40,
        textAlign: 'center',
        '@media (min-width: 768px)': {
            fontSize: 32, 
        },
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
        alignSelf: 'flex-start',
        marginLeft: 20,
        '@media (min-width: 768px)': {
            fontSize: 18, 
        },
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 15,
        marginBottom: 20,
        backgroundColor: '#f9f9f9',
        fontSize: 16,
        '@media (min-width: 768px)': {
            fontSize: 18, 
        },
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#4CAF50', 
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        elevation: 4, 
        '@media (min-width: 768px)': {
            width: '50%', // No desktop, o botão fica menor e mais centralizado
            fontSize: 20, // Aumenta o texto no botão para telas maiores
        },
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
});
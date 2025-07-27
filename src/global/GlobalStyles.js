import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default styles = StyleSheet.create({
    containerTop: {
        flex: 1,
        paddingTop: 40, 
        backgroundColor: '#f5f5f5',
        position: 'relative',
        paddingHorizontal: 20,  
    },

    containerbox: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        position: 'relative',
        marginHorizontal: 20,
        maxWidth: width * 0.9,  // Limita a largura do formulário a 90% da largura da tela
        alignSelf: 'center',  
    },

    titulo1: {
        fontSize: width > 350 ? 28 : 24,  
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 15,
    },

    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: width > 350 ? 12 : 10,  
        borderRadius: 8,
        marginBottom: 15,
        fontSize: width > 350 ? 16 : 14,  
        backgroundColor: '#f9f9f9',
    },

    button: {
        backgroundColor: '#4caf50',
        color: '#fff',
        fontSize: width > 350 ? 18 : 16,  
        paddingVertical: 15,
        borderRadius: 8,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 20,
        elevation: 5,
    },

    waveContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 'auto',
        bottom: 0,
        zIndex: -1,
    },

    wave: {
        width: '100%',
        height: height * 0.4,  
        backgroundColor: '#4caf50',
        position: 'absolute',
        bottom: 0,
        left: 0,
    },

    waveSecond: {
        width: '100%',
        height: height * 0.2,  
        backgroundColor: '#388e3c',
        position: 'absolute',
        bottom: -30,
        left: 0,
    },

    inputShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
});

import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4CAF50', // Cor de fundo sólida
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 32,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 40,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    button: {
        backgroundColor: '#388e3c',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    waveTop: {
        position: 'absolute',
        top: -100,
        left: 0,
        right: 0,
        height: 200,
        backgroundColor: '#388e3c',
    },

    waveBottom: {
        position: 'absolute',
        bottom: -50,
        left: 0,
        right: 0,
        height: 200,
        backgroundColor: '#388e3c',
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
    },

    acImage: {
        position: 'absolute',
        bottom: 50,  
        width: 230,  
        height: 200, 
        resizeMode: 'contain',  
    },

});
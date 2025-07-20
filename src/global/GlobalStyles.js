import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    containerTop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    },

    containerbox: {
        borderColor: '#4CAF50',
        borderWidth: 2,
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 18,
        width: '85%',
        shadowColor: '#4CAF50',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },

    titulo1: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: "center",
        color: '#388E3C',
        marginBottom: 18,
    },

    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#388E3C',
        marginBottom: 4,
        marginTop: 8,
    },

    input: {
        backgroundColor: '#f6fff6',
        borderWidth: 1,
        borderColor: '#4CAF50',
        fontSize: 18,
        padding: 10,
        marginVertical: 8,
        borderRadius: 12,
        shadowColor: '#4CAF50',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },

    button: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: '#4CAF50',
        color: 'white',
        marginTop: 16,
        marginBottom: 10,
        padding: 12,
        borderRadius: 16,
        shadowColor: '#4CAF50',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },

    card: {
        color: 'white',
        textAlign: "center",
        fontSize: 30,
        fontWeight: 'bold',
        backgroundColor: '#5555FF',
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 10
    },


    //Pefumaria do listar usuarios
    userBox: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginVertical: 10,
        marginHorizontal: 16,
        padding: 18,
        shadowColor: '#4CAF50',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 3,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#388E3C',
        marginBottom: 4,
    },
    userMatricula: {
        fontSize: 16,
        color: '#4CAF50',
        marginBottom: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 8,
    },
    editButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 12,
        marginRight: 10,
    },
    deleteButton: {
        backgroundColor: '#ff5252',
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 12,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },

});
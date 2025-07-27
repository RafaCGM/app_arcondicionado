import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({

    containerTop2: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '#f9f9f9',
        paddingBottom: 20,
    },
    
    userBox: {
        width: '90%',
        backgroundColor: '#ffffff',
        marginVertical: 10,
        borderRadius: 10,
        padding: 15,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        marginHorizontal: '5%',
    },

    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },

    userMatricula: {
        fontSize: 16,
        color: '#555',
        marginBottom: 15,
    },

    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },

    editButton: {
        flex: 1,
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },

    deleteButton: {
        flex: 1,
        backgroundColor: '#F44336',
        paddingVertical: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },

    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalButtonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    modalButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },

    flatListContainer: {
        width: '100%',
        paddingBottom: 20,
    },

    addButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

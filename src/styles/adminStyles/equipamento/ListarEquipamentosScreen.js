import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({

    containerTop2: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    equipamentoBox: {
        backgroundColor: '#fff',
        marginBottom: 15,
        padding: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        width: '100%',
        maxWidth: 350,
        alignItems: 'center',
    },

    equipamentoStatus: {
        fontSize: 18,
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',  
    },

    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center', 
        marginTop: 10,
    },

    editButton: {
        backgroundColor: '#4caf50',
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 6,
        marginRight: 10,
        elevation: 3, 
    },

    deleteButton: {
        backgroundColor: '#f44336',
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 6,
        elevation: 3,
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',  
    },

    modalContainer: {
        backgroundColor: '#fff',
        padding: 25,
        alignItems: 'center',
        borderRadius: 10,
        width: 300,
    },

    modalTitle: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },

    modalButtonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },

    modalButton: {
        backgroundColor: '#4caf50',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 6,
        marginTop: 10,
    },

    addButton: {
        backgroundColor: '#4caf50',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 6,
        marginTop: 20,
        width: '80%',  
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',  
    },

    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

   
    flatListContainer: {
        width: '100%',
        paddingBottom: 80,
    },
});

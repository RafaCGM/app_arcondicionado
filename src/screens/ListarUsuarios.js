// Biblioteca básica
import React from "react";

//Import temporário para armazenar as variáveis que ficarão no UseContext
import { useState, useEffect } from "react";

// Imports de componentes para IG do React
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, Modal } from "react-native"

// Import de estilos da IG
import styles from '../global/GlobalStyles'

//Imports para acesso ao BD
import axios from 'axios'

// Imports para parâmetros do Sistema
import { server } from '../global/GlobalVars';

// Bibliotecas do Navigation
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from "@react-navigation/native";

export default function ListarUsuarios() {

    const [modalVisible, setModalVisible] = useState(false);
    const [confirmDel, setConfirmDel] = useState(false);
    const [idUsuarioRem, setIdUsuarioRem] = useState(0);

    // Dados da lista
    const [dados, setDados] = useState()

    // Navegação entre telas
    const navigation = useNavigation()
    const route = useRoute()

    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused

            list()
            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions

            };
        }, [])
    );

    React.useEffect(() => {
        if(confirmDel){
            rem(idUsuarioRem)
            setConfirmDel(() => false)
        }
    }, [confirmDel])

    const rem = async (idusuario) => {
        //console.log('Entrou \n')
        try {
            console.log(`${server}/usuarios/rem`)
            const res = await axios.post(`${server}/usuarios/rem`,
                {
                    idusuario: idusuario,
                }
            )

            if (res.data.num_erro == 0) {
                alert(res.data.msg)
                list()
            }

            if (res.data.num_erro == 1) {
                alert(res.data.msg_erro)

            }

        } catch (e) {
            //showError(e)
            console.log(e)
        }
    }

    const list = async () => {
        //console.log('Entrou \n')
        try {
            console.log(`${server}/usuarios/list`)
            const dt = await axios.post(`${server}/usuarios/list`,
                {
                }
            )

            console.log('OK-list')
            setDados(dt.data.res)

        } catch (e) {
            //showError(e)
            console.log(e)
        }
    }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.containercols}>
                    <View style={styles.itemlistacols50cols}>
                        <Text>{"Nome: "+item.nome}</Text>
                        <Text>{"Matricula: "+item.matricula}</Text>
                    </View>
                    <View style={styles.itemlistarows50cols}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('DadosUsuario', { idusuario: item.idusuario })
                            }}
                        >
                            <Text style={styles.button}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setModalVisible(() => true)
                                setIdUsuarioRem(() => item.idusuario)
                            }}
                        >
                            <Text style={styles.button}>Excluir</Text>
                        </TouchableOpacity>
                    </View>
            </View>
        )
    }
    const delRegistro = () => {
        setModalVisible(() => false)
        setConfirmDel(() => true)
    }

    const fecharModal = () => {
        setModalVisible(() => false)
        setConfirmDel(() => false)
    }


    return (
        <View style={styles.containerTop2}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{ padding: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
                                <Text style={{ fontSize: 20 }}>Você quer realmente excluir o registro?</Text>
                                <TouchableOpacity onPress={delRegistro}>
                                    <Text style={styles.button}>OK</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity onPress={fecharModal}>
                                    <Text style={styles.button}>Cancel</Text>
                                </TouchableOpacity>
                            </View>

                    </View>
                </Modal>
            <FlatList
                data={dados}
                keyExtractor={user => user.idusuario}
                renderItem={renderItem}
            />
        </View>
    )

}
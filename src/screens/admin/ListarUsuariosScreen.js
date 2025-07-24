import React from "react";
import axios from 'axios'
import { server } from '../../global/GlobalVars';

import { View, Text, TextInput, Image, TouchableOpacity, FlatList, Modal } from "react-native"

import { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";

import styles from '../../global/GlobalStyles'

export default function ListarUsuarios({navigation}) {

    const [modalVisible, setModalVisible] = useState(false);
    const [confirmDel, setConfirmDel] = useState(false);
    const [idUsuarioRem, setIdUsuarioRem] = useState(0);

    const [dados, setDados] = useState()


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

    const renderItem = ({ item }) => (
        <View style={styles.userBox}>
            <Text style={styles.userName}>Nome: {item.nome}</Text>
            <Text style={styles.userMatricula}>Matrícula: {item.matricula}</Text>
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate('Dados do Usuário', { idusuario: item.idusuario })}
                >
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => {
                        setModalVisible(true)
                        setIdUsuarioRem(item.idusuario)
                    }}
                >
                    <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

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
            <TouchableOpacity onPress={() => navigation.navigate('Cadastrar Usuário')}>
                <Text style={styles.button}>Cadastrar Usuário</Text>
            </TouchableOpacity>
        </View>
    )

}
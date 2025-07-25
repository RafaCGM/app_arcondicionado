import React from "react";
import axios from 'axios'
import { server } from '../../../global/GlobalVars';

import { View, Text, TextInput, Image, TouchableOpacity, FlatList, Modal } from "react-native"

import { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";

import styles from '../../../global/GlobalStyles'

export default function ListarEquipamentosScreen({navigation}) {

    const [modalVisible, setModalVisible] = useState(false);
    const [confirmDel, setConfirmDel] = useState(false);
    const [idEquipamentoRem, setIdEquipamentoRem] = useState(0);

    const [dados, setDados] = useState()

    useFocusEffect(
        React.useCallback(() => {

            list()
            return () => {

            };

        }, [])
    );

    React.useEffect(() => {
        if(confirmDel){
            rem(idEquipamentoRem)
            setConfirmDel(() => false)
        }
    }, [confirmDel])

    const rem = async (id_equipamento) => {
        try {
            console.log(`${server}/equipamento/rem`)
            const res = await axios.post(`${server}/equipamento/rem`,
                {
                    id_equipamento: id_equipamento,
                }
            )

            if (res.data.num_erro == 0) {
                list()
            }

            if (res.data.num_erro == 1) {
                alert(res.data.msg_erro)

            }

        } catch (e) {
            console.log(e)
        }
    }

    const list = async () => {
        try {
            console.log(`${server}/equipamento/list`)
            const dt = await axios.post(`${server}/equipamento/list`,
                {
                }
            )

            setDados(dt.data.res)

        } catch (e) {
            console.log(e)
        }
    }

    const renderItem = ({ item }) => (
        <View style={styles.userBox}>
            <Text style={styles.userName}>Status do Equipamento: {item.status}</Text>
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate('Dados do Equipamento', { id_equipamento: item.id_equipamento })}
                >
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => {
                        setModalVisible(true)
                        setIdEquipamentoRem(item.id_equipamento)
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
                keyExtractor={equipamento => equipamento.id_equipamento}
                renderItem={renderItem}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Cadastro de Equipamento')}>
                <Text style={styles.button}>Cadastrar Equipamento</Text>
            </TouchableOpacity>
        </View>
    )
}

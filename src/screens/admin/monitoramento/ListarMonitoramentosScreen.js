import React from "react";
import axios from 'axios'
import { server } from '../../../global/GlobalVars';

import { View, Text, TextInput, Image, TouchableOpacity, FlatList, Modal } from "react-native"

import { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";

import styles from '../../../styles/adminStyles/monitoramento/ListarMonitoramentosScreenStyles'

export default function ListarMonitoramentosScreen({ navigation }) {


    const [modalVisible, setModalVisible] = useState(false);
    const [confirmDel, setConfirmDel] = useState(false);
    const [idMonitoramentoRem, setIdMonitoramentoRem] = useState(0);

    const [dados, setDados] = useState()

    useFocusEffect(
        React.useCallback(() => {

            list()
            return () => {

            };

        }, [])
    );

    React.useEffect(() => {
        if (confirmDel) {
            rem(idMonitoramentoRem)
            setConfirmDel(() => false)
        }
    }, [confirmDel])

    const rem = async (id_monitoramento) => {
        try {
            console.log(`${server}/monitoramento/rem`)
            const res = await axios.post(`${server}/monitoramento/rem`,
                {
                    id_monitoramento: id_monitoramento,
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
            console.log(`${server}/monitoramento/list`)
            const dt = await axios.post(`${server}/monitoramento/list`,
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
            <Text style={styles.userName}>Data do monitoramento: {item.data_hora}</Text>
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate('Dados do Monitoramento', { id_monitoramento: item.id_monitoramento })}
                >
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => {
                        setModalVisible(true)
                        setIdMonitoramentoRem(item.id_monitoramento)
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
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ padding: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
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
                keyExtractor={monitoramento => monitoramento.id_monitoramento}
                renderItem={renderItem}
            />
            
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('Cadastro de Monitoramento')}
            >
                <Text style={styles.buttonText}>Cadastrar Monitoramento</Text>
            </TouchableOpacity>
        </View>
    )

}
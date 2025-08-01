import React from "react";
import axios from 'axios'
import { server } from '../../../global/GlobalVars';

import { View, Text, TextInput, Image, TouchableOpacity, FlatList, Modal } from "react-native"

import { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";

import styles from '../../../styles/adminStyles/equipamento/ListarEquipamentosScreen'

export default function ListarEquipamentosScreen({ navigation }) {

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
        if (confirmDel) {
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
        <View style={styles.equipamentoBox}>
            <Text style={styles.equipamentoStatus}>Identificador do equipamento: {item.id_equipamento}</Text>
            <Text style={styles.equipamentoStatus}>Sala atribuida ao equipamento: {item.espaco_num_espaco}</Text>
            <Text style={styles.equipamentoStatus}>Status do equipamento: {item.status === 1 ? "Ligado" : "Desligado"}</Text>

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
                        setModalVisible(true);  // Abre o modal de confirmação
                        setIdEquipamentoRem(item.id_equipamento);  // Define o ID do equipamento a ser excluído
                    }}
                >
                    <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const delRegistro = () => {
        setModalVisible(false);
        setConfirmDel(true);
    };

    const fecharModal = () => {
        setModalVisible(false);
        setConfirmDel(false);
    };

    return (
        <View style={styles.containerTop2}>
            {/* Modal de Confirmação de Exclusão */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={fecharModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Deseja excluir este equipamento?</Text>
                        <View style={styles.modalButtonRow}>
                            <TouchableOpacity style={styles.modalButton} onPress={fecharModal}>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={delRegistro}>
                                <Text style={styles.buttonText}>Confirmar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <FlatList
                data={dados}
                keyExtractor={equipamento => equipamento.id_equipamento.toString()}
                renderItem={renderItem}
            />

            {/* Botão de Cadastro de Equipamento */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('Cadastro de Equipamento')}
            >
                <Text style={styles.buttonText}>Cadastrar Equipamento</Text>
            </TouchableOpacity>
        </View>
    );
};
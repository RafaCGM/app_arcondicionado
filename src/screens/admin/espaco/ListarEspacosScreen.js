import React from "react";
import axios from 'axios'
import { server } from '../../../global/GlobalVars';

import { View, Text, TextInput, Image, TouchableOpacity, FlatList, Modal } from "react-native"

import { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";

import styles from '../../../styles/adminStyles/espaco/ListarEspacosScreenStyles'

export default function ListarEspacosScreen({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [confirmDel, setConfirmDel] = useState(false);
    const [idEspacoRem, setIdEspacoRem] = useState(0);

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
            rem(idEspacoRem)
            setConfirmDel(() => false)
        }
    }, [confirmDel])

    const rem = async (id_espaco) => {
        try {
            console.log(`${server}/espaco/rem`)
            const res = await axios.post(`${server}/espaco/rem`,
                {
                    id_espaco: id_espaco,
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
            console.log(`${server}/espaco/list`)
            const dt = await axios.post(`${server}/espaco/list`,
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
            <Text style={styles.userName}>Número do espaço: {item.num_espaco}</Text>
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate('Dados do Espaço', { id_espaco: item.id_espaco })}
                >
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => {
                        setModalVisible(true);
                        setIdEspacoRem(item.id_espaco);
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
                                <Text style={styles.modalTitle}>Deseja excluir este registro?</Text>
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
                keyExtractor={espaco => espaco.id_espaco.toString()}
                renderItem={renderItem}
            />

            <TouchableOpacity
                style={styles.addButton}  
                onPress={() => navigation.navigate('Cadastro de Espaço')}
            >
                <Text style={styles.addButtonText}>Cadastrar Espaço</Text>
            </TouchableOpacity>
        </View>
    );
};
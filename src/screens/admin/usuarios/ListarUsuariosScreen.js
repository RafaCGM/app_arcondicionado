import React from "react";
import axios from 'axios'
import { server } from '../../../global/GlobalVars';

import { View, Text, TextInput, Image, TouchableOpacity, FlatList, Modal } from "react-native"

import { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";

import styles from '../../../styles/adminStyles/usuarios/ListarUsuariosScreenStyles'

export default function ListarUsuarios({ navigation }) {

  const [modalVisible, setModalVisible] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [idUsuarioRem, setIdUsuarioRem] = useState(0);

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
      rem(idUsuarioRem)
      setConfirmDel(() => false)
    }
  }, [confirmDel])

  const rem = async (idusuario) => {
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
      console.log(e)
    }
  }

  const list = async () => {
    try {
      console.log(`${server}/usuarios/list`)
      const dt = await axios.post(`${server}/usuarios/list`,
        {
        }
      )

      console.log('OK-listEspaco')
      setDados(dt.data.res)

    } catch (e) {
      console.log(e)
    }
  }

  // Função de renderização do item
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
            setModalVisible(true);  // Abre o modal de confirmação
            setIdUsuarioRem(item.idusuario);  // Define o ID do usuário a ser excluído
          }}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
      {/* Modal de Confirmação de Exclusão */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={fecharModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Deseja excluir este usuário?</Text>
            <View style={styles.modalButtonRow}>
              <TouchableOpacity style={styles.modalButton} onPress={delRegistro}>
                <Text style={styles.buttonText}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={fecharModal}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* FlatList de usuários */}
      <FlatList
        data={dados}
        keyExtractor={user => user.idusuario.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContainer}
      />

      {/* Botão de Cadastro de Usuário */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Cadastrar Usuário')}
      >
        <Text style={styles.buttonText}>Cadastrar Usuário</Text>
      </TouchableOpacity>
    </View>
  );
};
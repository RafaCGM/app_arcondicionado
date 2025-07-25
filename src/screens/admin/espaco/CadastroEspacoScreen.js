import React from 'react';
import axios from 'axios'
import { server } from '../../../global/GlobalVars';

import { View, Text, TextInput, Image, TouchableOpacity } from "react-native"
import { useState } from "react";

import styles from '../../../global/GlobalStyles'

export default function CadastroEspacoScreen({navigation}) {
    const [num_espaco, setNum_espaco] = useState('')
    const [usuarios_idusuario, setUsuarios_idusuario] = useState('')

    const create = async () => {
        try {
            console.log(`${server}/equipamento/create`)
            const res = await axios.post(`${server}/equipamento/create`, {
                num_espaco: num_espaco,
                usuarios_idusuario: usuarios_idusuario,
            })

            if (res.data.num_erro == 0) {

                alert(res.data.msg)
                navigation.goBack()
            }

            if (res.data.num_erro == 1) {
                alert(res.data.msg_erro)
            }

        } catch (e) {
            console.log(e)
            alert(e)
        }
    }

    return (
        <View style={styles.containerTop}>
            <View style={styles.containerbox}>
                <Text style={styles.titulo1}>Cadastro de Espaço</Text>
                <Text style={styles.label}>Informe o número da sala:</Text>
                <TextInput style={styles.input}
                    value={num_espaco}
                    onChangeText={(num_espaco => setNum_espaco(num_espaco))}
                />
                <Text style={styles.label}>ID do usuário responsável:</Text>
                <TextInput style={styles.input}
                    value={usuarios_idusuario}
                    onChangeText={(usuarios_idusuario => setUsuarios_idusuario(usuarios_idusuario))}
                />
                <TouchableOpacity onPress={create}>
                    <Text style={styles.button}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
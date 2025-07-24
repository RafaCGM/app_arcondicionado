import React from "react";
import axios from 'axios'
import { server } from '../../../global/GlobalVars';

import { View, Text, TextInput, Image, TouchableOpacity } from "react-native"

import { useState } from "react";
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from "@react-navigation/native";

import styles from '../../../global/GlobalStyles'

export default function DadosEspacoScreen({navigation}) {
    const [id_espaco, setId_espaco] = useState('')
    const [num_espaco, setNum_espaco] = useState('')
    const [usuarios_idusuario, setUsuarios_idusuario] = useState('')

    const route = useRoute()

    useFocusEffect(
        React.useCallback(() => {
            getEspaco()
            return () => {
                route.params = null
            };
        }, [route.params.id_espaco])
    );

    let getEspaco = async () => {
        console.log('Id: ' + route.params.id_espaco)
        try {
            console.log(`${server}/espaco/get`)
            const user = await axios.post(`${server}/espaco/get`, {
                id_espaco: route.params.id_espaco,
            })
            setId_espaco(user.data.res.id_espaco)
            setNum_espaco(user.data.res.num_espaco)
            setUsuarios_idusuario(user.data.res.usuarios_idusuario)

        } catch (e) {
            console.log(e)
        }
    }

    const update = async () => {
        try {
            console.log(`${server}/espaco/update`)
            const res = await axios.post(`${server}/espaco/update`, {
                id_espaco: id_espaco,
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
                <Text style={styles.titulo1}>Dados de Espaço</Text>
                <Text style={styles.label}>Id. Espaço:</Text>
                <TextInput style={styles.input}
                    value={id_espaco}
                />
                <Text style={styles.label}>Número do Espaço:</Text>
                <TextInput style={styles.input}
                    value={num_espaco}
                    onChangeText={(num_espaco => setNum_espaco(num_espaco))}
                />
                <Text style={styles.label}>Id do responsável:</Text>
                <TextInput style={styles.input}
                    value={usuarios_idusuario}
                    onChangeText={(usuarios_idusuario => setUsuarios_idusuario(usuarios_idusuario))}
                />
                <TouchableOpacity
                    onPress={update}
                >
                    <Text style={styles.button}>OK</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
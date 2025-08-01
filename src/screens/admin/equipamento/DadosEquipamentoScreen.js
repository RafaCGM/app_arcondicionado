import React from "react";
import axios from 'axios'
import { server } from '../../../global/GlobalVars';

import { View, Text, TextInput, Image, TouchableOpacity } from "react-native"

import { useState } from "react";
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from "@react-navigation/native";

import styles from '../../../global/GlobalStyles'

export default function DadosEquipamentoScreen({navigation}) {
    const [id_equipamento, setId_equipamento] = useState('')
    const [espaco_num_espaco, setEspaco_num_espaco] = useState('')

    const route = useRoute()

    useFocusEffect(
        React.useCallback(() => {
            getEquipamento()
            return () => {
                route.params = null
            };
        }, [route.params.id_equipamento])
    );

    let getEquipamento = async () => {
        console.log('Id: ' + route.params.id_equipamento)
        try {
            console.log(`${server}/equipamento/get`)
            const user = await axios.post(`${server}/equipamento/get`, {
                id_equipamento: route.params.id_equipamento,
            })
            setId_equipamento(user.data.res.id_equipamento)
            setEspaco_num_espaco(user.data.res.espaco_num_espaco)

        } catch (e) {
            console.log(e)
        }
    }

    const update = async () => {
        try {
            console.log(`${server}/equipamento/update`)
            const res = await axios.post(`${server}/equipamento/update`, {
                id_equipamento: id_equipamento,
                espaco_num_espaco: espaco_num_espaco,
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
                <Text style={styles.titulo1}>Dados do Equipamento</Text>
                <Text style={styles.label}>Id. Equipamento:</Text>
                <TextInput style={styles.input}
                    value={id_equipamento}
                />
                <Text style={styles.label}>Número da sala:</Text>
                <TextInput style={styles.input}
                    value={espaco_num_espaco}
                    onChangeText={(espaco_num_espaco => setEspaco_num_espaco(espaco_num_espaco))}
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

import React from "react";
import axios from 'axios'
import { server } from '../../../global/GlobalVars';

import { View, Text, TextInput, Image, TouchableOpacity } from "react-native"

import { useState } from "react";
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from "@react-navigation/native";

import styles from '../../../global/GlobalStyles'

export default function DadosMonitoramentoScreen({navigation}) {

    const [id_monitoramento, setId_monitoramento] = useState('')
    const [data_hora, setData_hora] = useState('')
    // const [temperatura, setTemperatura] = useState('')
    const [equipamento_idequipamento, setEquipamento_idequipamento] = useState('')
    const route = useRoute()

    useFocusEffect(
        React.useCallback(() => {
            getMonitoramento()
            return () => {
                route.params = null
            };
        }, [route.params.id_monitoramento])
    );

    let getMonitoramento = async () => {
        console.log('Id: ' + route.params.id_monitoramento)
        try {
            console.log(`${server}/monitoramento/get`)
            const user = await axios.post(`${server}/monitoramento/get`, {
                id_monitoramento: route.params.id_monitoramento,
            })
            setId_monitoramento(user.data.res.id_monitoramento)
            setData_hora(user.data.res.data_hora)
            setEquipamento_idequipamento(user.data.res.equipamento_idequipamento)

        } catch (e) {
            console.log(e)
        }
    }

    const update = async () => {
        try {
            console.log(`${server}/monitoramento/update`)
            const res = await axios.post(`${server}/monitoramento/update`, {
                id_monitoramento: id_monitoramento,
                data_hora: data_hora,
                equipamento_idequipamento: equipamento_idequipamento,
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
                <Text style={styles.titulo1}>Dados de Monitoramento</Text>
                <Text style={styles.label}>Id. Monitoramento:</Text>
                <TextInput style={styles.input}
                    value={id_monitoramento}
                />
                <Text style={styles.label}>Data do Monitoramento:</Text>
                <TextInput style={styles.input}
                    value={data_hora}
                    onChangeText={(data_hora => setData_hora(data_hora))}
                />
                <Text style={styles.label}>Id do Equipamento:</Text>
                <TextInput style={styles.input}
                    value={equipamento_idequipamento}
                    onChangeText={(equipamento_idequipamento => setEquipamento_idequipamento(equipamento_idequipamento))}
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
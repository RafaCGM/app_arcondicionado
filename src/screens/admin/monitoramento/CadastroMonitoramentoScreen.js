import React from 'react';
import axios from 'axios'
import { server } from '../../../global/GlobalVars';

import { View, Text, TextInput, Image, TouchableOpacity } from "react-native"
import { useState } from "react";

import styles from '../../../global/GlobalStyles'

export default function CadastroMonitoramentoScreen({navigation}) {
    const [data_hora, setData_hora] = useState('')
    const [temperatura, setTemperatura] = useState('')
    const [equipamento_idequipamento, setEquipamento_idequipamento] = useState('')

    const create = async () => {
        try {
            console.log(`${server}/monitoramento/create`)
            const res = await axios.post(`${server}/monitoramento/create`, {
                data_hora: data_hora,
                temperatura: temperatura,
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
                <Text style={styles.titulo1}>Cadastro de Monitoramento</Text>
                <Text style={styles.label}>Informe a data e hora:</Text>
                <TextInput style={styles.input}
                    value={data_hora}
                    onChangeText={(data_hora => setData_hora(data_hora))}
                />
                <Text style={styles.label}>ID do Monitoramento:</Text>
                <TextInput style={styles.input}
                    value={equipamento_idequipamento}
                    onChangeText={(equipamento_idequipamento => setEquipamento_idequipamento(equipamento_idequipamento))}
                />
                <TouchableOpacity onPress={create}>
                    <Text style={styles.button}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
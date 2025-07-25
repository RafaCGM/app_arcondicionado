import React from 'react';
import axios from 'axios'
import { server } from '../../../global/GlobalVars';

import { View, Text, TextInput, Image, TouchableOpacity, Switch } from "react-native"
import { useState } from "react";

import styles from '../../../global/GlobalStyles'

export default function CadastroEquipamentoScreen({navigation}) {
    // const [status, setStatus] = useState('false')
    const [espaco_idespaco, setEspaco_idespaco] = useState('')

    const create = async () => {
        try {
            console.log(`${server}/equipamento/create`)
            const res = await axios.post(`${server}/equipamento/create`, {
                // status: status,
                espaco_idespaco: espaco_idespaco,
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
                
                <Text style={styles.label}>Espaço onde o equipamento se encontra:</Text>
                <TextInput style={styles.input}
                    value={espaco_idespaco}
                    onChangeText={(espaco_idespaco => setEspaco_idespaco(espaco_idespaco))}
                />
                <TouchableOpacity onPress={create}>
                    <Text style={styles.button}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

import React from 'react';
import axios from 'axios'
import { server } from '../../../global/GlobalVars';

import { View, Text, TextInput, Image, TouchableOpacity, Switch } from "react-native"
import { useState } from "react";

import styles from '../../../global/GlobalStyles'

export default function CadastroEquipamentoScreen({ navigation }) {
    const [espaco_num_espaco, setEspaco_num_espaco] = useState('')

    const create = async () => {
        try {
            console.log(`${server}/equipamento/create`)
            const res = await axios.post(`${server}/equipamento/create`, {
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
            {/* Container das ondas */}
            <View style={styles.waveContainer}>
                <View style={styles.wave}></View>
                <View style={styles.waveSecond}></View>
            </View>
            
            <View style={styles.containerbox}>
                <Text style={styles.label}>Número da sala onde o equipamento se encontra:</Text>
                <TextInput style={styles.input}
                    value={espaco_num_espaco}
                    onChangeText={(espaco_num_espaco => setEspaco_num_espaco(espaco_num_espaco))}
                />
                <TouchableOpacity onPress={create}>
                    <Text style={styles.button}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

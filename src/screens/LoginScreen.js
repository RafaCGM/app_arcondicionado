import React from 'react';
import axios from 'axios'
import { server } from '../global/GlobalVars';

import { View, Text, TextInput, ImageBackground, TouchableOpacity } from "react-native"
import { useState } from "react";

import styles from '../styles/LoginScreenStyles'

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('admin@gmail.com')
    const [password, setPassword] = useState('123456')

    const signin = async () => {
        try {
            const res = await axios.post(`${server}/usuarios/signin`,
                {
                    email: email,
                    password: password
                }
            )

            if (res.data.num_erro == 0) {

                navigation.navigate('Home')
            }

            if (res.data.num_erro == 1) {
                alert(res.data.msg_erro)
            }

        } catch (err) {
            console.log(err)
            alert(err)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.waveContainer} />
            <View style={styles.waveContainerBottom} /> 
            <View style={styles.containerbox}>
                <Text style={styles.titulo1}>TechAir</Text>

                <Text style={styles.label}>E-mail:</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>Senha:</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={signin} style={styles.button}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
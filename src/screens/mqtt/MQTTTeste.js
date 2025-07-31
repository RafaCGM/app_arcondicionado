// Accende e apaga LED

import Paho from 'paho-mqtt';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


const client = new Paho.Client('broker.emqx.io', 8083, 'reactNativeClientId_' + parseInt(Math.random() * 100000));

export default function MQTTTeste() {

    useEffect(() => {
        client.onConnectionLost = (responseObject) => {
            if (responseObject.errorCode !== 0) {
                console.error('Connection lost:', responseObject.errorMessage);
            }
        };

        client.onMessageArrived = (message) => {
            console.log('Message arrived:', message.payloadString, 'on topic:', message.destinationName);
            // Process the received message here
            console.log(message.payloadString)
        };

        client.connect({
            onSuccess: () => {
                console.log('Connected to MQTT broker!');
                client.subscribe('ifrncang/temp/s84'); // Subscribe to a topic
            },
            onFailure: (error) => {
                console.error('Connection failed:', error);
            },
            useSSL: false, // Set to true if using SSL/TLS (e.g., port 8084)
            timeout: 3,
        });



        return () => {
            client.disconnect();
        };
    }, []);

    const enviarMensagem = (msg) => {
        console.log(msg)
        const message = new Paho.Message(msg);
        message.destinationName = 'ifrncang/led';
        client.send(message);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Status Recebido:</Text>
            <Text style={styles.status}>{/*botaoStatus*/}</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => enviarMensagem('on')}>
                    <Text style={styles.buttonText}>Enviar ON</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => enviarMensagem('off')}>
                    <Text style={styles.buttonText}>Enviar OFF</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 20,
        marginBottom: 10,
    },
    status: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#444',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 20,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginHorizontal: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
import React from 'react'
import { View, Text, StyleSheet, Button, ImageBackground } from 'react-native';
import { useRouter } from "expo-router";


export default function Home() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/bg.jpg')} style={styles.image}>
                <Text style={styles.title}>Hardware especializado</Text>
                <Button title='Go to Map' color="#841584" onPress={() => router.push('/map')}></Button>
            </ImageBackground>
            
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'monospace',
        fontSize: 40,
        fontWeight: '900',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 10,
        marginBottom: 15,
    },
});
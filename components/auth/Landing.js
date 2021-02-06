import React from 'react'
import { Text, View, StyleSheet, Button, ImageBackground, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import ScreenOne from './HeaderOne'


export default function Landing({ navigation }) {

    const image = { uri: 'https://i.pinimg.com/originals/44/7b/42/447b4200e0503cf6e9725e0268afad62.png'}
    return ( 
        <>
        <View style={styles.main}>
                <TouchableOpacity style={styles.touchable}>
                <ScreenOne />
                </TouchableOpacity>
            <ImageBackground source={image} style={styles.image}>
            <View style={styles.container}>
                <View style={{marginTop: "5px", padding: "4px"}}>
                <Button title="register"  style={styles.btn}
                color="#CC2936"
                onPress={() => navigation.navigate("Register")} />
                </View>
                <View style={{marginTop: "4px", padding: "4px"}}>
                <Button title="Login" style={{padding: "20px"}}
                color="#DD5560"
                onPress={() => navigation.navigate("Login")} />
                </View>
            </View>
        </ImageBackground>
        <View><Text style={styles.copyright}>Made by Ian © 2021</Text></View>
        </View>
        </>
    )
}







const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'space-between',
        height: 600,
        position: 'relative'
    },
    container: {
        flex: '1',
        
        height: 400,
        marginTop: 300,
    },
    containerText: {
       
    },
    btn: {
      width: '100%',
      padding: 10,
    },
    text: {
        letterSpacing: 1.1111,
        fontWeight: 'bold',
        fontSize: 20,
        fontFamily: 'Roboto',
        color: '#6B818C',
        textAlign: 'center',
        textShadowColor: 'black',
        textShadowRadius: 5,
        textShadowOffset: 1,
        color: '#F0386B'
    },
    copyright: {
        color: 'grey',
        textAlign: 'right',
        marginTop: 10
    },
  
})
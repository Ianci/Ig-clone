import React from 'react'
import { Text, View, StyleSheet, ImageBackground,Image, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
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
                <Image
                style={styles.tinyLogo}
                source={image}
                />
               <View>
                   
               </View>
            <View style={styles.container}>
                <View style={{flex: 1}}>
                <Button title="Register" buttonStyle={styles.btnRegist}
                
                type="solid"
                onPress={() => navigation.navigate("Register")} />
                </View>

                <View style={{flex: 1}}>
                <Button title="Login" 
                type="solid"
                buttonStyle={styles.btnLogin}
                onPress={() => navigation.navigate("Login")} />
                </View>
            </View>
        
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
    tinyLogo: {
        top: 230,
        left: 60,
        position: 'absolute',
        width: '70%',
        height: 250,
      },
    container: {
        flex: 1,
        marginTop: 400
    },
    imgBg: {
       width: 300,
       position: 'absolute'
    },
    btnLogin: {
        
        marginHorizontal: 20,
        backgroundColor: '#DD5560'
    },
    btnRegist: {
        marginTop: 120,
        marginHorizontal: 16,
        backgroundColor: '#CC2936'
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
        textShadowOffset: {width: -1, height: 1},
        color: '#F0386B'
    },
    copyright: {
        color: 'grey',
        textAlign: 'right',
        marginTop: 10
    },
    btnRegister: {
        marginStart: 20
    }
  
})
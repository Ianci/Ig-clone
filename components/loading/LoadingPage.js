import React from 'react'
import { View, Text, StyleSheet, ImageBackground, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export const LoadingPage = () => {

 
        return (
            <View style={styles.container}>
            <ImageBackground source={require('../../images/loadingbackground.svg')}
            style={styles.imageBack}>
          
            <Text style={styles.textLoading}>Loading...</Text>

            <View style={styles.buttonContainer}>
           
            </View>
           
         
          </ImageBackground>
          </View>
          )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        flexDirection: "column",
        
      },
      textLoading: {
        fontWeight: 'bold',
        color: 'orangered',
       
        textAlign: 'center',
        position: "absolute",
        top: 410,
        color: "white",
        width: '100%',
        backgroundColor: "#000000a0",
        fontSize: 42,
        fontWeight: "bold",
      },
      imageBack: {
        flex: 1,
        maxWidth: 390,
        width: 800,
        overflow: 'hidden',
        height: "100%",
        resizeMode: 'contain'
      },
      buttonContainer: {
         
          alignItems: 'center',
          position: 'relative'
      },
      button: {
    
          width: '40%',
          position: 'absolute',
          top: 300,
        }
  });
  
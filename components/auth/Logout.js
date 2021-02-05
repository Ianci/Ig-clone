
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import firebase from 'firebase'
export const Logout = () => {

    const logOutFn = () =>{
        firebase.auth().signOut().then(() => {
            console.log('Logged out')
          }).catch((error) => {
            console.log(error)
          });
    }

    return (
            <View style={styles.btnContainer}>
             <Button title="Log out" onPress={logOutFn} style={styles.btn}/>
            </View>
       
    )
}


const styles = StyleSheet.create({
  btnContainer  : {
    width: 150,
    height: 150,
    justifyContent: 'center',
    marginLeft: 110,

  },
  btn: {
    width: '50',
    height: '50',
    margin: '0 auto'
  }
});
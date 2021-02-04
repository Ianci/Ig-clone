
import React from 'react';
import { Button } from 'react-native';
export const Logout = () => {

    const logOutFn = () =>{
        firebase.auth().signOut().then(() => {
            console.log('Logged out')
          }).catch((error) => {
            console.log(error)
          });
    }

    return (
        
             <Button title="Log out" onPress={logOutFn} />
       
    )
}

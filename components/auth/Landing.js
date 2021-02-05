import React from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'

export default function Landing({ navigation }) {
    return ( 
        <>
        <View style={styles.containerText}>
            <Text style={styles.text}>Bienvenido a IG Clone</Text>
        </View>
     <View style={styles.container}>
            <Button title="register"  style={styles.btn}
            onPress={() => navigation.navigate("Register")} />
            <Button title="Login" style={styles.btn}
            onPress={() => navigation.navigate("Login")} />
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: "0 0 20%",
        justifyContent: 'center',
        flexDirection: 'row'
    },
    btn: {
      width: '100%'
    },
    text: {
        
    }
})
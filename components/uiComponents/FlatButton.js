import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
export default function FlatButton(props){
    return (
        <TouchableOpacity onPress={props.onPress} >
        <View style={styles.btn}>
            <Text style={styles.btnText}>
                {props.title}
            </Text>
        </View>
        </TouchableOpacity>
        )
}


const styles = StyleSheet.create({
    btn: {
        borderRadius: 10,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: '#f01d71'
    },
    btnText: {
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center'
    },
})
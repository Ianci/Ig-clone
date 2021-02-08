import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'


export default function CustomButton(props){
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
        paddingVertical: 6,
        paddingHorizontal: 6,
        marginHorizontal: 60,
        marginVertical: 10,
        backgroundColor: '#EE4266'
    },
    btnText: {
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 14,
        textAlign: 'center'
    },
})
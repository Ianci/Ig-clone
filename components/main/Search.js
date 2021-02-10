import React, { useState } from 'react'
import { View , Text, StyleSheet, FlatList,TouchableOpacity } from 'react-native'
import { Input } from 'react-native-elements'
import firebase from 'firebase'
import 'firebase/firestore'

export default function Search(props) {
    const [ users, setUsers ] = useState([])

    const fetchUsers = (search) => {
        firebase.firestore()
        .collection('users')
        .where('name', '>=', search)
        .get()
        .then((snapshot) => {
            let users = snapshot.docs.map(doc => {
                const data = doc.data()
                const id = doc.id;
                return { id, ...data}
            })
            setUsers(users)
        })
    }
    return (
        <View style={styles.container}>
            <Text style={styles.search}>Search Users :</Text>
            <Input placeholder="Search" onChangeText={(search) => fetchUsers(search)} 
            inputStyle={styles.input}/>

            <FlatList 
            numColumns={1}
            horizontal={false}
            data={users}
            renderItem={({item}) => (

                <TouchableOpacity style={styles.touch}
                onPress={() => props.navigation.navigate("Profile", {uid: item.id})}>
                <Text style={styles.textName}>{item.name}</Text>
            </TouchableOpacity>
            )}
            />
        </View>
    )
}


const styles= StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 20,
        flex: 1
    },
    search: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 24
    },
    input: {
        margin: 0,
        padding: 2,
       
    },
    touch: {
        borderRadius: 50,
        backgroundColor: '#BCEDF6',
        margin: 5,
    },
    textName: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})
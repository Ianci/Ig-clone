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
        <View style={{flex: 1}}>
            <Text>Search Users</Text>
            <Input placeholder="Search" onChangeText={(search) => fetchUsers(search)} />

            <FlatList 
            numColumns={1}
            horizontal={false}
            data={users}
            renderItem={({item}) => (
                <TouchableOpacity
                onPress={() => props.navigation.navigate("Profile", {uid: item.id})}>
                <Text>{item.name}</Text>
            </TouchableOpacity>
            )}
            />
        </View>
    )
}

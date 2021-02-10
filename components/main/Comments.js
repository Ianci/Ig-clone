import React, { useState, useEffect } from 'react'
import { View , Text, StyleSheet, Image, FlatList, Header } from 'react-native'
import { Input, Button } from 'react-native-elements'
import firebase from 'firebase';
import 'firebase/firestore';


export default function Comments(props) {

    const [ comments, setComments ] = useState([])
    const [ postId, setPostId ] = useState('')
    const [ message, setMessage ] = useState('')

    useEffect(() => {
        
        if(props.route.params.postId !== postId){
            firebase.firestore()
            .collection('posts')
            .doc(props.route.params.uid)
            .collection('userPosts')
            .doc(props.route.params.postId)
            .collection('comments')
            .get()
            .then((snapshot) => {
                let comment = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data}
                })
                setComments(comment)
            })
            setPostId(props.route.params.postId)
        }

    }, [props.route.params.postId])


    const onCommentSent = () => {
        firebase.firestore()
        .collection('posts')
        .doc(props.route.params.uid)
        .collection('userPost')
        .doc(props.route.params.postId)
        .collection('comments')
        .add({
            creator: firebase.auth().currentUser.uid,
            text: message
        })
    }
    return (
        <View>
            <FlatList numColumns={1} horizontal={false} data={comments}
            keyExtractor={({item, index}) => item.id}
            renderItem={({item}) => {
                <View>
                    <Text>{item.text}</Text>
                </View>
            }}
            />

            <View>
                <Input placeholder="Leave a comment"
                onChangeText={(comment) => setMessage(comment)}
                />
                <Button title="Send" onPress={() => onCommentSent()} />
            </View>
        </View>
    )
}

import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { Input } from 'react-native-elements'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../uiComponents/CustomButton';
import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/firebase-storage'

import { useDispatch, useSelector } from 'react-redux'



export default function Save(props, { navigation }) {

    const [ caption, setCaption ] = useState('')
    const [ isDisabled, setIsDisabled ] = useState(false)
    const [ progress, setProgress ] = useState('')
   

    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.ui)

    const uploadImage = async() => {
        setIsDisabled(true)
        const uri = props.route.params.photoUrl
        const response = await fetch(uri)
        const upload = await response.blob()
      
        const task = firebase.storage()
        .ref()
        .child(`post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`)
        .put(upload)
       
        const taskProgress = snapshot => {
            setProgress(`transferred: ${snapshot.bytesTransferred}`)
            console.log(`transferred: ${snapshot.bytesTransferred}`)
          
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                //Guardando la nueva collection
                savePostData(snapshot)
              
                console.log(snapshot)
            })
        }

        const taskError = (snapshot) => {
            console.log(snapshot)
            
        }

        task.on('state_changed', taskProgress, taskError, taskCompleted)
       
    }


    const savePostData = (downloadURL) => {
        firebase.firestore()
        .collection('posts')
        .doc(firebase.auth().currentUser.uid)
        .collection('userPost')
        .add({
            downloadURL,
            caption,
            creation: firebase.firestore.FieldValue.serverTimestamp()
        }).then((function (){
            props.navigation.popToTop()
        }))
    }
    return (
        <View style={{flex: 1}}>
            <View style={styles.imageContainer}>
            <Image source={{uri: props.route.params.photoUrl}} style={styles.image}/>
            </View>
            <Input 
            placeholder="Write a caption..."
            onChangeText={(caption) => setCaption(caption)}
            />
            <Button title="Save" onPress={uploadImage} disabled={(isDisabled ? true : false)}
            type="solid" buttonStyle={styles.btnStyling}
            />
            

            {isDisabled && <View>
                <CustomButton title="Uploading... please wait"/>
                <Text style={styles.progress}>{progress}</Text>
                </View>}
        </View>
    )
}


const styles = StyleSheet.create({
    progress: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'grey',
        fontSize: 20
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        padding: 10
    },
    imageContainer: {
        marginHorizontal: 20,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnStyling: {
        marginHorizontal: 20,
        backgroundColor: '#00A6A6',
        fontWeight: 'bold'
    }
})
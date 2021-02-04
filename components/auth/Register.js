import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native'
import firebase from 'firebase';


export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        }
        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp(){
        const { name, password, email} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) =>{
            firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
            .set({
                name,
                email
            })
            console.log(result)
        })
        .catch((error) =>{
            console.log(error)
        })
    }


    render(){
        return (
            <View>
                <TextInput placeholder="Name"
                onChangeText={(name) => this.setState({name})}
                />
                 <TextInput placeholder="Email"
                 
                onChangeText={(email) => this.setState({email})}
                />

                <TextInput placeholder="Password"
                secureTextEntry={true}
                onChangeText={(password) => this.setState({password})}
                />

                <Button title="Sign Up" onPress={this.onSignUp} />
            </View>
        )
    }
}
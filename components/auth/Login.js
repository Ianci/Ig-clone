import React, { Component } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import firebase from 'firebase'
export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
           
        }
        this.onSignIn = this.onSignIn.bind(this)
    }

    onSignIn(){
        const { password, email} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) =>{
            console.log(result)
        })
        .catch((error) =>{
            console.log(error)
        })
    }
    render() {
        return (
            
                <View>
                    
                     <TextInput placeholder="Email"
                     
                    onChangeText={(email) => this.setState({email})}
                    />
    
                    <TextInput placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}
                    />
    
                    <Button title="Sign In" onPress={this.onSignIn} />
                </View>
            
        )
    }
}

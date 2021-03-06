import React, { Component } from 'react'
import { View , Text, StyleSheet } from 'react-native'
import firebase from 'firebase'

import { errorHandler, errorClean } from '../../redux/actions/ui'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import FlatButton from '../uiComponents/FlatButton';

export class Login extends Component {
 
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
            this.props.errorClean() // <--
        })
        .catch((error) =>{
            console.log(error.message)
            this.props.errorHandler(error.message) // <--
        })
    }

    
    render() {
        const { error } = this.props
        return (
            
                <View style={styles.container}>
                   
                   <Input
                    placeholder='Email'
                    autoCompleteType="off"
                    leftIcon={{ type: 'fontisto', name: 'email' }}
                    onChangeText={(email) => this.setState({email})}
                    />
                   
    
                    <Input placeholder="Password"
                    autoCompleteType="off"
                    secureTextEntry={true}
                    leftIcon={{ type: 'material-icons', name: 'security' }}
                    onChangeText={(password) => this.setState({password})}
                    />
                

                   <FlatButton
                    onPress={this.onSignIn}
                    title="Log In"
                    />
                  
                    {error && <Text style={styles.errorStyle}>{error}</Text>}
                </View>
            
        )
    }
}

const mapStateToProps = store => ({
    
    error: store.ui.error
})

//Pasando las actions al class
const mapDispatchToProps = (dispatch) => {
    return { dispatch, ...bindActionCreators({ errorHandler, errorClean}, dispatch)}
 
}



export default connect(mapStateToProps, mapDispatchToProps)(Login);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        margin: 20,
    },
    errorStyle: {
        textAlign: 'center',
        color: 'red',
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 0.4

    },
    textInp: {
        marginHorizontal: 40,
        borderBottomColor: 'blue',
        borderBottomWidth: 2,
        margin: 30,    
    },
   
})



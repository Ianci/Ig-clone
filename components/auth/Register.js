import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native'
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import FlatButton from '../uiComponents/FlatButton';
import { errorHandler, errorClean } from '../../redux/actions/ui'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

export class Register extends Component {
    constructor(props) {
        super(props);
        const navigation = this.props
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
            navigation.navigate('Main')
            
            console.log(result)
        })
        .catch((error) =>{
            console.log(error)
           
        })
    }

 
    

    render(){
        const { error } = this.props

        return (
            <View style={styles.container}>
                <Input placeholder="Name"
                onChangeText={(name) => this.setState({name})}
                leftIcon={{ type: 'entypo', name: 'add-user' }}
                />
                 <Input placeholder="Email"
                 
                onChangeText={(email) => this.setState({email})}
                leftIcon={{ type: 'fontisto', name: 'email' }}
                />

                <Input placeholder="Password"
                secureTextEntry={true}
                onChangeText={(password) => this.setState({password})}
                leftIcon={{ type: 'material-icons', name: 'security' }}
                />

                <Input placeholder="Repeat your password"
                secureTextEntry={true}
                onChangeText={(password) => this.setState({password})}
                leftIcon={{ type: 'material-icons', name: 'security' }}
                />

                <FlatButton title="Sign Up" onPress={this.onSignUp} />

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

export default connect(mapStateToProps, mapDispatchToProps)(Register);



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


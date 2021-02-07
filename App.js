import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import Landing from './components/auth/Landing';
import * as firebase from 'firebase';
import { Register } from './components/auth/Register';
import  Login  from './components/auth/Login';
import loadingbackground from './images/loadingbackground.svg'
import Main from './components/main/Main';

//Redux
import { store } from './redux/store/store'
import  { Provider } from 'react-redux'
import { LoadingPage } from './components/loading/LoadingPage';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'



const firebaseConfig = {
    apiKey: "AIzaSyA161l9C4AvHLWkiA_YGy03KpBkaW0PzVg",
    authDomain: "ig-clone-a8953.firebaseapp.com",
    projectId: "ig-clone-a8953",
    storageBucket: "ig-clone-a8953.appspot.com",
    messagingSenderId: "730154175772",
    appId: "1:730154175772:web:6673790bffb16a30eb7ed9",
    measurementId: "G-DJ1B9Z8LZK"
  };

  if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
  }

const Stack = createStackNavigator()


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
      
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false, 
          loaded: true
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded } = this.state;
   
    if(!loaded ) {
      return <LoadingPage />
    }

    if(!loggedIn){
      return (
        <Provider store={store}>
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">

          <Stack.Screen name="Landing" component={Landing} 
          options={{
            headerShown: false,
          }}
          />
  
          <Stack.Screen name="Register" component={Register} 
          options={{
            headerStyle: {
              backgroundColor: '#7209B7',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          />

          <Stack.Screen name="Login" component={Login} 
          options={{
            headerStyle: {
              backgroundColor: '#7209B7',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          />
         
        </Stack.Navigator>
      </NavigationContainer>
      </Provider>
      
      )
    }

    return (
      <Provider store={store}>
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Main" component={Main} 
          options={{
            headerShown: false,
          }}
          />
        </Stack.Navigator>
       </NavigationContainer>
      </Provider>
    )
  }
}


    

   

const styles = StyleSheet.create({
 
});

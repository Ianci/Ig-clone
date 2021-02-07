import React, { Component } from 'react'
import { View, Button , Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import {fetchUser} from '../../redux/actions';
import { Logout } from '../../components/auth/Logout';
import { LoadingPage } from '../loading/LoadingPage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Profile from './Profile';
import Feed from './Feed';


import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
    return(null)
}

export class Main extends Component {
    

    componentDidMount(){
        this.props.fetchUser()
        
    }
    render() {

       
        
            return (
                <Tab.Navigator
                initialRouteName="Feed"
                activeColor="#FFFCFF"
                labeled={false}
                inactiveColor="#BABCB3"
                barStyle={{ backgroundColor: '#D81159' }}
              >
              
                <Tab.Screen
                  name="Feed"
                  component={Feed}
                  options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                  }}
                />
                <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                ),
                }}
                />
                 <Tab.Screen
                name="MainAdd"
                component={EmptyScreen}
                listeners={({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault()
                        navigation.navigate('Add')
                    }
                })}
                options={{
                tabBarLabel: 'Add',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="plus-box" color={color} size={26} />
                ),
                }}
                />
              </Tab.Navigator>
            )
        
       
    }
}

//State de redux
const mapStateToProps = store => ({
    currentUser: store.user.currentUser,
    loading: store.ui.loading
})
//Pasando las actions al class
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ 
        fetchUser }, 
        dispatch)
  }

export default connect(mapStateToProps, mapDispatchToProps)(Main);


//Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    textLoading: {
        fontWeight: 'bold',
        color: 'orangered',
        fontSize: 25,
        textAlign: 'center',
    }
});
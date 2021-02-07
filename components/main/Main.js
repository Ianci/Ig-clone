import React, { Component } from 'react'
import { View, Button , Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import {fetchUser} from '../../redux/actions';
import { Logout } from '../../components/auth/Logout';
import { LoadingPage } from '../loading/LoadingPage';
import MaterialCommunityIcons from 'react-native-vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feed from './Feed';

const Tab = createBottomTabNavigator();


export class Main extends Component {
    

    componentDidMount(){
        this.props.fetchUser()
        
    }
    render() {

       
        
            return (
                <Tab.Navigator>
                    <Tab.Screen name="Feed" component={Feed} />
                    
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
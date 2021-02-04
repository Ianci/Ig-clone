import React, { Component } from 'react'
import { View, Button , Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import {fetchUser} from '../../redux/actions';
import { Logout } from '../../components/auth/Logout';



export class Main extends Component {
    
   
    componentDidMount(){
        this.props.fetchUser()
        
        
    }
    render() {
     
        return (
            <View style={styles.container}>
                <Text>User is logged in</Text>
                <Logout />
            </View>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchUser }, dispatch)
  }

export default connect(null, mapDispatchToProps)(Main);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});
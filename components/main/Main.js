import React, { Component } from 'react'
import { View, Button , Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import {fetchUser} from '../../redux/actions';
import { Logout } from '../../components/auth/Logout';
import { LoadingPage } from '../loading/LoadingPage';




export class Main extends Component {
    
  
       
   
    componentDidMount(){
        this.props.fetchUser()
        
    }
    render() {

        const { currentUser } = !!this.props && this.props
        console.log(currentUser)

        if(currentUser === null ) return(<LoadingPage />)

        
            return (
                <View style={styles.container}>
                    <Text style={{textAlign: 'center'}}>{currentUser.name} is logged in</Text>
                    <Logout />
                </View>
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
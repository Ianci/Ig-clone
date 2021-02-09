import React, { useState, useEffect } from 'react'
import { View , Text, StyleSheet, Image, FlatList, Header } from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase'
import 'firebase/firestore'
import { USER_STATE_CHANGE } from '../../redux/types'
import { endLoading, loadingAction } from '../../redux/actions/ui'


export function Profile(props) {
    const [ userPosts, setUserPosts ] = useState([])
    const [ user, setUser ] = useState(null)
   
   

    useEffect(() => {
        const { currentUser, loading, posts} = props
        if(props.route.params.uid === firebase.auth().currentUser.uid){
            setUser(currentUser)
            setUserPosts(posts)
        } else {
            dispatch(loadingAction())
            firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    setUser(snapshot.data())
                    dispatch(endLoading())
                }
               
            })
            .catch((error) => {
                console.log(error)
                
              });
              firebase.firestore()
            .collection('posts')
            .doc(firebase.auth().currentUser.uid)
            .collection('userPost')
            .orderBy('creation', 'asc')
            .get()
            .then((snapshot) => {
              let posts = snapshot.docs.map(doc => {
                  const data = doc.data()
                  const dataId = doc.id
               
                  return {dataId, ...data}
              })
              setUserPosts(posts)
              console.log(posts)
               
            })
            .catch((error) => {
                console.log(error)
                
              });
        }
    }, [props.route.params.uid])

    if(user === null) {
        return <View />
    }
    return (
        <View style={styles.container}>
            
            <View style={styles.containerDate}>
                <Text style={styles.textuser}>Hello {user.name}!</Text>
                <Text style={styles.textposts}>Your posts: </Text>
            </View>
            <View style={styles.containerPost}>
                <FlatList 
               
                numColumns={3}
                horizontal={false}
                data={userPosts}
                keyExtractor={(item, index) => item.dataId}
                renderItem={({item}) => (
                    <View style={styles.containerImage}>
                    <Image 
                    style={styles.image}
                    source={{uri: item.downloadURL}}/>
                    </View>
                )}
                />
            </View>
        </View>
    )
}


//State de redux
const mapStateToProps = store => ({
    currentUser: store.user.currentUser,
    posts: store.user.posts,
    loading: store.ui.loading
})

export default connect(mapStateToProps, null)(Profile)

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        flex: 1,
    },
    containerDate: {
        margin: 20
    },
    textuser: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#F6F679'
    },
    textposts: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FCFCD9'
    },
    containerPost: {
        flex: 1,

    },
    containerImage: {
        flex: 1 /3
    },
    image: {
        flex: 1,
        aspectRatio: 1/1
    }
})
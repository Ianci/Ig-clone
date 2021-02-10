import React, { useState, useEffect } from 'react'
import { View , Text, StyleSheet, Image, FlatList, Header } from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase'
import 'firebase/firestore'
import { USER_STATE_CHANGE } from '../../redux/types'
import { endLoading, loadingAction } from '../../redux/actions/ui'
import { Button } from 'react-native-elements'


export function Profile(props) {
    const [ userPosts, setUserPosts ] = useState([])
    const [ user, setUser ] = useState(null)
    const [ isFollowing, setIsFollowing ] = useState(false)
   

    useEffect(() => {

        //Si el id que le pasamos por params coincide con el id del usuario logueado, guardamos los datos y sino fetcheamos user y posts de vuelta con la nueva id
        const { currentUser, loading, posts} = props
        if(props.route.params.uid === firebase.auth().currentUser.uid){
            setUser(currentUser)
            setUserPosts(posts)
        } else {
           
            firebase.firestore()
            .collection("users")
            .doc(props.route.params.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    setUser(snapshot.data())
                    
                }
               
            })
            .catch((error) => {
                console.log(error)
                
              });
            firebase.firestore()
            .collection('posts')
            .doc(props.route.params.uid)
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

        if(props.follows.indexOf(props.route.params.uid) > -1){
            setIsFollowing(true)
        } else {
            setIsFollowing(false)
        }
    }, [props.route.params.uid, props.follows])


    //Follow function
    const onFollow = () => {
        firebase.firestore()
        .collection('following')
        .doc(firebase.auth().currentUser.uid)
        .collection('userFollowing')
        .doc(props.route.params.uid)
        .set({})
    }
    //Uff function
    const onUnfollow = () => {
        firebase.firestore()
        .collection('following')
        .doc(firebase.auth().currentUser.uid)
        .collection('userFollowing')
        .doc(props.route.params.uid)
        .delete()
    }
    if(user === null) {
        return <View />
    }

    
    return (
        <View style={styles.container}>
            
            <View style={styles.containerDate}>
                <Text style={styles.textuser}>{user.name}</Text>
               
                {props.route.params.uid !== firebase.auth().currentUser.uid ? 
                (
                   <View>
                       { isFollowing ? (
                            <Button title="Following" buttonStyle={styles.btnFollow} onPress={() => onUnfollow()}/> 
                        ):
                            ( 
                            <Button title="Follow" buttonStyle={styles.btnFollow} onPress={() => onFollow()} />
                       )}
                   </View>
                ): null}
                
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
    follows: store.user.follows,
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
        color: '#FFFFFF'
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
    },
    btnFollow: {
        marginVertical: 20,
        marginHorizontal: 50,
        backgroundColor: '#FF0AD2',
        borderRadius: 50
    }
})
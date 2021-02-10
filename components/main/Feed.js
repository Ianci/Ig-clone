import React, { useState, useEffect } from 'react'
import { View , Text, StyleSheet, Image, FlatList, Header } from 'react-native'
import { Divider } from 'react-native-elements';
import { connect } from 'react-redux'
import 'firebase/firestore'
import Icon from 'react-native-vector-icons/FontAwesome';


export function Feed(props) {
    const [ posts, setPosts ] = useState([])
    

    useEffect(() => {
        let posts = []
        if(props.usersLoaded === props.follows.length){
            for( let i = 0; i < props.follows.length; i++ ){
                const user = props.users.find(el => el.uid === props.follows[i])
                if( user !== undefined ) {
                    posts = [...posts, ...user.posts]
                }
            }
            posts.sort(function(x,y)  {
                return x.creation -  y.creation;
            })
            setPosts(posts)
        }
    }, [props.usersLoaded])


    return (
        <View style={styles.container}>

            <View style={styles.containerDate}>
                         
            </View>
            <View style={styles.containerPost}>
                <FlatList 
                numColumns={1}
                horizontal={false}
                data={posts}
                keyExtractor={(item, index) => item.id}
                renderItem={({item}) => (
                    <View style={styles.containerImage}>

                        <Icon.Button
                        name="user"
                        backgroundColor="#3b5998"
                        iconStyle={{margin: 5, width: '20%'}}
                        size={9}
                        />


                        <Text style={styles.textName}>
                            {item.user.name}
                        </Text>

                    <Image 
                        style={styles.image}
                        source={{uri: item.downloadURL}}
                    />
                    
                    <Text
                    style={styles.textComment}
                   
                
                    >View comments
                    <Icon.Button
                        name="comment"
                        backgroundColor="#3b5998"
                       
                        size={14}
                    />
                    </Text>
                    
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
    follows: store.user.follows,
    users: store.userData.users,
    usersLoaded: store.userData.usersLoaded,
    feed: store.userData.feed,
    loading: store.ui.loading
})

export default connect(mapStateToProps, null)(Feed)

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
        margin: 30,
    },
    containerImage: {
        flex: 1 /3
    },
    image: {
        flex: 1,
        aspectRatio: 1/1,
        borderRadius: 100
    },
    btnFollow: {
        marginVertical: 20,
        marginHorizontal: 50,
        backgroundColor: '#FF0AD2',
        borderRadius: 50
    },
    textComment: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10
    },
    iconComment: {
        margin: 10
    },
    textName: {
        fontWeight: 'bold',
        fontSize: 24,
        margin: 9,
    }
})
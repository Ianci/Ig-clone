import React from 'react'
import { View , Text, StyleSheet, Image, FlatList, Header } from 'react-native'
import { connect } from 'react-redux'

export function Profile(props) {
    const { currentUser, loading, posts} = props
    

    return (
        <View style={styles.container}>
            
            <View style={styles.containerDate}>
                <Text>{currentUser.name}</Text>
                <Text>{currentUser.email}</Text>
            </View>
            <View style={styles.containerPost}>
                <FlatList 
               
                numColumns={3}
                horizontal={false}
                data={posts}
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
        marginTop: 40,
        flex: 1,
    },
    containerDate: {
        margin: 20
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
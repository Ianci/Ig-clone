import * as firebase from 'firebase';
import 'firebase/firestore';
import { USER_POST_CHANGE, USER_STATE_CHANGE, USER_FOLLOWS_CHANGE, USER_DATA_STATE_CHANGE, USER_POST_STATE_CHANGE, CLEAR_DATA_LOGOUT } from '../types'
import { endLoading, loadingAction, errorHandler } from './ui'
import { useDispatch } from 'react-redux'


export const fetchUser = () =>{

    return ((dispatch) => {
        dispatch(loadingAction())
        firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() })
                    dispatch(endLoading())
                }
               
            })
            .catch((error) => {
                console.log(error)
                
              });
    })
}


//Fetch posts function
export const fetchPost = () =>{
    return ((dispatch) => {
        dispatch(loadingAction())
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
              dispatch(userPost(posts))
              console.log(posts)
               
            })
            .catch((error) => {
                console.log(error)
                
              });
    })
}

//Fetch posts Action
const userPost = (posts) => {
    return ({
        type: USER_POST_CHANGE,
        payload: posts
    })
}

const userFollows = ids => {
    return({
        type: USER_FOLLOWS_CHANGE,
        payload: ids
    })
}


export const fetchFollows = () =>{
    return ((dispatch) => {
        dispatch(loadingAction())
        firebase.firestore()
            .collection('following')
            .doc(firebase.auth().currentUser.uid)
            .collection('userFollowing')
            
            .onSnapshot((snapshot) => {
              let following = snapshot.docs.map(doc => {
                  const dataId = doc.id
                  return dataId
                })
              dispatch(userFollows(following))
              for(let i = 0; i < following.length ; i++){
              dispatch(fetchUserData(following[i], true))
              }
            })
    })
}

//Action
const fetchDataAction = (user) => {
    return({
        type: USER_DATA_STATE_CHANGE,
        payload: user   
    })
}
//Function
export const fetchUserData = (uid) => {
    return((dispatch, getState) => {
        const foundUser = getState().userData.users.some(el => el.uid === uid)

        if(!foundUser){
            firebase.firestore()
            .collection('users')
            .doc(uid)
            .get()
            .then((snapshot) => {
                if(snapshot.exists){
                    let user = snapshot.data();
                    user.uid = snapshot.id
                    dispatch(fetchDataAction(user))
                    dispatch(fetchUserFollowingPost(user.uid))
                }
            })
        }
    });
};


//Function

const fetchUserFollowingPost = uid => {
    return((dispatch, getState) => {
       
        firebase.firestore()
        .collection('posts')
        .doc(uid)
        .collection('userPost')
        .orderBy('creation', 'asc')
        .get()
        .then((snapshot) => {
            const uid = snapshot.query.EP.path.segments[1]
            console.log({ snapshot, uid});
            const user = getState().userData.users.find(el => el.uid === uid)

            let posts = snapshot.docs.map(doc => {
                const data = doc.data()
                const id = doc.id
                return { id, ...data, user}
            })
            console.log(posts)
            dispatch({type: USER_POST_STATE_CHANGE, posts, uid})
            console.log(getState())
        })
      
    })
}

//Action
const clearDataAction = () => {
    return({
        type: CLEAR_DATA_LOGOUT
    })
}
//Function
export const clearData = () => {
    return((dispatch) => {
        dispatch(clearDataAction())
    })
}
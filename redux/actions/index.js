import * as firebase from 'firebase';
import 'firebase/firestore';
import { USER_POST_CHANGE, USER_STATE_CHANGE } from '../types'
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
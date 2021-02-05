import firebase from 'firebase'
import { USER_STATE_CHANGE } from '../types'
import { endLoading, loadingAction, errorHandler } from './ui'



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
                
                // ..
              });
    })
}

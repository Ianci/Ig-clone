import { USER_POST_CHANGE, USER_STATE_CHANGE } from '../../types';

const initialState = {
    currentUser: null,
    posts: []
}

export const userReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case USER_STATE_CHANGE:
        return{
            ...state,
            currentUser: action.currentUser
        }
        case USER_POST_CHANGE:
            return {
                ...state,
                posts: payload
            }
    
        default:
            return state;
    }
}
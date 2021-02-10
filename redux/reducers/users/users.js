import { USER_POST_CHANGE, USER_STATE_CHANGE, USER_FOLLOWS_CHANGE, CLEAR_DATA_LOGOUT } from '../../types';

const initialState = {
    currentUser: null,
    posts: [],
    follows: []
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
        case USER_FOLLOWS_CHANGE:
            return {
                ...state,
                follows: payload
            }
        case CLEAR_DATA_LOGOUT:
            return {
                currentUser: null,
                posts: [],
                follows: []
            }
        default:
            return state;
    }
}
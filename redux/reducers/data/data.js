import { USER_DATA_STATE_CHANGE, USER_POST_STATE_CHANGE } from '../../types'

const initialState = {
    users: [],
    userLoaded: 0,
}

export const userDataReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case USER_DATA_STATE_CHANGE:
        return{
            ...state,
            users: [...state,users, payload]
        }
        case USER_POST_STATE_CHANGE:
            return {
                ...state,
                posts: payload
            }
     
        default:
            return state;
    }
}
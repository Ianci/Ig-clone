import { USER_DATA_STATE_CHANGE, USER_POST_STATE_CHANGE, CLEAR_DATA_LOGOUT } from '../../types'

const initialState = {
    users: [],
    feed: [],
    usersLoaded: 0,
}

export const userDataReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case USER_DATA_STATE_CHANGE:
        return{
            ...state,
            users: [...state.users, payload]
        }
        case USER_POST_STATE_CHANGE:
            return {
                ...state,
                usersLoaded: state.usersLoaded + 1,
                users: state.users.map(user => user.uid === action.uid ? 
                    {...user, posts: action.posts} :
                    user
                    )
            }
        case CLEAR_DATA_LOGOUT:
            return {
                users: [],
                feed: [],
                usersLoaded: 0,
            }
        default:
            return state;
    }
}
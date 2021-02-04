import { USER_STATE_CHANGE } from '../../types';

const initialState = {
    currentUser: null
}

export const userReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case USER_STATE_CHANGE:
        return{
            ...state,
            currentUser: action.currentUser
        }
    
        default:
            return state;
    }
}
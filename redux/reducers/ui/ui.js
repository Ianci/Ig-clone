import { START_LOADING, END_LOADING, SET_ERRORS, NO_ERRORS } from '../../types/index'



const initialState = {
    error: null,
    loading: false
}
export const uiReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case START_LOADING:
        return {
            ...state,
            loading: true
        }
        case END_LOADING: 
        return {
            ...state,
            loading: false
        }
        case SET_ERRORS:
        return{
            ...state,
            error: payload
        }
        case NO_ERRORS: 
        return {
            ...state,
            error: null
        }
        default:
            return state
    }
}
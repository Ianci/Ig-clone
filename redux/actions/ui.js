import { START_LOADING, END_LOADING, SET_ERRORS, NO_ERRORS } from "../types"



export const loadingAction = () => {
    return{
        type: START_LOADING
    }
}
export const endLoading = () => {
    return{
        type: END_LOADING
    }
}
export const errorHandler = (error) => {
    return{
        type: SET_ERRORS,
        payload: error
    }
}

export const errorClean = () => {
    return{
        type: NO_ERRORS
      
    }
}
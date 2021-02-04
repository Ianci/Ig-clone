import { combineReducers } from 'redux'
import { userReducer } from './users';

const rootReducers = combineReducers({
    user: userReducer
})

export default rootReducers
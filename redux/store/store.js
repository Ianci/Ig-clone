  
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import { userReducer } from '../reducers/users';

const reducers = combineReducers({
    user: userReducer,
   
})
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


export const store = createStore(reducers,
    composeEnhancers(applyMiddleware(thunk))
    )
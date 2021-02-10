  
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import { uiReducer } from '../reducers/ui/ui';
import { userReducer } from '../reducers/users/users';
import { userDataReducer } from '../reducers/data/data'
const reducers = combineReducers({
    user: userReducer,
    ui: uiReducer,
    userData: userDataReducer
   
})
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


export const store = createStore(reducers,
    composeEnhancers(applyMiddleware(thunk))
    )
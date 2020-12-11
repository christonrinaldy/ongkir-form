import {applyMiddleware, combineReducers, createStore} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import {user_reducer, ongkirReducer} from './reducer'

const reducer = combineReducers({
    user_reducer,
    ongkirReducer
})

const store = createStore(reducer, applyMiddleware(thunk,logger))
export default store
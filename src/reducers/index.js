import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reposReducer from './reposReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const rootReducer = combineReducers({
  repos: reposReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
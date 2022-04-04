import { combineReducers, createStore } from 'redux'
import courseReducer from './courseReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
  user: userReducer,
  course: courseReducer,
})
const store = createStore(rootReducer)

export default store

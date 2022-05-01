import { combineReducers, createStore } from 'redux'
import blogReducer from './blogReducer'
import courseReducer from './courseReducer'
import userReducer from './userReducer'
import videoReducer from './videoReducer'

const rootReducer = combineReducers({
  user: userReducer,
  course: courseReducer,
  video: videoReducer,
  blog: blogReducer,
})
const store = createStore(rootReducer)

export default store

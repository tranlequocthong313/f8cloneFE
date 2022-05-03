import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.scss'
import NavContextProvider from './context/NavContext'
import { Provider } from 'react-redux'
import store from './reducers/index'
import PostContextProvider from './context/PostContext'
import SocketContextProvider from './context/SocketContext'
import { BrowserRouter as Router } from 'react-router-dom'
import CommentContextProvider from './context/CommentContext'
import LessonContextProvider from './context/LessonContext'
import ErrorContextProvider from './context/ErrorContext'

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <NavContextProvider>
        <PostContextProvider>
          <SocketContextProvider>
            <CommentContextProvider>
              <LessonContextProvider>
                <ErrorContextProvider>
                  <App />
                </ErrorContextProvider>
              </LessonContextProvider>
            </CommentContextProvider>
          </SocketContextProvider>
        </PostContextProvider>
      </NavContextProvider>
    </Provider>
  </Router>,
  document.getElementById('root')
)

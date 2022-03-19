import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import './index.scss'
import NavContextProvider from './context/NavContext'
import { Provider } from 'react-redux'
import store from './reducers/index'
import LoadingContextProvider from './context/LoadingContext'

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <NavContextProvider>
        <LoadingContextProvider>
          <App />
        </LoadingContextProvider>
      </NavContextProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)

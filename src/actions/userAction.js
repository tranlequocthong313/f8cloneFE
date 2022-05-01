const login = (payload) => {
  return {
    type: 'LOGIN',
    payload,
  }
}

const logout = (payload) => {
  return {
    type: 'SIGN_OUT',
    payload,
  }
}

const setAuth = (payload) => {
  return {
    type: 'SET_AUTH',
    payload,
  }
}

const settings = (payload) => {
  return {
    type: 'SETTING',
    payload,
  }
}

export { login, logout, setAuth, settings }

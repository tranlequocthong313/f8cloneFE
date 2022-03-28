const login = payload => {
  return {
    type: 'LOGIN',
    payload,
  }
}

const logout = payload => {
  return {
    type: 'SIGN_OUT',
    payload,
  }
}

const setLoading = payload => {
  return {
    type: 'SET_LOADING',
    payload,
  }
}

const setAuth = payload => {
  return {
    type: 'SET_AUTH',
    payload,
  }
}

const createVideo = payload => {
  return {
    type: 'CREATE_VIDEO',
    payload,
  }
}

const createBlog = payload => {
  return {
    type: 'CREATE_BLOG',
    payload,
  }
}

export { login, logout, setLoading, setAuth, createVideo, createBlog }

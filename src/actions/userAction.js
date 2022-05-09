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

const enrollCourse = (payload) => {
  return {
    type: 'ENROLL_COURSE',
    payload,
  }
}

const learnedLesson = (payload) => {
  return {
    type: 'LEARNED_LESSON',
    payload,
  }
}

const settings = (payload) => {
  return {
    type: 'SETTING',
    payload,
  }
}

export { login, logout, setAuth, settings, enrollCourse, learnedLesson }

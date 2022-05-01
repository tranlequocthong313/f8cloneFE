const getCourse = (payload) => {
  return {
    type: 'GET_COURSE',
    payload,
  }
}

const createCourse = (payload) => {
  return {
    type: 'CREATE_COURSE',
    payload,
  }
}

export { getCourse, createCourse }

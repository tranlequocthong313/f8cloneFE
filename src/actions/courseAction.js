const getCourse = payload => {
  return {
    type: 'GET_COURSE',
    payload,
  }
}

export { getCourse }

const createVideo = (payload) => {
  return {
    type: 'CREATE_VIDEO',
    payload,
  }
}

export { createVideo }

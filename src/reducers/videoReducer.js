const initialState = {
  videoCreated: null,
}

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_VIDEO':
      console.log(action.payload.videoData)
      return {
        ...state,
        videoCreated: action.payload.videoData,
      }

    default:
      return state
  }
}

export default videoReducer

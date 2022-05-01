const initialState = {
  blogCreated: null,
}

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_BLOG':
      return {
        ...state,
        blogCreated: action.payload.blogData,
      }

    default:
      return state
  }
}

export default blogReducer

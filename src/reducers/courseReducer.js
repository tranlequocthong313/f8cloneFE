const initialState = {
  courses: [],
  courseCreated: null,
}

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_COURSE':
      return {
        ...state,
        courseCreated: action.payload.courseData,
      }

    default:
      return state
  }
}

export default courseReducer

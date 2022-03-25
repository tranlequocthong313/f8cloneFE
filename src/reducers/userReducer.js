const initialState = {
  userId: null,
  admin: false,
  displayName: null,
  photoURL: null,
  email: null,
  accessToken: null,
  isLoading: false,
  isLoggedIn: false,
  videoCreated: null,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log('Login Successfully!')
      return {
        ...state,
        userId: action.payload._id,
        photoURL: action.payload.photoURL,
        displayName: action.payload.fullName,
        email: action.payload.email,
        isLoggedIn: !!action.payload.accessToken,
        admin: action.payload.admin,
      }

    case 'SIGN_OUT':
      console.log('Sign out Successfully!')
      return {
        ...state,
        photoURL: null,
        displayName: null,
        email: null,
        isLoggedIn: false,
      }

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      }

    case 'SET_AUTH':
      console.log('Is Logging In!')
      return {
        ...state,
        userId: action.payload._id,
        displayName: action.payload.fullName,
        email: action.payload.email,
        photoURL: !action.payload.photoURL ? null : action.payload.photoURL,
        isLoggedIn: !!action.payload.accessToken,
        admin: action.payload.admin,
      }

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

export default userReducer

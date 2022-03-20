const initialState = {
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
        photoURL: action.payload.photoURL,
        displayName: action.payload.displayName || action.payload.fullName,
        email: action.payload.email,
        isLoggedIn: !!action.payload.accessToken || !!action.payload.idToken,
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
        displayName: action.payload.fullName,
        email: action.payload.email,
        isLoggedIn: !!action.payload.accessToken || !!action.payload.idToken,
        admin: action.payload.admin,
      }

    case 'CREATE_VIDEO':
      console.log(action.payload.isSuccess)
      return {
        ...state,
        videoCreated: action.payload.videoData,
      }

    default:
      return state
  }
}

export default userReducer

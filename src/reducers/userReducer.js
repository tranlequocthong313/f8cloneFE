const initialState = {
  userId: null,
  isAdmin: false,
  displayName: null,
  photoURL: null,
  email: null,
  phoneNumber: null,
  accessToken: null,
  isLoading: false,
  isLoggedIn: false,
  videoCreated: null,
  bio: null,
  socials: {
    fb: null,
    youtube: null,
    instagram: null,
    linkedin: null,
    twitter: null,
  },
  blogCreated: {
    isSuccess: false,
    show: false,
  },
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log(action.payload.isAdmin)
      return {
        ...state,
        userId: action.payload._id,
        photoURL: action.payload.photoURL,
        displayName: action.payload.fullName,
        email: action.payload.email,
        phoneNumber: action.payload.phoneNumber
          ? action.payload.phoneNumber
          : '',
        isLoggedIn: !!action.payload.accessToken,
        bio: action.payload.bio ? action.payload.bio : '',
        isAdmin: action.payload.isAdmin,
        socials: action.payload.socials ? action.payload.socials : {},
      }

    case 'SIGN_OUT':
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
      console.log(action.payload.isAdmin)
      return {
        ...state,
        userId: action.payload._id,
        displayName: action.payload.fullName,
        email: action.payload.email,
        photoURL: !action.payload.photoURL ? null : action.payload.photoURL,
        phoneNumber: action.payload.phoneNumber
          ? action.payload.phoneNumber
          : '',
        bio: action.payload.bio ? action.payload.bio : '',
        isLoggedIn: !!action.payload.accessToken,
        isAdmin: action.payload.isAdmin,
        socials: action.payload.socials ? action.payload.socials : {},
      }

    case 'CREATE_VIDEO':
      console.log(action.payload.videoData)
      return {
        ...state,
        videoCreated: action.payload.videoData,
      }

    case 'CREATE_BLOG':
      return {
        ...state,
        blogCreated: action.payload.blogCreated,
      }

    case 'SETTING':
      return {
        ...state,
        bio: action.payload.bio ? action.payload.bio : '',
        displayName: action.payload.fullName ? action.payload.fullName : '',
        photoURL: action.payload.photoURL ? action.payload.photoURL : '',
      }

    default:
      return state
  }
}

export default userReducer

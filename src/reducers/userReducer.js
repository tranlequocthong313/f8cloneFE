const initialState = {
  userId: null,
  isAdmin: false,
  displayName: null,
  photoURL: null,
  email: null,
  phoneNumber: null,
  isLoggedIn: false,
  coursesEnrolled: [],
  bio: null,
  socials: {
    fb: null,
    youtube: null,
    instagram: null,
    linkedin: null,
    twitter: null,
  },
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
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
        slug: action.payload.slug,
        coursesEnrolled: action.payload.coursesEnrolled,
      }

    case 'SIGN_OUT':
      return {
        ...state,
        photoURL: null,
        displayName: null,
        email: null,
        isLoggedIn: null,
      }

    case 'SET_AUTH':
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
        slug: action.payload.slug,
        coursesEnrolled: action.payload.coursesEnrolled,
      }

    case 'ENROLL_COURSE':
      return {
        ...state,
        coursesEnrolled: action.payload.coursesEnrolled,
      }

    case 'SETTING':
      return {
        ...state,
        displayName: action.payload.fullName,
        photoURL: action.payload.photoURL,
      }

    default:
      return state
  }
}

export default userReducer

const initialState = {
    userId: null,
    isAdmin: false,
    displayName: null,
    photoURL: null,
    email: null,
    slug: null,
    phoneNumber: null,
    isLoading: false,
    isLoggedIn: false,
    videoCreated: null,
    blogCreated: null,
    bio: null,
    socials: {
        fb: null,
        youtube: null,
        instagram: null,
        linkedin: null,
        twitter: null,
    },
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                ...action.payload,
                userId: action.payload._id,
                photoURL: action.payload.photoURL,
                displayName: action.payload.fullName,
                email: action.payload.email,
                phoneNumber: action.payload.phoneNumber
                    ? action.payload.phoneNumber
                    : '',
                isLoggedIn: !!action.payload.accessToken,
                bio: action.payload.bio ? action.payload.bio : '',
                isAdmin:
                    action.payload?.email == 'tranlequocthong313@gmail.com'
                        ? true
                        : action.payload.isAdmin, // NOTE: for demo purpose
                socials: action.payload.socials ? action.payload.socials : {},
                slug: action.payload.slug,
            };

        case 'SIGN_OUT':
            return {
                ...state,
                photoURL: null,
                displayName: null,
                email: null,
                isLoggedIn: false,
            };

        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload,
            };

        case 'SET_AUTH':
            return {
                ...state,
                ...action.payload,
                userId: action.payload._id,
                displayName: action.payload.fullName,
                email: action.payload.email,
                photoURL: !action.payload.photoURL
                    ? null
                    : action.payload.photoURL,
                phoneNumber: action.payload.phoneNumber
                    ? action.payload.phoneNumber
                    : '',
                bio: action.payload.bio ? action.payload.bio : '',
                isLoggedIn: !!action.payload.accessToken,
                isAdmin:
                    action.payload?.email == 'tranlequocthong313@gmail.com'
                        ? true
                        : action.payload.isAdmin, // NOTE: for demo purpose
                socials: action.payload.socials ? action.payload.socials : {},
                slug: action.payload.slug,
            };

        case 'CREATE_VIDEO':
            console.log(action.payload.videoData);
            return {
                ...state,
                videoCreated: action.payload.videoData,
            };

        case 'CREATE_BLOG':
            return {
                ...state,
                blogCreated: action.payload.blogData,
            };

        case 'CREATE_COURSE':
            return {
                ...state,
                courseCreated: action.payload.courseData,
            };

        case 'SETTING':
            return {
                ...state,
                bio: action.payload.bio ? action.payload.bio : '',
                displayName: action.payload.fullName
                    ? action.payload.fullName
                    : '',
                photoURL: action.payload.photoURL
                    ? action.payload.photoURL
                    : '',
            };

        case 'ENROLL_COURSE': 
            return {
                ...state,
                coursesEnrolled: [...state.coursesEnrolled, action.payload]
            }

        default:
            return state;
    }
};

export default userReducer;

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'f8clone-5e065.firebaseapp.com',
  projectId: 'f8clone-5e065',
  storageBucket: 'f8clone-5e065.appspot.com',
  messagingSenderId: '147367932828',
  appId: '1:147367932828:web:657639229cdfc8d8d38e59',
}

initializeApp(firebaseConfig)
export const googleProvider = new GoogleAuthProvider()
export const facebookProvider = new FacebookAuthProvider()
export const auth = getAuth()
export const githubProvider = new GithubAuthProvider()

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'f8clone-3e404.firebaseapp.com',
  projectId: 'f8clone-3e404',
  storageBucket: 'f8clone-3e404.appspot.com',
  messagingSenderId: '774351622161',
  appId: '1:774351622161:web:2af08cf7e2cfd7b67821b0',
}

initializeApp(firebaseConfig)
export const googleProvider = new GoogleAuthProvider()
export const facebookProvider = new FacebookAuthProvider()
export const auth = getAuth()
export const githubProvider = new GithubAuthProvider()

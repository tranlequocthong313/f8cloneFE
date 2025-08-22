import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyArBBj3Kaj6v08oGXyrcBqLwqv1HkH6NvU",
  authDomain: "f8clone-bbecf.firebaseapp.com",
  projectId: "f8clone-bbecf",
  storageBucket: "f8clone-bbecf.firebasestorage.app",
  messagingSenderId: "433391358630",
  appId: "1:433391358630:web:f4d21841ed6db53eef5a67"
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: 'f8clone-3e404.firebaseapp.com',
  // projectId: 'f8clone-3e404',
  // storageBucket: 'f8clone-3e404.appspot.com',
  // messagingSenderId: '774351622161',
  // appId: '1:774351622161:web:2af08cf7e2cfd7b67821b0',
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
export const googleProvider = new GoogleAuthProvider()
export const facebookProvider = new FacebookAuthProvider()
export const auth = getAuth()
export const githubProvider = new GithubAuthProvider()

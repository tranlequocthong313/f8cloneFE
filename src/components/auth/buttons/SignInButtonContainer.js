import React from 'react'
import SigninButton from './SigninButton'
import {
  googleProvider,
  facebookProvider,
  githubProvider,
} from '../../../firebase/config'

const SignInButtonContainer = ({
  switchPhoneAndEmailHandler,
  loginWithProviderHandler,
}) => {
  return (
    <>
      <SigninButton
        image={
          'https://accounts.fullstack.edu.vn/assets/images/signin/personal-18px.svg'
        }
        text={'Sử dụng email / số điện thoại'}
        onClick={() => switchPhoneAndEmailHandler('phone')}
      />
      <SigninButton
        image={
          'https://accounts.fullstack.edu.vn/assets/images/signin/google-18px.svg'
        }
        text={'Tiếp tục với Google'}
        onClick={() => loginWithProviderHandler(googleProvider)}
      />
      <SigninButton
        image={
          'https://accounts.fullstack.edu.vn/assets/images/signin/facebook-18px.svg'
        }
        text={'Tiếp tục với Facebook'}
        onClick={() => loginWithProviderHandler(facebookProvider)}
      />
      <SigninButton
        image={
          'https://accounts.fullstack.edu.vn/assets/images/signin/github-18px.svg'
        }
        text={'Tiếp tục với Github'}
        onClick={() => loginWithProviderHandler(githubProvider)}
      />
    </>
  )
}

export default SignInButtonContainer

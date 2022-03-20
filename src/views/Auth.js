import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import styles from './Auth.module.scss'
import f8Logo from '../asset/f8_icon.png'
import { signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase/config'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AuthWithPhoneNumberForm from '../components/authpage/forms/AuthWithPhoneNumberForm'
import AuthWithEmailAndPasswordForm from '../components/authpage/forms/AuthWithEmailAndPasswordForm'
import { login } from '../actions/userAction'
import SignInButtonContainer from '../components/authpage/buttons/SignInButtonContainer'
import NotFound from './NotFound'
import { apiURL } from '../context/constants'

const Auth = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isLogin, setIsLogin] = useState(true)
  const [loginOption, setLoginOption] = useState('')

  const [forgotPassword, setForgotPassword] = useState(false)

  // Dispatch login action and navigate user to home page after login
  const dispatchAndNavigateHandler = payload => {
    dispatch(login(payload))
    navigate('/')
  }

  // Handle switch between sign in and sign up option from user
  const isLoginHandler = () => setIsLogin(prev => !prev)

  // Google, Facebook, Github authentication
  const loginWithProviderHandler = async provider => {
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      dispatchAndNavigateHandler(user)

      await fetch(`${apiURL}/register`, {
        method: 'POST',
        body: JSON.stringify({
          userId: user.uid,
          fullName: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          activated: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  // Handle switch "Phone and Email authentication option"
  const switchPhoneAndEmailHandler = option => {
    setLoginOption(option)
  }

  // Show authentication buttons or not when click to "Phone and Email Authentication Option"
  let isShowAuthProviderOption
  if (loginOption === '') {
    isShowAuthProviderOption = true
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            {!isShowAuthProviderOption && (
              <Link
                to="/login"
                onClick={() => {
                  forgotPassword
                    ? setForgotPassword(false)
                    : switchPhoneAndEmailHandler('')
                }}
                className={styles.backButton}
              >
                <i className="bi bi-chevron-left"></i>
              </Link>
            )}
            <Link to="/">
              <Image src={f8Logo} />
            </Link>
            {!forgotPassword && (
              <h1>{isLogin ? 'Đăng nhập vào' : 'Đăng ký tài khoản'} F8</h1>
            )}
            {forgotPassword && <h1>Lấy lại mật khẩu</h1>}
          </div>
          <div className={styles.body}>
            {isShowAuthProviderOption && (
              <SignInButtonContainer
                switchPhoneAndEmailHandler={switchPhoneAndEmailHandler}
                loginWithProviderHandler={loginWithProviderHandler}
              />
            )}
            {loginOption === 'phone' && (
              <AuthWithPhoneNumberForm
                dispatchAndNavigateHandler={dispatchAndNavigateHandler}
                switchPhoneAndEmailHandler={switchPhoneAndEmailHandler}
                isLogin={isLogin}
              />
            )}
            {loginOption === 'email' && (
              <AuthWithEmailAndPasswordForm
                loginOption={loginOption}
                switchPhoneAndEmailHandler={switchPhoneAndEmailHandler}
                isLogin={isLogin}
                isLoginHandler={isLoginHandler}
                forgotPassword={forgotPassword}
                setForgotPassword={setForgotPassword}
                dispatchAndNavigateHandler={dispatchAndNavigateHandler}
              />
            )}
            {!forgotPassword && (
              <div className={styles.noAccount}>
                <p>
                  {isLogin && (
                    <>
                      Bạn chưa có tài khoản?{' '}
                      <Link to="/register" onClick={isLoginHandler}>
                        Đăng ký
                      </Link>
                    </>
                  )}
                  {!isLogin && (
                    <>
                      Bạn đã có tài khoản?{' '}
                      <Link to="/login" onClick={isLoginHandler}>
                        Đăng nhập
                      </Link>
                    </>
                  )}
                </p>
              </div>
            )}
            {loginOption === 'email' && isLogin && !forgotPassword && (
              <p
                className={styles.forgotPassword}
                onClick={() => setForgotPassword(true)}
              >
                Quên mật khẩu?
              </p>
            )}
          </div>
        </div>
        <div className={styles.about}>
          <Link to="about-us">Giới thiệu về F8</Link>
          <span>|</span>
          <Link to="about-us">F8 trên Youtube</Link>
          <span>|</span>
          <Link to="about-us">F8 trên Facebook</Link>
        </div>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  )
}

export default Auth

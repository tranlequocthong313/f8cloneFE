import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import styles from './Auth.module.scss'
import f8Logo from '../../asset/images/f8_icon.png'
import { signInWithPopup } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AuthWithPhoneNumberForm from '../../components/auth/forms/AuthWithPhoneNumberForm'
import AuthWithEmailAndPasswordForm from '../../components/auth/forms/AuthWithEmailAndPasswordForm'
import { login } from '../../actions/userAction'
import SignInButtonContainer from '../../components/auth/buttons/SignInButtonContainer'
import { apiURL } from '../../context/constants'
import Cookies from 'js-cookie'

const Auth = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isLogin, setIsLogin] = useState(true)
  const [loginOption, setLoginOption] = useState('')
  const [forgotPassword, setForgotPassword] = useState(false)
  const [inValid, setInValid] = useState(false)
  const [isShowAuthProviderOption, setIsShowAuthProviderOption] = useState(true)

  useEffect(
    () => loginOption === '' && setIsShowAuthProviderOption(true),
    [loginOption]
  )

  const dispatchAndNavigate = (payload) => {
    dispatch(login(payload))
    navigate('/')
  }

  const handleIsLogin = () => {
    setIsLogin((prev) => !prev)
    setLoginOption('')
  }

  const loginWithProvider = async (provider) => {
    const res = await signInWithPopup(auth, provider)
    const user = res.user

    const userData = loginIfEmailExist(user.email)

    if (userData) {
      Cookies.set('token', userData.accessToken, { expires: 365 })
      dispatchAndNavigate({
        ...userData.userCreated,
        accessToken: userData.accessToken,
      })
      return
    }

    const url = `${apiURL}/login/provider`
    const data = await registerNewAccount(url, {
      fullName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      provider: user.providerData[0].providerId,
      activated: true,
    })

    Cookies.set('token', data.accessToken, { expires: 365 })
    dispatchAndNavigate({
      ...data.user,
      accessToken: data.accessToken,
    })
  }

  const loginIfEmailExist = async (email) => {
    const url = `${apiURL}/login/provider`
    const data = await postCheckEmail(url, email)
    return data
  }

  const postCheckEmail = async (url, email) => {
    try {
      return (
        await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            email,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      ).json()
    } catch (error) {
      console.log(error.message)
    }
  }

  const registerNewAccount = async (url, data) => {
    try {
      return (
        await fetch(url, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      ).json()
    } catch (error) {
      console.log(error.message)
      if (error.code === 'auth/account-exists-with-different-credential')
        setInValid(true)
    }
  }

  const switchPhoneAndEmail = (option) => setLoginOption(option)

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
                    : switchPhoneAndEmail('')
                }}
                className={styles.backButton}
              >
                <i className="fa-solid fa-chevron-left"></i>
              </Link>
            )}
            <Link to="/">
              <Image src={f8Logo} />
            </Link>
            {!forgotPassword && (
              <h3>{isLogin ? 'Đăng nhập vào' : 'Đăng ký tài khoản'} F8</h3>
            )}
            {forgotPassword && <h3>Lấy lại mật khẩu</h3>}
          </div>
          <div className={styles.body}>
            {isShowAuthProviderOption && (
              <SignInButtonContainer
                switchPhoneAndEmail={switchPhoneAndEmail}
                loginWithProvider={loginWithProvider}
              />
            )}
            {loginOption === 'phone' && (
              <AuthWithPhoneNumberForm
                dispatchAndNavigate={dispatchAndNavigate}
                switchPhoneAndEmail={switchPhoneAndEmail}
                isLogin={isLogin}
              />
            )}
            {loginOption === 'email' && (
              <AuthWithEmailAndPasswordForm
                loginOption={loginOption}
                switchPhoneAndEmail={switchPhoneAndEmail}
                isLogin={isLogin}
                handleIsLogin={handleIsLogin}
                forgotPassword={forgotPassword}
                setForgotPassword={setForgotPassword}
                dispatchAndNavigate={dispatchAndNavigate}
              />
            )}
            {inValid && isShowAuthProviderOption && (
              <p className={styles.validate}>
                Email đã được sử dụng bởi một phương thức đăng nhập khác.
              </p>
            )}
            {!forgotPassword && (
              <div className={styles.noAccount}>
                <p>
                  {isLogin && (
                    <>
                      Bạn chưa có tài khoản?{' '}
                      <Link to="/register" onClick={handleIsLogin}>
                        Đăng ký
                      </Link>
                    </>
                  )}
                  {!isLogin && (
                    <>
                      Bạn đã có tài khoản?{' '}
                      <Link to="/login" onClick={handleIsLogin}>
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

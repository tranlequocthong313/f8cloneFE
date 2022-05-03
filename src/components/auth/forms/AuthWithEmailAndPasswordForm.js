import React, { useState, useEffect } from 'react'
import FormGroup from '../../utils/auth-form/FormGroup'
import { Form, Spinner } from 'react-bootstrap'
import styles from './AuthWithEmailAndPasswordForm.module.scss'
import Cookies from 'js-cookie'
import { apiURL } from '../../../context/constants'
import AuthForgetPassword from './AuthForgetPassword'
import consoleLog from '../../utils/console-log/consoleLog'

const LoginWithEmailAndPasswordForm = ({
  switchPhoneAndEmail,
  handleIsLogin,
  isLogin,
  forgotPassword,
  setForgotPassword,
  dispatchAndHistory,
}) => {
  const LIMITED_SECOND_FOR_SIGNUP = 120
  const LIMITED_SECOND_FOR_FORGET_PWD = 60

  const [fullName, setFullName] = useState('')
  const [isSendVerifyCode, setIsSentVerifyCode] = useState(false)
  const [counter, setCounter] = useState(LIMITED_SECOND_FOR_SIGNUP)
  const [validateFullName, setValidateFullName] = useState(null)
  const [validateEmail, setValidateEmail] = useState(null)
  const [invalidEmailOrPassword, setInvalidEmailOrPassword] = useState(null)
  const [invalidOTP, setInvalidOTP] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [verifyOTP, setVerifyOTP] = useState({
    input: '',
    create: '',
  })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => setCounter(LIMITED_SECOND_FOR_FORGET_PWD), [forgotPassword])

  const createOTP = () => {
    const digits = '0123456789'
    let OTP = ''

    for (let i = 0; i < 6; i++) OTP += digits[Math.floor(Math.random() * 10)]

    setVerifyOTP((prev) => {
      return {
        ...prev,
        create: OTP,
      }
    })

    return OTP
  }

  const onSubmitOTP = (option) => {
    sendOTPCode(option)
    setIsSentVerifyCode(true)
    counterWhenSubmit()
  }

  const counterWhenSubmit = () => {
    let interval = setInterval(() => {
      setCounter((prev) => {
        if (prev > 0) return prev - 1

        clearInterval(interval)
        setIsSentVerifyCode(false)
        return forgotPassword
          ? LIMITED_SECOND_FOR_FORGET_PWD
          : LIMITED_SECOND_FOR_SIGNUP
      })
    }, 1000)
  }

  const sendOTPCode = async (option) => {
    const url = `${apiURL}/register/verify`
    if (option) await postOTP(url, option)
  }

  const postOTP = async (url, option) => {
    try {
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email,
          otp: createOTP(),
          option,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      consoleLog(error.message)
    }
  }

  const loginWithEmailAndPassword = async () => {
    setLoading(true)

    if (isLogin) {
      let url = `${apiURL}/login/email-password`
      const data = await postLogin(url)
      if (!data.success) return setInvalidEmailOrPassword(data.message)

      Cookies.set('token', data.accessToken, { expires: 365 })
      dispatchAndHistory({
        ...data.user,
        accessToken: data.accessToken,
        admin: data.admin,
      })
    } else {
      const validOTP = verifyOTP.input === verifyOTP.create
      if (!validOTP) return setInvalidOTP('Mã xác minh không hợp lệ')

      const userDefaultAvatar =
        'https://firebasestorage.googleapis.com/v0/b/f8clone-3e404.appspot.com/o/uploads%2Fnobody_m.256x256.jpg?alt=media&token=8e617e21-795f-45ce-8340-955a5290e66f'

      let url = `${apiURL}/register/`
      await postRegister(url, userDefaultAvatar)

      setEmail('')
      setPassword('')
      setLoading(false)
      handleIsLogin()
    }
  }

  const postLogin = async (url) => {
    try {
      return (
        await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      ).json()
    } catch (error) {
      consoleLog(error.message)
    }
  }

  const postRegister = async (url, photoURL) => {
    try {
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          fullName,
          photoURL,
          email,
          password,
          activated: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      consoleLog(error.message)
    }
  }

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email)

  const checkUserEmailExist = async (e) => {
    setEmail(e.target.value)

    const length = e.target.value.trim().length
    if (length === 0) return setValidateEmail(null)

    if (isValidEmail(e.target.value)) {
      const url = `${apiURL}/login/check-email`
      const data = await postCheckEmail(url, e.target.value)

      isLogin
        ? setValidateEmail(data.notUsed ? data.notUsed : null)
        : setValidateEmail(data.used ? data.used : null)
    }
  }

  const postCheckEmail = async (url, email) => {
    try {
      return (
        await fetch(url, {
          method: 'POST',
          body: JSON.stringify({ email }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      ).json()
    } catch (error) {
      consoleLog(error.message)
    }
  }

  const handleValidateFullName = () => {
    const isEmptyFullNameInput = fullName.length === 0
    const isValidFullNameInput =
      fullName.length > 1 ||
      fullName.match('[a-zA-Z][a-zA-Z ]{2,}') ||
      fullName.trim().indexOf(' ') !== -1

    if (isEmptyFullNameInput) {
      setValidateFullName('Tên không được để trống')
    } else if (!isValidFullNameInput) {
      setValidateFullName('Tên của bạn không hợp lệ')
    } else {
      setValidateFullName(null)
    }
  }

  useEffect(() => {
    const requirementsForm = () =>
      !isLogin
        ? fullName.trim().indexOf(' ') === -1 ||
          validateFullName !== null ||
          validateEmail !== null ||
          password.length < 8
        : validateEmail !== null || password.length < 8

    setDisabled(requirementsForm())
  }, [
    fullName,
    isLogin,
    validateFullName,
    email,
    password.length,
    validateEmail,
  ])

  useEffect(() => {
    const isEmptyPasswordInput = password.length === 0
    const isEmptyOTPInput = verifyOTP.input.length === 0

    isEmptyPasswordInput && setInvalidEmailOrPassword(null)
    isEmptyOTPInput && setInvalidOTP(null)
  }, [password.length, verifyOTP.input.length])

  return (
    <>
      {!forgotPassword && (
        <Form className={styles.formBody}>
          {!isLogin && (
            <FormGroup
              label={'Tên của bạn?'}
              placeholder={'Họ và tên của bạn'}
              maxLength={50}
              pattern={'[a-zA-Z][a-zA-Z ]{2,}'}
              onChange={{
                input: (e) => {
                  setFullName(e.target.value)
                  setValidateFullName(null)
                },
              }}
              onBlur={handleValidateFullName}
              inValid={validateFullName}
            />
          )}
          <FormGroup
            label={'Email'}
            labelRight={'SĐT'}
            type={'email'}
            isLogin={isLogin}
            placeholder={'Địa chỉ email'}
            onClick={() => switchPhoneAndEmail('phone')}
            onChange={{
              input: checkUserEmailExist,
            }}
            maxLength={50}
            inValid={validateEmail}
          />
          <FormGroup
            type={'password'}
            placeholder={'Mật khẩu'}
            isLoginEmailOption={'email'}
            value={password}
            onChange={{
              input: (e) => {
                setInvalidEmailOrPassword(null)
                setPassword(e.target.value)
              },
            }}
            onKeyUp={(e) =>
              e.keyCode === 13 &&
              validateEmail === null &&
              password.length >= 8 &&
              loginWithEmailAndPassword()
            }
            inValid={invalidEmailOrPassword}
          />
          {!isLogin && (
            <FormGroup
              placeholder={'Nhập mã xác nhận'}
              maxLength={6}
              OTPInput={true}
              isSendVerifyCode={isSendVerifyCode}
              counter={counter}
              onChange={{
                input: (e) =>
                  setVerifyOTP((prev) => {
                    return {
                      ...prev,
                      input: e.target.value,
                    }
                  }),
              }}
              disabled={disabled}
              onClick={() => onSubmitOTP('signUp')}
              onKeyUp={(e) =>
                e.keyCode === 13 &&
                verifyOTP.input.length === 6 &&
                loginWithEmailAndPassword()
              }
              inputDisabled={!isSendVerifyCode}
              inValid={invalidOTP}
            />
          )}

          {!isLogin && (
            <div
              className={
                verifyOTP.input.length === 6
                  ? styles.logInButton
                  : `${styles.logInButton} ${styles.disabled}`
              }
              onClick={loginWithEmailAndPassword}
            >
              <span>Đăng ký</span>
            </div>
          )}
          {isLogin && (
            <div
              className={
                validateEmail === null && password.length >= 8 && !loading
                  ? styles.logInButton
                  : `${styles.logInButton} ${styles.disabled}`
              }
              onClick={loginWithEmailAndPassword}
            >
              {loading && (
                <Spinner
                  animation="border"
                  style={{ width: 24, height: 24, color: '#fff' }}
                />
              )}
              {!loading && <span>Đăng nhập</span>}
            </div>
          )}
        </Form>
      )}
      {forgotPassword && (
        <AuthForgetPassword
          setForgotPassword={setForgotPassword}
          checkUserEmailExist={checkUserEmailExist}
          counter={counter}
          validateEmail={validateEmail}
          email={email}
          verifyOTP={verifyOTP}
          invalidOTP={invalidOTP}
          setInvalidOTP={setInvalidOTP}
          isSendVerifyCode={isSendVerifyCode}
          disabled={disabled}
          setDisabled={setDisabled}
          loading={loading}
          setLoading={setLoading}
          setVerifyOTP={setVerifyOTP}
          onSubmitOTP={onSubmitOTP}
        />
      )}
    </>
  )
}

export default LoginWithEmailAndPasswordForm

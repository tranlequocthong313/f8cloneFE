import React, { useState } from 'react'
import FormGroup from '../../utils/auth-form/FormGroup'
import { Form } from 'react-bootstrap'
import styles from './AuthWithEmailAndPasswordForm.module.scss'
import * as EmailValidator from 'email-validator'
import Cookies from 'js-cookie'
import { apiURL } from '../../../context/constants'

const LoginWithEmailAndPasswordForm = ({
  switchPhoneAndEmailHandler,
  authEmailAndPasswordHandler,
  isLogin,
  isLoginHandler,
  forgotPassword,
  setForgotPassword,
  dispatchAndNavigateHandler,
}) => {
  // Website F8 uses 120s for the resend button
  const LIMITED_SECOND = 120

  const [fullName, setUsername] = useState('')
  const [isSendVerifyCode, setIsSentVerifyCode] = useState(false)
  const [counter, setCounter] = useState(LIMITED_SECOND)
  const [verifyOTP, setVerifyOTP] = useState({
    input: '',
    create: '',
  })
  const [userEmailAndPasswordInput, setUserEmailAndPasswordInput] = useState({
    email: '',
    password: '',
  })
  const [existEmail, setExistEmail] = useState(false)
  const [isValidOTP, setIsValidOTP] = useState(false)
  const [password, setPassword] = useState({
    pass: '',
    rePass: '',
  })

  const createOTPHandler = () => {
    var digits = '0123456789'
    let OTP = ''
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)]
    }
    setVerifyOTP((prev) => {
      return {
        ...prev,
        create: OTP,
      }
    })
    return OTP
  }

  const sendOTPHandler = async (option) => {
    await fetch(`${apiURL}/register/verify`, {
      method: 'POST',
      body: JSON.stringify({
        email: userEmailAndPasswordInput.email,
        otp: createOTPHandler(),
        option,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  // Call send verify code function to user's phone and set re-send button count back 60s for re-sending
  const onSubmitHandler = (option) => {
    sendOTPHandler(option)
    setIsSentVerifyCode(true)
    counterHandler()
  }

  const counterHandler = () => {
    setInterval(() => {
      setCounter((prev) => (prev > 0 ? prev - 1 : setIsSentVerifyCode(false)))
    }, 1000)
  }

  // Sign up or Sign in with email and password
  const loginWithEmailAndPasswordHandler = async () => {
    try {
      if (isLogin) {
        const res = await fetch(`${apiURL}/login/email-password`, {
          method: 'POST',
          body: JSON.stringify({
            email: userEmailAndPasswordInput.email,
            password: userEmailAndPasswordInput.password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const data = await res.json()
        Cookies.set('token', data.accessToken, { expires: 365 })
        return dispatchAndNavigateHandler({
          ...data.user,
          accessToken: data.accessToken,
          admin: data.admin,
        })
      }

      if (verifyOTP.input !== verifyOTP.create) return

      await fetch(`${apiURL}/register/`, {
        method: 'POST',
        body: JSON.stringify({
          fullName,
          email: userEmailAndPasswordInput.email,
          password: userEmailAndPasswordInput.password,
          activated: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.log(error)
    } finally {
      setUserEmailAndPasswordInput((prev) => {
        return {
          ...prev,
          email: '',
          password: '',
        }
      })

      isLoginHandler()
    }
  }

  const checkUserEmailExistHandler = async (e) => {
    if (e.target.value && EmailValidator.validate(e.target.value)) {
      const res = await fetch(`${apiURL}/login/check-email`, {
        method: 'POST',
        body: JSON.stringify({ email: e.target.value }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await res.json()
      data.success ? setExistEmail(true) : setExistEmail(false)
      setUserEmailAndPasswordInput((prev) => {
        return { ...prev, email: e.target.value }
      })
    }
  }

  const forgotPasswordHandler = async () => {
    if (!isValidOTP && verifyOTP.input !== verifyOTP.create)
      return console.log('OTP is not right!')

    try {
      setIsValidOTP(true)

      const res = await fetch(`${apiURL}/login/reset-password`, {
        method: 'POST',
        body: JSON.stringify({
          email: userEmailAndPasswordInput.email,
          password: password.pass,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      setForgotPassword(false)
      console.log(data.message)
    } catch (error) {
      console.log(error)
    }
  }

  const checkValidSignUpForm = () => {
    return fullName.match('[a-zA-Z][a-zA-Z ]{2,}') &&
      EmailValidator.validate(userEmailAndPasswordInput.email) &&
      userEmailAndPasswordInput.password.trim().length >= 6
      ? true
      : false
  }

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
              onChange={{ input: (e) => setUsername(e.target.value) }}
            />
          )}
          <FormGroup
            label={'Email'}
            labelRight={'SĐT'}
            type={'email'}
            isLogin={isLogin}
            placeholder={'Địa chỉ email'}
            onClick={() => switchPhoneAndEmailHandler('phone')}
            value={userEmailAndPasswordInput.email}
            onChange={{
              input: (e) =>
                setUserEmailAndPasswordInput((prev) => {
                  return { ...prev, email: e.target.value }
                }),
            }}
          />
          <FormGroup
            type={'password'}
            placeholder={'Mật khẩu'}
            isLoginEmailOption={'email'}
            value={userEmailAndPasswordInput.password}
            onChange={{
              input: (e) =>
                setUserEmailAndPasswordInput((prev) => {
                  return { ...prev, password: e.target.value }
                }),
            }}
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
              disabled={!checkValidSignUpForm()}
              onClick={
                checkValidSignUpForm() ? () => onSubmitHandler('signUp') : null
              }
            />
          )}
          {!isLogin && (
            <div
              className={
                verifyOTP.input.length === 6
                  ? styles.logInButton
                  : `${styles.logInButton} ${styles.disabled}`
              }
              onClick={loginWithEmailAndPasswordHandler}
            >
              <span>Đăng ký</span>
            </div>
          )}
          {isLogin && (
            <div
              className={
                EmailValidator.validate(userEmailAndPasswordInput.email) &&
                userEmailAndPasswordInput.password.trim().length >= 6
                  ? styles.logInButton
                  : `${styles.logInButton} ${styles.disabled}`
              }
              onClick={loginWithEmailAndPasswordHandler}
            >
              <span>Đăng nhập</span>
            </div>
          )}
        </Form>
      )}
      {forgotPassword && (
        <Form className={styles.formBody}>
          {!isValidOTP && (
            <>
              <FormGroup
                label={'Email'}
                type={'email'}
                isLogin={isLogin}
                placeholder={'Nhập địa chỉ email'}
                onClick={() => switchPhoneAndEmailHandler('phone')}
                onChange={{
                  input: checkUserEmailExistHandler,
                }}
              />
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
                disabled={!existEmail || isSendVerifyCode}
                onClick={
                  existEmail && !isSendVerifyCode
                    ? () => onSubmitHandler('forgotPwd')
                    : null
                }
              />
            </>
          )}
          {isValidOTP && (
            <>
              <FormGroup
                label={'Nhập mật khẩu mới'}
                type={'password'}
                placeholder={'Mật khẩu'}
                onChange={{
                  input: (e) =>
                    setPassword((prev) => {
                      return {
                        ...prev,
                        pass: e.target.value,
                      }
                    }),
                }}
              />
              <FormGroup
                label={'Nhập lại mật khẩu mới'}
                placeholder={'Xác nhận mật khẩu'}
                type={'password'}
                onChange={{
                  input: (e) =>
                    setPassword((prev) => {
                      return {
                        ...prev,
                        rePass: e.target.value,
                      }
                    }),
                }}
              />
            </>
          )}
          {!isValidOTP && (
            <div
              className={
                verifyOTP.input.length === 6
                  ? styles.logInButton
                  : `${styles.logInButton} ${styles.disabled}`
              }
              onClick={forgotPasswordHandler}
            >
              <span>Xác nhận</span>
            </div>
          )}
          {isValidOTP && (
            <div
              className={
                password.pass === password.rePass
                  ? styles.logInButton
                  : `${styles.logInButton} ${styles.disabled}`
              }
              onClick={
                password.pass === password.rePass ? forgotPasswordHandler : null
              }
            >
              <span>Xác nhận</span>
            </div>
          )}
        </Form>
      )}
    </>
  )
}

export default LoginWithEmailAndPasswordForm

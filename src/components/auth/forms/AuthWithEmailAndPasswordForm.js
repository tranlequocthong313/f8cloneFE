import React, { useState, useEffect } from 'react'
import FormGroup from '../../utils/auth-form/FormGroup'
import { Form } from 'react-bootstrap'
import styles from './AuthWithEmailAndPasswordForm.module.scss'
import Cookies from 'js-cookie'
import { apiURL } from '../../../context/constants'
import AuthForgetPassword from './AuthForgetPassword'

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

  const [fullName, setFullName] = useState('')
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
  const [validateFullName, setValidateFullName] = useState(null)
  const [validateEmail, setValidateEmail] = useState(null)
  const [invalidEmailOrPassword, setInvalidEmailOrPassword] = useState(null)
  const [invalidOTP, setInvalidOTP] = useState(null)
  const [disabled, setDisabled] = useState(true)

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

        console.log(data)

        if (data.success) {
          Cookies.set('token', data.accessToken, { expires: 365 })
          return dispatchAndNavigateHandler({
            ...data.user,
            accessToken: data.accessToken,
            admin: data.admin,
          })
        }

        return !data.success && setInvalidEmailOrPassword(data.message)
      }

      if (verifyOTP.input !== verifyOTP.create)
        return setInvalidOTP('Mã xác minh không hợp lệ')

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

      setUserEmailAndPasswordInput((prev) => {
        return {
          ...prev,
          email: '',
          password: '',
        }
      })

      isLoginHandler()
    } catch (error) {
      console.log(error)
    }
  }

  const isValidEmailHandler = (email) => {
    const regex = /\S+@\S+\.\S+/
    return regex.test(email)
  }

  const checkUserEmailExistHandler = async (e) => {
    if (e.target.value && isValidEmailHandler(e.target.value)) {
      const res = await fetch(`${apiURL}/login/check-email`, {
        method: 'POST',
        body: JSON.stringify({ email: e.target.value }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await res.json()

      !isLogin &&
        data.notUsed &&
        setUserEmailAndPasswordInput((prev) => {
          return { ...prev, email: e.target.value }
        })
      isLogin &&
        data.used &&
        setUserEmailAndPasswordInput((prev) => {
          return { ...prev, email: e.target.value }
        })

      isLogin
        ? setValidateEmail(data.notUsed ? data.notUsed : null)
        : setValidateEmail(data.used ? data.used : null)
    }

    e.target.value.length === 0 && setValidateEmail(null)
  }

  const validateFullNameHandler = () => {
    if (fullName.length === 0) {
      setValidateFullName('Tên không được để trống')
    } else if (fullName.length === 1) {
      setValidateFullName('Tên của bạn không hợp lệ')
    } else {
      setValidateFullName(null)
    }
  }

  useEffect(() => {
    const disableHandler = () => {
      if (!isLogin) {
        return (
          fullName.trim().indexOf(' ') === -1 ||
          validateFullName !== null ||
          !isValidEmailHandler(userEmailAndPasswordInput.email) ||
          userEmailAndPasswordInput.password.length < 8 ||
          validateEmail !== null
        )
      }
      return (
        !isValidEmailHandler(userEmailAndPasswordInput.email) ||
        validateEmail !== null
      )
    }

    setDisabled(disableHandler())
  }, [
    fullName,
    isLogin,
    validateFullName,
    userEmailAndPasswordInput.email,
    userEmailAndPasswordInput.password.length,
    validateEmail,
  ])

  useEffect(() => {
    userEmailAndPasswordInput.password.length === 0 &&
      setInvalidEmailOrPassword(null)

    verifyOTP.input.length === 0 && setInvalidOTP(null)
  }, [userEmailAndPasswordInput.password.length, verifyOTP.input.length])

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
              onBlur={() => validateFullNameHandler()}
              inValid={validateFullName}
            />
          )}
          <FormGroup
            label={'Email'}
            labelRight={'SĐT'}
            type={'email'}
            isLogin={isLogin}
            placeholder={'Địa chỉ email'}
            onClick={() => switchPhoneAndEmailHandler('phone')}
            onChange={{
              input: checkUserEmailExistHandler,
            }}
            maxLength={50}
            inValid={validateEmail}
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
            onKeyUp={(e) =>
              e.keyCode === 13 &&
              validateEmail === null &&
              userEmailAndPasswordInput.password.length >= 8 &&
              loginWithEmailAndPasswordHandler()
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
              onClick={() => onSubmitHandler('signUp')}
              onKeyUp={(e) =>
                e.keyCode === 13 &&
                verifyOTP.input.length === 6 &&
                loginWithEmailAndPasswordHandler()
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
              onClick={loginWithEmailAndPasswordHandler}
            >
              <span>Đăng ký</span>
            </div>
          )}
          {isLogin && (
            <div
              className={
                validateEmail === null &&
                userEmailAndPasswordInput.password.length >= 8
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
        <AuthForgetPassword
          setForgotPassword={setForgotPassword}
          checkUserEmailExistHandler={checkUserEmailExistHandler}
          counter={counter}
          validateEmail={validateEmail}
          email={userEmailAndPasswordInput.email}
          isValidEmailHandler={isValidEmailHandler}
          verifyOTP={verifyOTP}
          invalidOTP={invalidOTP}
          setInvalidOTP={setInvalidOTP}
          isSendVerifyCode={isSendVerifyCode}
          disabled={disabled}
          setDisabled={setDisabled}
          setVerifyOTP={(e) =>
            setVerifyOTP((prev) => {
              return {
                ...prev,
                input: e.target.value,
              }
            })
          }
          setUserEmailAndPasswordInput={() =>
            setUserEmailAndPasswordInput((prev) => {
              return {
                ...prev,
                email: userEmailAndPasswordInput.email,
              }
            })
          }
          onSubmitHandler={() => onSubmitHandler('forgotPwd')}
        />
      )}
    </>
  )
}

export default LoginWithEmailAndPasswordForm

import React, { useState, useEffect } from 'react'
import FormGroup from '../../utils/auth-form/FormGroup'
import { Form, Spinner } from 'react-bootstrap'
import styles from './AuthWithEmailAndPasswordForm.module.scss'
import Cookies from 'js-cookie'
import { apiURL } from '../../../context/constants'
import AuthForgetPassword from './AuthForgetPassword'

const LoginWithEmailAndPasswordForm = ({
  switchPhoneAndEmail,
  authEmailAndPassword,
  handleIsLogin,
  isLogin,
  forgotPassword,
  setForgotPassword,
  dispatchAndNavigate,
}) => {
  const LIMITED_SECOND_FOR_SIGNUP = 120
  const LIMITED_SECOND_FOR_FORGET_PWD = 60

  const [fullName, setFullName] = useState('')
  const [isSendVerifyCode, setIsSentVerifyCode] = useState(false)
  const [counter, setCounter] = useState(LIMITED_SECOND_FOR_SIGNUP)
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
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setCounter(LIMITED_SECOND_FOR_FORGET_PWD)
  }, [forgotPassword])

  const createOTP = () => {
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

  const onSubmitOTP = (option) => {
    sendOTPCode(option)
    setIsSentVerifyCode(true)
    counterWhenSubmit()
  }

  const counterWhenSubmit = () => {
    let interval = setInterval(() => {
      setCounter((prev) => {
        if (prev > 0) {
          return prev - 1
        }
        clearInterval(interval)
        setIsSentVerifyCode(false)
        return forgotPassword
          ? LIMITED_SECOND_FOR_FORGET_PWD
          : LIMITED_SECOND_FOR_SIGNUP
      })
    }, 1000)
  }

  const sendOTPCode = async (option) => {
    try {
      await fetch(`${apiURL}/register/verify`, {
        method: 'POST',
        body: JSON.stringify({
          email: userEmailAndPasswordInput.email,
          otp: createOTP(),
          option,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  const loginWithEmailAndPassword = async () => {
    console.log('loading true')
    setLoading(true)
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
          return dispatchAndNavigate({
            ...data.user,
            accessToken: data.accessToken,
            admin: data.admin,
          })
        }

        return !data.success && setInvalidEmailOrPassword(data.message)
      }

      const isMatchOTP = verifyOTP.input === verifyOTP.create
      if (!isMatchOTP) return setInvalidOTP('Mã xác minh không hợp lệ')

      const userDefaultAvatar =
        'https://firebasestorage.googleapis.com/v0/b/f8clone-3e404.appspot.com/o/uploads%2Fnobody_m.256x256.jpg?alt=media&token=8e617e21-795f-45ce-8340-955a5290e66f'

      await fetch(`${apiURL}/register/`, {
        method: 'POST',
        body: JSON.stringify({
          fullName,
          photoURL: userDefaultAvatar,
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

      handleIsLogin()
    } catch (error) {
      console.log(error)
    } finally {
      console.log('loading false')
      setLoading(false)
    }
  }

  const isValidEmail = (email) => {
    const regex = /\S+@\S+\.\S+/
    return regex.test(email)
  }

  const checkUserEmailExist = async (e) => {
    if (e.target.value && isValidEmail(e.target.value)) {
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

  const handleValidateFullName = () => {
    const isEmptyFullNameInput = fullName.length === 0
    const inValidFullNameInput =
      fullName.length === 1 ||
      !fullName.match('[a-zA-Z][a-zA-Z ]{2,}') ||
      fullName.trim().indexOf(' ') === -1

    if (isEmptyFullNameInput) {
      setValidateFullName('Tên không được để trống')
    } else if (inValidFullNameInput) {
      setValidateFullName('Tên của bạn không hợp lệ')
    } else {
      setValidateFullName(null)
    }
  }

  useEffect(() => {
    const disable = () => {
      if (!isLogin) {
        return (
          fullName.trim().indexOf(' ') === -1 ||
          validateFullName !== null ||
          !isValidEmail(userEmailAndPasswordInput.email) ||
          userEmailAndPasswordInput.password.length < 8 ||
          validateEmail !== null
        )
      }
      return (
        !isValidEmail(userEmailAndPasswordInput.email) || validateEmail !== null
      )
    }

    setDisabled(disable())
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
            value={userEmailAndPasswordInput.password}
            onChange={{
              input: (e) =>
                setUserEmailAndPasswordInput((prev) => {
                  setInvalidEmailOrPassword(null)
                  return { ...prev, password: e.target.value }
                }),
            }}
            onKeyUp={(e) =>
              e.keyCode === 13 &&
              validateEmail === null &&
              userEmailAndPasswordInput.password.length >= 8 &&
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
                validateEmail === null &&
                userEmailAndPasswordInput.password.length >= 8 &&
                !loading
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
          email={userEmailAndPasswordInput.email}
          isValidEmail={isValidEmail}
          verifyOTP={verifyOTP}
          invalidOTP={invalidOTP}
          setInvalidOTP={setInvalidOTP}
          isSendVerifyCode={isSendVerifyCode}
          disabled={disabled}
          setDisabled={setDisabled}
          loading={loading}
          setLoading={setLoading}
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
          onSubmitOTP={() => onSubmitOTP('forgotPwd')}
        />
      )}
    </>
  )
}

export default LoginWithEmailAndPasswordForm

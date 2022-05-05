import React, { useEffect, useState } from 'react'
import { Form, Spinner } from 'react-bootstrap'
import styles from './AuthWithPhoneNumberForm.module.scss'
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth'
import { auth } from '../../../firebase/config'
import FormGroup from '../../utils/auth-form/FormGroup'
import { apiURL } from '../../../context/constants'
import Cookies from 'js-cookie'
import consoleLog from '../../utils/console-log/consoleLog'

const LoginWithPhoneNumberForm = ({
  switchPhoneAndEmail,
  dispatchAndNavigate,
  isLogin,
}) => {
  const COUNTRY_NAME_DEFAULT = 'vn'
  const COUNTRY_CODE_DEFAULT = '84'

  const LIMITED_SECOND = 60

  const [countryName, setCountryName] = useState(COUNTRY_NAME_DEFAULT)
  const [countryCode, setCountryCode] = useState(COUNTRY_CODE_DEFAULT)
  const [isSendVerifyCode, setIsSentVerifyCode] = useState(false)
  const [verifyOTP, setVerifyOTP] = useState('')
  const [counter, setCounter] = useState(LIMITED_SECOND)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [fullName, setFullName] = useState('')
  const [validatePhoneNumber, setValidatePhoneNumber] = useState(null)
  const [validateFullName, setValidateFullName] = useState(null)
  const [invalidOTP, setInvalidOTP] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

  const getCountryName = (e) => {
    const countryNameFormatted = e.target.value.split(' ')[0].toLowerCase()
    const countryCodeFormatted = e.target.value.split(' +')[1]

    setCountryName(countryNameFormatted)
    setCountryCode(countryCodeFormatted)
  }

  const onSubmitOTP = () => {
    sendOTPCode()
    setIsSentVerifyCode(true)
    counterWhenSubmit()
  }

  const counterWhenSubmit = () => {
    let interval = setInterval(() => {
      setCounter((prev) => {
        if (prev > 0) return prev - 1

        clearInterval(interval)
        setIsSentVerifyCode(false)
        return LIMITED_SECOND
      })
    }, 1000)
  }

  const sendOTPCode = async () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
      },
      auth
    )

    const phoneNumberFormatted = `+${countryCode}${phoneNumber}`
    const appVerifier = window.recaptchaVerifier

    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumberFormatted,
        appVerifier
      )
      window.confirmationResult = confirmationResult
    } catch (error) {
      consoleLog(error.message)
    }
  }

  const setCookieAndDispatchAfterLogin = (data) => {
    Cookies.set('token', data.accessToken, { expires: 365 })
    dispatchAndNavigate({
      ...data.user,
      accessToken: data.accessToken,
    })
  }

  const validateOTP = async () => {
    setLoading(true)
    try {
      const result = await window.confirmationResult.confirm(verifyOTP)
      const user = await result.user

      if (user && isLogin) {
        const url = `${apiURL}/login/provider`
        const data = await postLoginProvider(url)
        if (!data.success) return

        setCookieAndDispatchAfterLogin(data)
      } else if (user && !isLogin) {
        const userDefaultAvatar =
          'https://firebasestorage.googleapis.com/v0/b/f8clone-3e404.appspot.com/o/uploads%2Fnobody_m.256x256.jpg?alt=media&token=8e617e21-795f-45ce-8340-955a5290e66f'
        const url = `${apiURL}/register`
        const data = await postRegister(url, userDefaultAvatar)

        setCookieAndDispatchAfterLogin(data)
      }
    } catch (error) {
      if (error.code === 'auth/invalid-verification-code')
        setInvalidOTP('Mã xác minh không hợp lệ')
    } finally {
      setLoading(false)
    }
  }

  const postLoginProvider = async (url) => {
    try {
      return (
        await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            phoneNumber,
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
      return (
        await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            fullName,
            phoneNumber,
            photoURL,
            activated: true,
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

  const checkNumberPhone = async (e) => {
    setPhoneNumber(e.target.value)

    const length = e.target.value.trim().length
    if (length === 0) return setValidatePhoneNumber(null)

    if (length === 10) {
      const url = `${apiURL}/login/phone-number`
      const data = await postCheckPhoneNumber(url, e.target.value)

      isLogin
        ? setValidatePhoneNumber(data.notUsed ? data.notUsed : null)
        : setValidatePhoneNumber(data.used ? data.used : null)
    }
  }

  const postCheckPhoneNumber = async (url, phoneNumber) => {
    try {
      return (
        await fetch(url, {
          method: 'POST',
          body: JSON.stringify({ phoneNumber }),
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
    } else if (isValidFullNameInput) {
      setValidateFullName('Tên của bạn không hợp lệ')
    } else {
      setValidateFullName(null)
    }
  }

  useEffect(() => {
    const requirementsForm = () => {
      return !isLogin
        ? fullName.trim().indexOf(' ') === -1 ||
            validateFullName !== null ||
            phoneNumber.length !== 10 ||
            !phoneNumber.match(/^\d+$/) ||
            validatePhoneNumber !== null
        : phoneNumber.length !== 10 || validatePhoneNumber !== null
    }
    setDisabled(requirementsForm())
  }, [fullName, isLogin, phoneNumber, validateFullName, validatePhoneNumber])

  useEffect(() => {
    const isEmptyOTPInput = verifyOTP.length === 0
    isEmptyOTPInput && setInvalidOTP(null)
  }, [verifyOTP])

  return (
    <Form className={styles.formBody}>
      {!isLogin && (
        <FormGroup
          label="Tên của bạn?"
          maxLength={50}
          placeholder={'Họ và tên của bạn'}
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
        placeholder={'Số điện thoại'}
        label={'Số điện thoại'}
        labelRight={'email'}
        isLogin={isLogin}
        phoneInput={true}
        maxLength={11}
        onClick={() => switchPhoneAndEmail('email')}
        onChange={{
          selectCountry: getCountryName,
          input: checkNumberPhone,
        }}
        countryName={countryName}
        inValid={validatePhoneNumber}
      />
      <FormGroup
        placeholder={'Nhập mã xác nhận'}
        maxLength={6}
        OTPInput={true}
        isSendVerifyCode={isSendVerifyCode}
        onChange={{ input: (e) => setVerifyOTP(e.target.value) }}
        counter={counter}
        disabled={disabled}
        inputDisabled={!isSendVerifyCode}
        onClick={onSubmitOTP}
        inValid={invalidOTP}
        onKeyUp={(e) =>
          e.keyCode === 13 && verifyOTP.length === 6 && validateOTP()
        }
      />
      <div
        className={
          verifyOTP.length === 6 && !loading
            ? styles.logInButton
            : `${styles.logInButton} ${styles.disabled}`
        }
        onClick={validateOTP}
      >
        {loading && (
          <Spinner
            animation="border"
            style={{ width: 24, height: 24, color: '#fff' }}
          />
        )}
        {!loading && <span>{isLogin ? 'Đăng nhập' : 'Đăng ký'}</span>}
      </div>
    </Form>
  )
}

export default LoginWithPhoneNumberForm

import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import styles from './AuthWithPhoneNumberForm.module.scss'
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth'
import { auth } from '../../../firebase/config'
import FormGroup from '../../utils/auth-form/FormGroup'
import { apiURL } from '../../../context/constants'
import Cookies from 'js-cookie'

const LoginWithPhoneNumberForm = ({
  switchPhoneAndEmailHandler,
  dispatchAndNavigateHandler,
  isLogin,
}) => {
  // Default country code and name is Vietnam because of website for Vietnamese
  const COUNTRY_NAME_DEFAULT = 'vn'
  const COUNTRY_CODE_DEFAULT = '84'

  // Website F8 uses 60s for the resend button
  const LIMITED_SECOND = 60

  const [countryName, setCountryName] = useState(COUNTRY_NAME_DEFAULT)
  const [countryCode, setCountryCode] = useState(COUNTRY_CODE_DEFAULT)
  const [isSendVerifyCode, setIsSentVerifyCode] = useState(false)
  const [verifyOTP, setVerifyOTP] = useState('')
  const [counter, setCounter] = useState(LIMITED_SECOND)
  const [userPhoneNumber, setUserPhoneNumber] = useState('')
  const [fullName, setUsername] = useState('')

  const getCountryNameHandler = e => {
    const countryNameFormatted = e.target.value.split(' ')[0].toLowerCase()
    const countryCodeFormatted = e.target.value.split(' +')[1]

    setCountryName(countryNameFormatted)
    setCountryCode(countryCodeFormatted)
  }

  // Call send verify code function to user's phone and set re-send button count back 60s for re-sending
  const onSubmitHandler = () => {
    sendOTPCodeHandler()
    setIsSentVerifyCode(true)
    counterHandler()
  }

  const counterHandler = () => {
    setInterval(() => {
      setCounter(prev => (prev > 0 ? prev - 1 : setIsSentVerifyCode(false)))
    }, 1000)
  }

  const sendOTPCodeHandler = async () => {
    // Auto recaptcha verify by firebase don't need show recaptcha widget
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
      },
      auth
    )

    // Format phone number to send to firebase
    const phoneNumber = `+${countryCode}${userPhoneNumber}`
    const appVerifier = window.recaptchaVerifier

    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      )
      window.confirmationResult = confirmationResult
    } catch (error) {
      console.log(error.message)
    }
  }

  console.log(verifyOTP)

  // Verify OTP code firebase have been sent to user's phone if true then login
  const validateOTPHandler = async () => {
    if (verifyOTP === '') return

    try {
      const result = await window.confirmationResult.confirm(verifyOTP)
      let user = await result.user

      if (user && isLogin) {
        const res = await fetch(`${apiURL}/login/provider`, {
          method: 'POST',
          body: JSON.stringify({
            phoneNumber: userPhoneNumber,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const data = await res.json()
        console.log(data)
        Cookies.set('token', data.accessToken, { expires: 365 })

        dispatchAndNavigateHandler({
          ...data.user,
          accessToken: data.accessToken,
        })
      } else if (user && !isLogin) {
        const res = await fetch(`${apiURL}/register`, {
          method: 'POST',
          body: JSON.stringify({
            fullName,
            phoneNumber: userPhoneNumber,
            activated: true,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const data = await res.json()

        Cookies.set('token', data.accessToken, { expires: 365 })

        dispatchAndNavigateHandler({
          ...data.user,
          accessToken: data.accessToken,
        })
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const checkNumberPhoneHandler = async e => {
    try {
      const length = e.target.value.trim().length

      if (length === 10) {
        const res = await fetch(`${apiURL}/login/phone-number`, {
          method: 'POST',
          body: JSON.stringify({ phoneNumber: e.target.value }),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const data = await res.json()

        !isLogin && data.notUsed && setUserPhoneNumber(e.target.value)
        isLogin && data.used && setUserPhoneNumber(e.target.value)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form className={styles.formBody}>
      {!isLogin && (
        <FormGroup
          label="Tên của bạn?"
          maxLength={50}
          placeholder={'Họ và tên của bạn'}
          onChange={{ input: e => setUsername(e.target.value) }}
        />
      )}
      <FormGroup
        placeholder={'Số điện thoại'}
        label={'Số điện thoại'}
        labelRight={'email'}
        isLogin={isLogin}
        phoneInput={true}
        maxLength={11}
        onClick={() => switchPhoneAndEmailHandler('email')}
        onChange={{
          selectCountry: getCountryNameHandler,
          input: checkNumberPhoneHandler,
        }}
        countryName={countryName}
      />
      <FormGroup
        placeholder={'Nhập mã xác nhận'}
        maxLength={6}
        OTPInput={true}
        isSendVerifyCode={isSendVerifyCode}
        onChange={{ input: e => setVerifyOTP(e.target.value) }}
        counter={counter}
        disabled={!userPhoneNumber}
        onClick={userPhoneNumber ? onSubmitHandler : null}
      />
      <div
        className={
          verifyOTP.length === 6
            ? styles.logInButton
            : `${styles.logInButton} ${styles.disabled}`
        }
        onClick={verifyOTP.length === 6 ? validateOTPHandler : null}
      >
        <span>{isLogin ? 'Đăng nhập' : 'Đăng ký'}</span>
      </div>
    </Form>
  )
}

export default LoginWithPhoneNumberForm

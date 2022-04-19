import React, { useEffect, useState } from 'react'
import { apiURL } from '../../../context/constants'
import { Form, Spinner } from 'react-bootstrap'
import FormGroup from '../../utils/auth-form/FormGroup'
import styles from './AuthForgetPassword.module.scss'

const AuthForgetPassword = ({
  setForgotPassword,
  email,
  setVerifyOTP,
  verifyOTP,
  invalidOTP,
  setInvalidOTP,
  isSendVerifyCode,
  checkUserEmailExist,
  isValidEmail,
  counter,
  validateEmail,
  setDisabled,
  disabled,
  onSubmit,
  loading,
  setLoading,
}) => {
  const [passwordAndRePasswordText, setPasswordAndRePasswordText] = useState({
    pass: '',
    rePass: '',
  })
  const [isConfirmOTPSentToEmail, setIsConfirmOTPSentToEmail] = useState(false)

  const resetPassword = async () => {
    setLoading(true)
    try {
      await fetch(`${apiURL}/login/reset-password`, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password: passwordAndRePasswordText.pass,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      setForgotPassword(false)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const disableSendOTPButtonWhenInvalidInputEmail = () =>
      !isValidEmail(email) || validateEmail !== null

    setDisabled(disableSendOTPButtonWhenInvalidInputEmail())
  }, [email, isValidEmail, setDisabled, validateEmail])

  const checkOTPValid = () => {
    const isMatchOTP = verifyOTP.input === verifyOTP.create

    if (isMatchOTP) {
      setIsConfirmOTPSentToEmail(true)
      setInvalidOTP(null)
    } else {
      setInvalidOTP('Mã xác minh không hợp lệ')
    }
  }

  return (
    <Form className={styles.formBody}>
      {!isConfirmOTPSentToEmail && (
        <>
          <FormGroup
            label={'Email'}
            type={'email'}
            placeholder={'Nhập địa chỉ email'}
            onChange={{
              input: checkUserEmailExist,
            }}
            inValid={validateEmail}
          />
          <FormGroup
            placeholder={'Nhập mã xác nhận'}
            maxLength={6}
            OTPInput={true}
            forgotPassword
            isSendVerifyCode={isSendVerifyCode}
            counter={counter}
            onChange={{
              input: setVerifyOTP,
            }}
            disabled={disabled}
            onClick={onSubmit}
            onKeyUp={(e) =>
              e.keyCode === 13 &&
              verifyOTP.input.length === 6 &&
              checkOTPValid()
            }
            inputDisabled={!isSendVerifyCode}
            inValid={invalidOTP}
          />
        </>
      )}
      {!isConfirmOTPSentToEmail && (
        <div
          className={
            verifyOTP.input.length === 6
              ? styles.submitButton
              : `${styles.submitButton} ${styles.disabled}`
          }
          onClick={checkOTPValid}
        >
          <span>Xác nhận</span>
        </div>
      )}

      {isConfirmOTPSentToEmail && (
        <>
          <FormGroup
            label={'Nhập mật khẩu mới'}
            type={'password'}
            placeholder={'Mật khẩu'}
            onChange={{
              input: (e) =>
                setPasswordAndRePasswordText((prev) => {
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
                setPasswordAndRePasswordText((prev) => {
                  return {
                    ...prev,
                    rePass: e.target.value,
                  }
                }),
            }}
            onKeyUp={(e) =>
              e.keyCode === 13 &&
              passwordAndRePasswordText.pass.length >= 8 &&
              passwordAndRePasswordText.rePass.length >= 8 &&
              passwordAndRePasswordText.pass ===
                passwordAndRePasswordText.rePass &&
              resetPassword()
            }
          />
        </>
      )}

      {isConfirmOTPSentToEmail && (
        <div
          className={
            passwordAndRePasswordText.pass.length >= 8 &&
            passwordAndRePasswordText.rePass.length >= 8 &&
            passwordAndRePasswordText.pass ===
              passwordAndRePasswordText.rePass &&
            !loading
              ? styles.submitButton
              : `${styles.submitButton} ${styles.disabled}`
          }
          onClick={resetPassword}
        >
          {loading && (
            <Spinner
              animation="border"
              style={{ width: 24, height: 24, color: '#fff' }}
            />
          )}
          {!loading && <span>Xác nhận</span>}
        </div>
      )}
    </Form>
  )
}

export default AuthForgetPassword

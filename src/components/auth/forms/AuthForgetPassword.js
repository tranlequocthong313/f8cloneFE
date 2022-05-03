import React, { useEffect, useState } from 'react'
import { apiURL } from '../../../context/constants'
import { Form, Spinner } from 'react-bootstrap'
import FormGroup from '../../utils/auth-form/FormGroup'
import styles from './AuthForgetPassword.module.scss'
import consoleLog from '../../utils/console-log/consoleLog'

const AuthForgetPassword = ({
  setForgotPassword,
  email,
  setVerifyOTP,
  verifyOTP,
  invalidOTP,
  setInvalidOTP,
  isSendVerifyCode,
  checkUserEmailExist,
  counter,
  validateEmail,
  setDisabled,
  disabled,
  onSubmitOTP,
  loading,
  setLoading,
}) => {
  const [isConfirm, setIsConfirm] = useState(false)
  const [password, setPassword] = useState({
    pass: '',
    rePassword: '',
  })

  const forgotPassword = async () => {
    setLoading(true)

    const url = `${apiURL}/login/reset-password`
    await postForgetPassword(url)

    setForgotPassword(false)
    setLoading(false)
  }

  const postForgetPassword = async (url) => {
    try {
      return (
        await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            email,
            password: password.pass,
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

  useEffect(() => {
    const validEmail = validateEmail === null
    setDisabled(!validEmail)
  }, [email, setDisabled, validateEmail])

  const checkOTPValid = () => {
    const validOTPInput = verifyOTP && verifyOTP.input === verifyOTP.create
    if (!validOTPInput) return setInvalidOTP('Mã xác minh không hợp lệ')

    setIsConfirm(true)
    setInvalidOTP(null)
  }
  return (
    <Form className={styles.formBody}>
      {!isConfirm && (
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
            onClick={() => onSubmitOTP('forgotPwd')}
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
      {!isConfirm && (
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

      {isConfirm && (
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
                    rePassword: e.target.value,
                  }
                }),
            }}
            onKeyUp={(e) =>
              e.keyCode === 13 &&
              password.pass.length >= 8 &&
              password.rePassword.length >= 8 &&
              password.pass === password.rePassword &&
              forgotPassword()
            }
          />
        </>
      )}

      {isConfirm && (
        <div
          className={
            password.pass.length >= 8 &&
            password.rePassword.length >= 8 &&
            password.pass === password.rePassword &&
            !loading
              ? styles.submitButton
              : `${styles.submitButton} ${styles.disabled}`
          }
          onClick={forgotPassword}
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

import React, { useEffect, useState } from 'react'
import { apiURL } from '../../../context/constants'
import { Form } from 'react-bootstrap'
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
  checkUserEmailExistHandler,
  isValidEmailHandler,
  counter,
  validateEmail,
  setDisabled,
  disabled,
  onSubmitHandler,
}) => {
  const [password, setPassword] = useState({
    pass: '',
    rePass: '',
  })

  const [isConfirm, setIsConfirm] = useState(false)

  const forgotPasswordHandler = async () => {
    try {
      const res = await fetch(`${apiURL}/login/reset-password`, {
        method: 'POST',
        body: JSON.stringify({
          email,
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
  useEffect(() => {
    const disableHandler = () => {
      return !isValidEmailHandler(email) || validateEmail !== null
    }

    setDisabled(disableHandler())
  }, [email, isValidEmailHandler, setDisabled, validateEmail])

  return (
    <Form className={styles.formBody}>
      {!isConfirm && (
        <>
          <FormGroup
            label={'Email'}
            type={'email'}
            placeholder={'Nhập địa chỉ email'}
            onChange={{
              input: checkUserEmailExistHandler,
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
              input: setVerifyOTP,
            }}
            disabled={disabled}
            onClick={onSubmitHandler}
            inputDisabled={!isSendVerifyCode}
            inValid={invalidOTP}
          />
        </>
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
                    rePass: e.target.value,
                  }
                }),
            }}
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
          onClick={() => {
            if (verifyOTP.input !== verifyOTP.create) {
              return setInvalidOTP('Mã xác minh không hợp lệ')
            }
            setIsConfirm(true)
            setInvalidOTP(null)
          }}
        >
          <span>Xác nhận</span>
        </div>
      )}
      {isConfirm && (
        <div
          className={
            password.pass.length >= 8 &&
            password.rePass.length >= 8 &&
            password.pass === password.rePass
              ? styles.submitButton
              : `${styles.submitButton} ${styles.disabled}`
          }
          onClick={forgotPasswordHandler}
        >
          <span>Xác nhận</span>
        </div>
      )}
    </Form>
  )
}

export default AuthForgetPassword

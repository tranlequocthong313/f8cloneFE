import React, { useEffect, useState } from 'react';
import { apiURL } from '../../../context/constants';
import { Form, Spinner } from 'react-bootstrap';
import FormGroup from '../../utils/auth-form/FormGroup';
import styles from './AuthForgetPassword.module.scss';

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
  onSubmitOTP,
  loading,
  setLoading,
}) => {
  const [password, setPassword] = useState({
    pass: '',
    rePass: '',
  });

  const [isConfirm, setIsConfirm] = useState(false);

  const forgotPassword = async () => {
    setLoading(true);
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
      });
      const data = await res.json();
      setForgotPassword(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const disable = () => {
      return !isValidEmail(email) || validateEmail !== null;
    };

    setDisabled(disable());
  }, [email, isValidEmail, setDisabled, validateEmail]);

  const checkOTPValid = () => {
    if (verifyOTP.input !== verifyOTP.create) {
      return setInvalidOTP('Mã xác minh không hợp lệ');
    }
    setIsConfirm(true);
    setInvalidOTP(null);
  };

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
              input: setVerifyOTP,
            }}
            disabled={disabled}
            onClick={onSubmitOTP}
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
                  };
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
                  };
                }),
            }}
            onKeyUp={(e) =>
              e.keyCode === 13 &&
              password.pass.length >= 8 &&
              password.rePass.length >= 8 &&
              password.pass === password.rePass &&
              forgotPassword()
            }
          />
        </>
      )}

      {isConfirm && (
        <div
          className={
            password.pass.length >= 8 &&
            password.rePass.length >= 8 &&
            password.pass === password.rePass &&
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
  );
};

export default AuthForgetPassword;

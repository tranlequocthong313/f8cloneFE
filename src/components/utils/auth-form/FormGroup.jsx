import React from 'react';
import { Form, Image } from 'react-bootstrap';
import styles from './FormGroup.module.scss';
import SelectCountry from '../../auth/buttons/SelectCountry';

const FormGroup = ({
  onClick,
  onChange,
  onKeyUp,
  label,
  labelRight,
  type,
  placeholder,
  maxLength,
  isLogin,
  isLoginEmailOption,
  isSendVerifyCode,
  OTPInput,
  phoneInput,
  countryName,
  counter,
  value,
  disabled,
  pattern,
  onBlur,
  inValid,
  inputDisabled,
  tabIndex,
}) => {
  return (
    <Form.Group className="mb-3">
      <div className={styles.labelGroup}>
        {label && <Form.Label>{label}</Form.Label>}
        {labelRight && (
          <Form.Label onClick={onClick} className={styles.labelRight}>
            {isLogin
              ? `Đăng nhập với ${labelRight}`
              : `Đăng ký với ${labelRight}`}
          </Form.Label>
        )}
      </div>
      <div
        className={
          !!inValid ? `${styles.inputWrap} ${styles.invalid}` : styles.inputWrap
        }
      >
        {phoneInput && (
          <>
            <Image
              className={styles.flagImg}
              src={
                countryName
                  ? `https://flagpedia.net/data/flags/h80/${countryName}.png`
                  : 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Flag_of_the_United_Nations.svg/640px-Flag_of_the_United_Nations.svg.png'
              }
            />
            <SelectCountry onChange={onChange.selectCountry} />
          </>
        )}
        <Form.Control
          maxLength={maxLength}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange.input}
          onKeyUp={onKeyUp}
          onBlur={onBlur}
          pattern={pattern}
          disabled={inputDisabled}
          tabIndex={tabIndex}
        />

        {OTPInput && (
          <div
            className={
              disabled || isSendVerifyCode
                ? `${styles.verifyOTPButton} ${styles.disabled}`
                : styles.verifyOTPButton
            }
            onClick={onClick}
          >
            <span>
              {!isSendVerifyCode ? 'Gửi mã' : `Gửi lại mã ${counter}`}
            </span>
          </div>
        )}
      </div>

      {!!inValid && <div className={styles.message}>{inValid}</div>}

      {!isLogin && isLoginEmailOption === 'email' && (
        <div className={styles.help}>
          Gợi ý: Mật khẩu cần có ít nhất 8 kí tự
        </div>
      )}
    </Form.Group>
  );
};

export default FormGroup;

import React from 'react'
import { Image } from 'react-bootstrap'
import styles from './SigninButton.module.scss'

const SigninButton = ({ image, text, onClick }) => {
  return (
    <div className={styles.wrapper} onClick={onClick}>
      <Image src={image} />
      <span>{text}</span>
    </div>
  )
}

export default SigninButton

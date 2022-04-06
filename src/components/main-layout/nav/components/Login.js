import React from 'react'
import { Link } from 'react-router-dom'
import MainButton from '../../../utils/button/MainButton'
import styles from './Login.module.scss'

const Login = () => {
  return (
    <MainButton primary={true} className={styles.button}>
      <Link to="/login">Đăng nhập</Link>
    </MainButton>
  )
}

export default Login

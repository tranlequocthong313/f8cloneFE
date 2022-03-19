import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Login.module.scss'

const Login = () => {
  return (
    <Link to="/login" className={styles.loginBtn}>
      Đăng nhập
    </Link>
  )
}

export default Login

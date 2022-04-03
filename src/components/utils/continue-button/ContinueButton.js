import React from 'react'
import { Link } from 'react-router-dom'
import styles from './ContinueButton.module.scss'

const ContinueButton = ({ path }) => {
  return (
    <div className={styles.wrapper}>
      <Link to={path} className={styles.body}>
        <i className="fa-solid fa-arrow-right"></i>
      </Link>
    </div>
  )
}

export default ContinueButton

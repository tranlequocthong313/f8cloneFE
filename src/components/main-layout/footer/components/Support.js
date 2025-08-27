import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Support.module.scss'

const Support = () => {
  return (
    <div className={styles.wrapperList}>
      <div className={styles.containerList}>
        <h2 className={styles.title}>Hỗ trợ</h2>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link className={styles.link} to="/contact-us">
              Liên hệ
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Support

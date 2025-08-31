import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Tabs.module.scss'

const Tabs = ({ tab, isActive, quantity, onActive, path }) => {
  return (
    <div className={styles.tabs}>
      <Link
        to={path ? path : '#'}
        onClick={onActive}
        className={isActive ? `${styles.tab} ${styles.active}` : styles.tab}
      >
        {tab} {quantity && quantity}
      </Link>
    </div>
  )
}

export default Tabs

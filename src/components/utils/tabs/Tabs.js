import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Tabs.module.scss'

const Tabs = ({ tab, isActive, quantity, onActive }) => {
  return (
    <div className={styles.tabs}>
      <div
        onClick={onActive}
        className={isActive ? `${styles.tab} ${styles.active}` : styles.tab}
      >
        {tab} {quantity && quantity}
      </div>
    </div>
  )
}

export default Tabs

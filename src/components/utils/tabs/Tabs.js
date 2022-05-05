import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Tabs.module.scss'

const Tabs = ({
  tab,
  isActive,
  quantity,
  onActive,
  path,
  className,
  activeColor,
}) => {
  return (
    <div className={styles.tabs}>
      <Link
        to={path ? path : '#'}
        onClick={onActive}
        className={
          isActive
            ? `${styles.tab} ${
                activeColor ? activeColor : styles.active
              } ${className}`
            : `${styles.tab} ${className}`
        }
      >
        {tab} {quantity && quantity}
      </Link>
    </div>
  )
}

export default Tabs

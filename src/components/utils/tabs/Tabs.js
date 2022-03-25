import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Tabs.module.scss'

const Tabs = ({ tabs }) => {
  const [active, setActive] = useState('drafts')

  return (
    <ul className={styles.tabs}>
      {tabs.map(tab => (
        <li key={tab.slug}>
          <span
            className={
              `${styles.tab} ${styles.active}`
              // ? `${styles.tab} ${styles.active}`
              // : styles.tab
            }
          >
            {tab.title} (1)
          </span>
        </li>
      ))}
    </ul>
  )
}

export default Tabs

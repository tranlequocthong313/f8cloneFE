import React from 'react'
import styles from './Tabs.module.scss'

const Tabs = ({ tabActiveState, activeHandler }) => {
  return (
    <div className={styles.tabs}>
      <div
        className={
          tabActiveState === 'front-end'
            ? `${styles.tab} ${styles.active}`
            : styles.tab
        }
        onClick={() => activeHandler('front-end')}
      >
        Front-end
      </div>
      <div
        className={
          tabActiveState === 'back-end'
            ? `${styles.tab} ${styles.active}`
            : styles.tab
        }
        onClick={() => activeHandler('back-end')}
      >
        Back-end
      </div>
    </div>
  )
}

export default Tabs

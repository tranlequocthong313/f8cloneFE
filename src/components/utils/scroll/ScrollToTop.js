import React from 'react'
import styles from './ScrollToTop.module.scss'

const ScrollToTop = ({ onScroll }) => {
  return (
    <div className={styles.wrapper} onClick={onScroll}>
      <i className="bi bi-arrow-up-short"></i>
    </div>
  )
}

export default ScrollToTop

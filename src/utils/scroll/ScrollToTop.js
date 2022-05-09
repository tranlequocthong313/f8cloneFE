import React, { useState } from 'react'
import styles from './ScrollToTop.module.scss'

const ScrollToTop = ({ onScroll }) => {
  return (
    <div className={styles.wrapper} onClick={onScroll}>
      <i className="fa-solid fa-arrow-up"></i>
    </div>
  )
}

export default ScrollToTop

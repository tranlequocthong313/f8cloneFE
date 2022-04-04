import React, { useState } from 'react'
import styles from './ScrollToTop.module.scss'

const ScrollToTop = ({ scrollToTop }) => {
  return (
    <div className={styles.wrapper} onClick={scrollToTop}>
      <i className="fa-solid fa-arrow-up"></i>
    </div>
  )
}

export default ScrollToTop

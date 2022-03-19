import React from 'react'
import styles from './SecondaryCard.module.scss'

const SecondaryCard = ({ children, forPage }) => {
  return (
    <div
      className={
        forPage === 'learningPath' ? styles.learningPath : styles.secondaryCard
      }
    >
      {children}
    </div>
  )
}

export default SecondaryCard

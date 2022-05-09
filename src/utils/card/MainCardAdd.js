import React from 'react'
import { Link } from 'react-router-dom'
import MainButton from '../button/MainButton'
import MainCard from './MainCard'
import styles from './MainCardAdd.module.scss'

const MainCardAdd = ({ path, children, onClick }) => {
  return (
    <MainCard className={styles.addCard} onClick={onClick}>
      <Link to={path}>
        <i className="fa-solid fa-circle-plus"></i>
        <div className={styles.star}></div>
        <MainButton outline={true} className={styles.button}>
          {children}
        </MainButton>
      </Link>
    </MainCard>
  )
}

export default MainCardAdd

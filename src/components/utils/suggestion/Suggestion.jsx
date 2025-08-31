import React from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import styles from './Suggestion.module.scss'
import MainButton from '../button/MainButton'

const Suggestion = ({ title, description, button, image }) => {
  return (
    <div className={styles.suggestion}>
      <div className={styles.suggestionInfo}>
        <h2>{title}</h2>
        <p>{description}</p>
        <MainButton outline={true} className={styles.button}>
          <a target='_blank' href="https://www.facebook.com/groups/f8official/">{button}</a>
        </MainButton>
      </div>
      <div className={styles.image}>
        <Image src={image} />
      </div>
    </div>
  )
}

export default Suggestion

import React from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import styles from './Suggestion.module.scss'
import MainButton from '../button/MainButton'

const Suggestion = ({
  path,
  title,
  description,
  button,
  image,
  linkOutside = false,
}) => {
  return (
    <div className={styles.suggestion}>
      <div className={styles.suggestionInfo}>
        <h2>{title}</h2>
        <p>{description}</p>
        {!linkOutside && (
          <Link to={path}>
            <MainButton outline={true} className={styles.button}>
              {button}
            </MainButton>
          </Link>
        )}
        {linkOutside && (
          <a rel="noopener noreferrer" target="_blank" href={path}>
            <MainButton outline={true} className={styles.button}>
              {button}
            </MainButton>
          </a>
        )}
      </div>
      <div className={styles.image}>
        <Image src={image} />
      </div>
    </div>
  )
}

export default Suggestion

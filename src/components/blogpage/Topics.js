import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Topics.module.scss'

const Topics = () => {
  return (
    <div className={styles.wrapper}>
      <h3>Các chủ đề được đề xuất</h3>
      <ul className={styles.topics}>
        <li>
          <Link to="/">Front-end / Mobile apps</Link>
        </li>
        <li>
          <Link to="/">Back-end / Devops</Link>
        </li>
        <li>
          <Link to="/">UI / UX / Design</Link>
        </li>
        <li>
          <Link to="/">Others</Link>
        </li>
      </ul>
    </div>
  )
}

export default Topics

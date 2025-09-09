import React from 'react'
import { Link } from 'react-router-dom'
import styles from './About.module.scss'

const About = () => {
  return (
    <div className={styles.wrapperList}>
      <div className={styles.containerList}>
        <h2 className={styles.title}>Về F8</h2>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link className={styles.link} to="/about-us">
              Giới thiệu
            </Link>
          </li>
          {/* <li className={styles.item}>
            <Link className={styles.link} to="/careers">
              Cơ hội việc làm
            </Link>
          </li> */}
        </ul>
      </div>
    </div>
  )
}

export default About

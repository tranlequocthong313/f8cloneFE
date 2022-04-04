import React from 'react'
import { Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './Copyright.module.scss'

const Copyright = () => {
  return (
    <Col sm={12} md={6} lg={6}>
      <div className={styles.copyRightWrapper}>
        <p>© 2022 F8 - Nền tảng học lập trình web đầu tiên tại Việt Nam</p>
      </div>
    </Col>
  )
}

export default Copyright

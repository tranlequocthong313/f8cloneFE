import React from 'react'
import { Col } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import ContinueButton from '../continue-button/ContinueButton'
import styles from './ScrollHorizontal.module.scss'

const ScrollHorizontal = ({ children, path }) => {
  const currentLocation = window.location.href.split('/')[3]

  return (
    <Row lg={3} xl={4} className={styles.scrollHorizontal}>
      {children}
      {currentLocation === '' ? (
        <Col xs={0} sm={0} className={styles.continueBtn}>
          <ContinueButton path={path} />
        </Col>
      ) : null}
    </Row>
  )
}

export default ScrollHorizontal

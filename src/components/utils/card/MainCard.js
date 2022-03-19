import React from 'react'
import { Card, Col } from 'react-bootstrap'
import styles from './MainCard.module.scss'

const MainCard = ({ children }) => {
  return (
    <Col xs={7} md={5}>
      <Card className={styles.card}>{children}</Card>
    </Col>
  )
}

export default MainCard

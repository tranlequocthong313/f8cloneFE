import React from 'react'
import { Card, Col } from 'react-bootstrap'
import styles from './MainCard.module.scss'

const MainCard = ({ children, className }) => {
  return (
    <Col xs={9} md={5} xl={3}>
      <Card className={`${styles.card} ${className}`}>{children}</Card>
    </Col>
  )
}

export default MainCard

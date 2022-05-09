import React from 'react'
import { Card, Col } from 'react-bootstrap'
import styles from './MainCard.module.scss'

const MainCard = ({ children, className, onClick }) => {
  return (
    <Col xs={9} md={5} xl={3}>
      <Card onClick={onClick} className={`${styles.card} ${className}`}>
        {children}
      </Card>
    </Col>
  )
}

export default MainCard

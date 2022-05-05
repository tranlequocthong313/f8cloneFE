import React, { Suspense, useEffect } from 'react'
import styles from './Terms.module.scss'
import Header from '../../components/layout/nav/Header'
import SideBar from '../../components/layout/sidebar/SideBar'
import { Row, Col, Container } from 'react-bootstrap'

const Footer = React.lazy(() => import('../../components/layout/footer/Footer'))

const Terms = () => {
  useEffect(() => (document.title = 'Điều khoản sử dụng'), [])

  return (
    <div className="container">
      <div className="containerTop">
        <h2>Điều khoản sử dụng</h2>
        <p>Điều khoản sử dụng</p>
      </div>
      <Container fluid style={{ padding: 0 }}>
        <Row style={{ marginTop: 0 }}>
          <Col xs={12} lg={8} xl={8}>
            Nội dung điều khoản sử dụng
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Terms

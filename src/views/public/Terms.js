import React, { Suspense, useEffect } from 'react'
import styles from './Terms.module.scss'
import Header from '../../components/main-layout/nav/Header'
import SideBar from '../../components/main-layout/sidebar/SideBar'
import { Row, Col, Container } from 'react-bootstrap'

const Footer = React.lazy(() =>
  import('../../components/main-layout/footer/Footer')
)

const Terms = () => {
  useEffect(() => (document.title = 'Điều khoản sử dụng'), [])

  return (
    <>
      <Header />
      <Row>
        <SideBar />
        <Col xs={12} sm={12} md={12} lg={11} xl={11} style={{ height: 1000 }}>
          <div className="withSidebarContent">
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
          </div>
        </Col>
      </Row>
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </>
  )
}

export default Terms

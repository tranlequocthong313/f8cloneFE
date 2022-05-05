import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Header from '../nav/Header'
import SideBar from '../sidebar/SideBar'
import Footer from '../footer/Footer'

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Row>
        <SideBar />
        <Col xs={12} sm={12} md={12} lg={11} xl={11}>
          <div className="withSidebarContent">{children}</div>
        </Col>
      </Row>
      <Footer />
    </>
  )
}

export default DefaultLayout

import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Header from '../nav/Header'
import SideBar from '../sidebar/SideBar'
import Footer from '../footer/Footer'

const HeaderOnly = ({ children }) => {
  return (
    <>
      <Header />
      <Row>
        <div className="withSidebarContent">{children}</div>
      </Row>
      <Footer />
    </>
  )
}

export default HeaderOnly

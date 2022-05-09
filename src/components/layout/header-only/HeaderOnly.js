import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Header from '../nav/Header'
import SideBar from '../sidebar/SideBar'
import Footer from '../footer/Footer'
import ModalError from '../../../utils/modal/ModalError'

const HeaderOnly = ({ children }) => {
  return (
    <>
      <Header />
      <ModalError />
      <Row>
        <div className="withSidebarContent">{children}</div>
      </Row>
      <Footer />
    </>
  )
}

export default HeaderOnly

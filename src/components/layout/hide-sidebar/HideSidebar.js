import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Header from '../nav/Header'
import SideBar from '../sidebar/SideBar'
import Footer from '../footer/Footer'
import styles from './HideSidebar.module.scss'
import ModalError from '../../../utils/modal/ModalError'

const HideSidebar = ({ children }) => {
  return (
    <>
      <Header />
      <ModalError />
      <Row>
        <div className={styles.sidebarWrap}>
          <SideBar />
        </div>
        <Col xs={12} sm={12} md={12} lg={11} xl={11}>
          <div className="withSidebarContent">{children}</div>
        </Col>
      </Row>
      <Footer />
    </>
  )
}

export default HideSidebar

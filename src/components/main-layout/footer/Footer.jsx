import React, { memo } from 'react'
import Address from './components/Address'
import Support from './components/Support'
import About from './components/About'
import Manager from './components/Manager'
import Copyright from './components/Copyright'
import Media from './components/Media'
import { Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './Footer.module.scss'
import '../../../sass/_custom.scss'

const Footer = () => {
  return (
    <div className={styles.footerWrapper}>
      <section className={styles.footerContainer}>
        <Container style={{ maxWidth: 1100 }}>
          <Row>
            <Col sm={12} md={6} lg={3}>
              <Address />
            </Col>
            <Col sm={12} md={6} lg={3}>
              <About />
            </Col>
            <Col sm={12} md={6} lg={3}>
              <Support />
            </Col>
            <Col sm={12} md={6} lg={3}>
              <Manager />
            </Col>
          </Row>
          <Row className={styles.lowFooter}>
            <Copyright />
            <Media />
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default memo(Footer)

import React, { Suspense, useContext, useEffect, useState } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import styles from './Contact.module.scss'
import Header from '../../components/main-layout/nav/Header'
import SideBar from '../../components/main-layout/sidebar/SideBar'
import { apiURL } from '../../context/constants'
import MainButton from '../../components/utils/button/MainButton'
import ModalError from '../../components/utils/modal-error/ModalError'
import { ErrorContext } from '../../context/ErrorContext'

const Footer = React.lazy(() =>
  import('../../components/main-layout/footer/Footer')
)

const Contact = () => {
  const { onShowError } = useContext(ErrorContext)

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => (document.title = 'Liên hệ với F8'), [])

  const submitContact = async (e) => {
    e.preventDefault()

    const validInput =
      fullName !== '' || email !== '' || phoneNumber !== '' || content !== ''

    if (validInput) {
      const url = `${apiURL}/help/contact`
      await postContact(url)
    }
  }

  const postContact = async (url) => {
    try {
      return await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          fullName,
          email,
          phoneNumber,
          content,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      consoleLog(error.message)
      onShowError()
    }
  }

  return (
    <>
      <ModalError />

      <Header />
      <Row>
        <Col xs={0} sm={0} md={1} lg={1} xl={1}>
          <SideBar />
        </Col>
        <Col xs={12} sm={12} md={12} lg={11} xl={11}>
          <div className="withSidebarContent">
            <div className="container">
              <div className="containerTop">
                <h1 className="mainHeadingTitle">Liên hệ</h1>
              </div>
              <Form className={styles.formContact} onSubmit={submitContact}>
                <Form.Group
                  className={styles.formGroup}
                  controlId="formBasicEmail"
                >
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control
                    onChange={(e) => setFullName(e.target.value)}
                    type="text"
                    placeholder="Nhập tên đầy đủ..."
                  />
                </Form.Group>
                <Form.Group
                  className={styles.formGroup}
                  controlId="formBasicEmail"
                >
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Nhập email..."
                  />
                </Form.Group>
                <Form.Group
                  className={styles.formGroup}
                  controlId="formBasicEmail"
                >
                  <Form.Label>Điện thoại</Form.Label>
                  <Form.Control
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    type="text"
                    placeholder="Nhập số điện thoại..."
                  />
                </Form.Group>
                <Form.Group
                  className={styles.formGroup}
                  controlId="formBasicEmail"
                >
                  <Form.Label>Nội dung</Form.Label>
                  <Form.Control
                    onChange={(e) => setContent(e.target.value)}
                    as={'textarea'}
                    rows={4}
                    placeholder="Nhập nội dung liên hệ..."
                  />
                </Form.Group>
                <MainButton
                  type="submit"
                  className={styles.button}
                  primary={true}
                >
                  Gửi đi
                </MainButton>
              </Form>
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

export default Contact

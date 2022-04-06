import React, { Suspense, useEffect, useState } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import styles from './Contact.module.scss'
import Header from '../../components/main-layout/nav/Header'
import SideBar from '../../components/main-layout/sidebar/SideBar'
import { apiURL } from '../../context/constants'
import MainToast from '../../components/utils/toast/MainToast'
import MainButton from '../../components/utils/button/MainButton'

const Footer = React.lazy(() =>
  import('../../components/main-layout/footer/Footer'),
)

const Contact = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [content, setContent] = useState('')
  const [createStatus, setCreateStatus] = useState({
    isSuccess: false,
    show: false,
  })

  useEffect(() => {
    document.title = 'Liên hệ với F8'
  }, [])

  const createStatusHandler = (isSuccess, show) => {
    setCreateStatus((prev) => {
      return {
        ...prev,
        isSuccess,
        show,
      }
    })
  }

  const submitContactHandler = async (e) => {
    e.preventDefault()

    if (fullName === '' || email === '' || phoneNumber === '' || content === '')
      return

    try {
      const res = await fetch(`${apiURL}/help/contact`, {
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

      const data = await res.json()
      data.success
        ? createStatusHandler(true, true)
        : createStatusHandler(false, true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
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
              <Form
                className={styles.formContact}
                onSubmit={submitContactHandler}
              >
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

      <MainToast
        createStatus={createStatus}
        setCreateStatus={() =>
          setCreateStatus((prev) => {
            return {
              ...prev,
              show: false,
            }
          })
        }
        successText={'Gửi thông tin liên hệ thành công'}
        failText={'Gửi thông tin liên hệ không thành công'}
      />

      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </>
  )
}

export default Contact

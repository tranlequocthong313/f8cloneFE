import { useContext, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import styles from './Contact.module.scss'
import { apiURL } from '../../context/constants'
import MainButton from '../../utils/button/MainButton'
import { ModalContext } from '../../context/ModalContext'
import consoleLog from '../../utils/console-log/consoleLog'

const Contact = () => {
  const { onShowError } = useContext(ModalContext)

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
      <div className="container">
        <div className="containerTop">
          <h1 className="mainHeadingTitle">Liên hệ</h1>
        </div>
        <Form className={styles.formContact} onSubmit={submitContact}>
          <Form.Group className={styles.formGroup} controlId="formBasicEmail">
            <Form.Label>Họ và tên</Form.Label>
            <Form.Control
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              placeholder="Nhập tên đầy đủ..."
            />
          </Form.Group>
          <Form.Group className={styles.formGroup} controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Nhập email..."
            />
          </Form.Group>
          <Form.Group className={styles.formGroup} controlId="formBasicEmail">
            <Form.Label>Điện thoại</Form.Label>
            <Form.Control
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="text"
              placeholder="Nhập số điện thoại..."
            />
          </Form.Group>
          <Form.Group className={styles.formGroup} controlId="formBasicEmail">
            <Form.Label>Nội dung</Form.Label>
            <Form.Control
              onChange={(e) => setContent(e.target.value)}
              as={'textarea'}
              rows={4}
              placeholder="Nhập nội dung liên hệ..."
            />
          </Form.Group>
          <MainButton type="submit" className={styles.button} primary={true}>
            Gửi đi
          </MainButton>
        </Form>
      </div>
    </>
  )
}

export default Contact

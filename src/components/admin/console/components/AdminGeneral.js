import React from 'react'
import {
  Form,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap'
import MainButton from '../../../utils/button/MainButton'
import styles from './AdminGeneral.module.scss'

const AdminGeneral = () => {
  return (
    <Form className={styles.wrapper}>
      <FormGroup className={styles.formItem}>
        <FormLabel>Tên</FormLabel>
        <FormControl />
      </FormGroup>
      <FormGroup className={styles.formItem}>
        <FormLabel>Chương học</FormLabel>
        <FormControl />
      </FormGroup>
      <FormGroup className={styles.formItem}>
        <FormLabel>Bài học video</FormLabel>
        <div className="d-flex mb-3">
          <FormCheck
            type="radio"
            label="Tải lên"
            className={styles.formCheck}
          />
          <FormCheck
            type="radio"
            label="Youtube"
            className={styles.formCheck}
          />
        </div>
        <FormControl style={{ width: '50%' }} />
      </FormGroup>
      <MainButton primary={true} className={styles.submitButton}>
        Lưu lại
      </MainButton>
    </Form>
  )
}

export default AdminGeneral

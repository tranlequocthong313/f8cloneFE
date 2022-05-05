import React from 'react'
import {
  Form,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap'
import styles from './AdminGeneral.module.scss'

const AdminGeneral = () => {
  return (
    <Form className={styles.wrapper}>
      <FormGroup>
        <FormLabel>Tên</FormLabel>
        <FormControl />
      </FormGroup>
      <FormGroup>
        <FormLabel>Chương học</FormLabel>
        <FormControl />
      </FormGroup>
      <FormGroup>
        <FormLabel>Bài học video</FormLabel>
        <div className="d-flex">
          <FormCheck type="radio" label="Tải lên" />
          <FormCheck type="radio" label="Youtube" />
        </div>
        <FormControl />
      </FormGroup>
    </Form>
  )
}

export default AdminGeneral

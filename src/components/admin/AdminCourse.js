import React from 'react'
import { Form } from 'react-bootstrap'
import MainTable from '../utils/table/MainTable'
import styles from './AdminCourse.module.scss'

const AdminCourse = ({ courseData }) => {
  const formatStudentCount = (number) =>
    new Intl.NumberFormat(['ban', 'id']).format(number)

  return (
    <MainTable>
      <thead>
        <tr>
          <th>
            <Form>
              <Form.Check type={'checkbox'} />
            </Form>
          </th>
          <th className={styles.tableItem}>STT</th>
          <th>Tên khóa học</th>
          <th className={styles.tableItem}>Cấp độ</th>
          <th className={styles.tableItem}>Vai trò</th>
          <th className={styles.tableItem}>Yêu cầu</th>
          <th className={styles.tableItem}>Số lượng học sinh</th>
          <th className={styles.tableItem}>Thời gian tạo</th>
          <th className={styles.tableItem}>Thời gian sửa</th>
        </tr>
      </thead>
      <tbody>
        {courseData.map((course, index) => (
          <tr key={course._id}>
            <td>
              <Form>
                <Form.Check type={'checkbox'} />
              </Form>
            </td>
            <td className={styles.tableItem}>{index + 1}</td>
            <td>{course.title}</td>
            <td className={styles.tableItem}>{course.level}</td>
            <td className={styles.tableItem}>
              {course.role.FE && course.role.BE
                ? 'Fullstack'
                : course.role.FE || course.role.BE}
            </td>
            <td className={styles.tableItem}>
              {course.requirement ? 'Yes' : 'No'}
            </td>
            <td className={styles.tableItem}>
              {formatStudentCount(course.studentCount)}
            </td>
            <td className={styles.tableItem}>{course.createdAt}</td>
            <td className={styles.tableItem}>{course.updatedAt}</td>
          </tr>
        ))}
      </tbody>
    </MainTable>
  )
}

export default AdminCourse

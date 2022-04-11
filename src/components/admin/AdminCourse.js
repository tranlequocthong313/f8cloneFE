import React from 'react'
import { Form } from 'react-bootstrap'
import MainTable from '../utils/table/MainTable'

const AdminCourse = ({ courseData }) => {
  console.log(courseData)

  return (
    <MainTable>
      <thead>
        <tr>
          <th>
            <Form>
              <Form.Check type={'checkbox'} />
            </Form>
          </th>
          <th>STT</th>
          <th>Tên khóa học</th>
          <th>Cấp độ</th>
          <th>Vai trò</th>
          <th>Thời gian tạo</th>
          <th>Thời gian sửa</th>
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
            <td>{index + 1}</td>
            <td>{course.title}</td>
            <td>{course.level}</td>
            <td>
              {course.role.FE && course.role.BE
                ? 'Fullstack'
                : course.role.FE || course.role.BE}
            </td>
            <td>{course.createdAt}</td>
            <td>{course.updatedAt}</td>
          </tr>
        ))}
      </tbody>
    </MainTable>
  )
}

export default AdminCourse

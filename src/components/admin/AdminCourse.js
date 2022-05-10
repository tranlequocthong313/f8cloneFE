import { useContext, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { apiURL } from '../../context/constants'
import MainTable from '../../utils/table/MainTable'
import styles from './AdminCourse.module.scss'
import { ModalContext } from '../../context/ModalContext'
import consoleLog from '../../utils/console-log/consoleLog'
import { Link } from 'react-router-dom'
import {
  formatNumber,
  formatDateToLocaleString,
} from '../../utils/format/index'
import ModalConfirm from '../../utils/modal/ModalConfirm'
import Cookies from 'js-cookie'

const AdminCourse = ({ courseData, setCourseData }) => {
  const { onShowError, onShowConfirm, onHideConfirm } = useContext(ModalContext)

  const [checkboxChosen, setCheckboxChosen] = useState([])
  const [checkboxChosenAll, setCheckboxChosenAll] = useState([])
  const [isCheckboxChosenAll, setIsCheckboxChosenAll] = useState(false)

  useEffect(() => {
    const courseIds = courseData.map((course) => course._id)
    setCheckboxChosenAll(courseIds)
  }, [courseData])

  const checkBoxChosenSingle = (id) =>
    setCheckboxChosen((prev) => {
      const isChosen = prev.includes(id)

      if (isChosen) {
        const newChosen = prev.filter((item) => item !== id)
        setIsCheckboxChosenAll(false)
        return newChosen
      }
      const newChosen = [...prev, id]
      const isChosenAllCheckbox = newChosen.length === checkboxChosenAll.length
      isChosenAllCheckbox && setIsCheckboxChosenAll(true)
      return newChosen
    })

  const uncheckAll = () => {
    setCheckboxChosen([])
    setIsCheckboxChosenAll(false)
  }

  const checkAll = () => {
    setCheckboxChosen(checkboxChosenAll)
    setIsCheckboxChosenAll(true)
  }

  const handleCheckBoxChosenAll = () =>
    isCheckboxChosenAll ? uncheckAll() : checkAll()

  const deleteCourseIsChosen = async () => {
    onHideConfirm()

    const url = `${apiURL}/admin/course/delete-soft`
    const data = await deleteCourse(url)

    setCourseData(data)
    uncheckAll()
  }

  const deleteCourse = async (url) => {
    const token = Cookies.get('token')
    if (!token) return

    try {
      return (
        await fetch(url, {
          method: 'DELETE',
          body: JSON.stringify({ courseId: checkboxChosen }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      ).json()
    } catch (error) {
      consoleLog(error.message)
      onShowError()
    }
  }

  const changePopularState = async (courseId, isPopular) => {
    const url = `${apiURL}/admin/course/add-popular`
    const data = await patchPopular(url, courseId, isPopular)

    setCourseData(data)
  }

  const patchPopular = async (url, courseId, isPopular) => {
    const token = Cookies.get('token')
    if (!token) return

    try {
      return (
        await fetch(url, {
          method: 'PATCH',
          body: JSON.stringify({ courseId, isPopular }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      ).json()
    } catch (error) {
      consoleLog(error.message)
      onShowError()
    }
  }

  return (
    <>
      <MainTable>
        <thead>
          <tr>
            <th>
              <Form>
                <Form.Check
                  checked={isCheckboxChosenAll}
                  onChange={handleCheckBoxChosenAll}
                />
              </Form>
            </th>
            <th>STT</th>
            <th>Tên khóa học</th>
            <th>Số chương</th>
            {/* <th>Số bài học</th> */}
            <th>Cấp độ</th>
            <th>Tình trạng</th>
            <th>Vai trò</th>
            <th>Yêu cầu</th>
            <th>Học sinh</th>
            <th>TG tạo</th>
            <th>TG sửa</th>
          </tr>
        </thead>
        <tbody>
          {courseData.map((course, index) => (
            <tr key={course._id}>
              <td>
                <Form>
                  <Form.Check
                    checked={checkboxChosen.includes(course._id)}
                    type={'checkbox'}
                    onChange={() => checkBoxChosenSingle(course._id)}
                  />
                </Form>
              </td>
              <td>{index + 1}</td>
              <td>{course.title}</td>
              <td>{course.episodes.length}</td>
              {/* <td>{course.episodes}</td> */}
              <td>{course.level}</td>
              <td>{course.isPopular ? 'Hiện' : 'Ẩn'}</td>
              <td>{course.role}</td>
              <td>
                {course.requirement && course.requirement.length > 0
                  ? 'Yes'
                  : 'No'}
              </td>
              <td>{formatNumber(course.studentCount)}</td>
              <td>{formatDateToLocaleString(course.createdAt)}</td>
              <td>{formatDateToLocaleString(course.updatedAt)}</td>
              <td>
                <Link to={`/admin/edit-course/${course._id}`}>
                  <i
                    title={'Chỉnh sửa khoá học'}
                    className={
                      checkboxChosen.includes(course._id)
                        ? `fa-solid fa-pen ${styles.buttonIcon} ${styles.disabled}`
                        : `fa-solid fa-pen ${styles.buttonIcon}`
                    }
                  ></i>
                </Link>
                <Link to={`/admin/lessons/${course._id}`}>
                  <i
                    title={'Quản lý bài học'}
                    className={
                      checkboxChosen.includes(course._id)
                        ? `fa-solid fa-book ${styles.lessons}  ${styles.buttonIcon} ${styles.disabled}`
                        : `fa-solid fa-book ${styles.lessons} ${styles.buttonIcon} `
                    }
                  ></i>
                </Link>
                {!checkboxChosen.includes(course._id) && (
                  <i
                    onClick={() =>
                      changePopularState(course._id, course.isPopular)
                    }
                    title={
                      course.isPopular
                        ? 'Xóa khỏi course nổi bật'
                        : 'Thêm vào course nổi bật'
                    }
                    className={
                      course.isPopular
                        ? `fa-solid fa-circle-minus ${styles.buttonIcon} ${styles.removePopular}`
                        : `fa-solid fa-circle-plus ${styles.buttonIcon} ${styles.addPopular}`
                    }
                  ></i>
                )}
                {checkboxChosen.includes(course._id) && (
                  <i
                    className={
                      course.isPopular
                        ? `fa-solid fa-circle-minus ${styles.buttonIcon} ${styles.removePopular} ${styles.disabled}`
                        : `fa-solid fa-circle-plus ${styles.buttonIcon} ${styles.addPopular} ${styles.disabled}`
                    }
                  ></i>
                )}
                <i
                  onClick={onShowConfirm}
                  title={'Xóa course'}
                  className={
                    checkboxChosen.includes(course._id)
                      ? `fa-solid fa-trash ${styles.buttonIcon} ${styles.delete}`
                      : `fa-solid fa-trash ${styles.buttonIcon} ${styles.delete} ${styles.disabled}`
                  }
                ></i>
              </td>
            </tr>
          ))}
          {courseData.length === 0 && (
            <tr>
              <td colSpan="10">Không có dữ liệu.</td>
            </tr>
          )}
        </tbody>
      </MainTable>
      <ModalConfirm
        onConfirm={deleteCourseIsChosen}
        body={'Bạn có đồng ý xóa khóa học?'}
        header={'Xóa khóa học'}
      />
    </>
  )
}

export default AdminCourse

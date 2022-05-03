import { useContext, useEffect, useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { apiURL } from '../../context/constants'
import MainButton from '../utils/button/MainButton'
import MainTable from '../utils/table/MainTable'
import styles from './AdminBlog.module.scss'
import { ErrorContext } from '../../context/ErrorContext'
import ModalError from '../../components/utils/modal-error/ModalError'
import consoleLog from '../utils/console-log/consoleLog'

const AdminBlog = ({ blogData, setBlogData }) => {
  const { onShowError } = useContext(ErrorContext)

  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [checkboxChosen, setCheckboxChosen] = useState([])
  const [checkboxChosenAll, setCheckboxChosenAll] = useState([])
  const [isCheckboxChosenAll, setIsCheckboxChosenAll] = useState(false)

  useEffect(() => {
    const blogIds = blogData.map((blog) => blog._id)
    setCheckboxChosenAll(blogIds)
  }, [blogData])

  const showDeleteModal = () => setIsShowDeleteModal((prev) => !prev)

  const formatDateToLocaleString = (date) => new Date(date).toLocaleString()

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

  const deleteBlogIsChosen = async () => {
    showDeleteModal()

    const url = `${apiURL}/admin/blog/delete-soft`
    const data = await deleteBlog(url)

    setBlogData(data)
    uncheckAll()
  }

  const deleteBlog = async (url) => {
    try {
      return (
        await fetch(url, {
          method: 'DELETE',
          body: JSON.stringify({ blogId: checkboxChosen }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      ).json()
    } catch (error) {
      consoleLog(error.message)
      onShowError()
    }
  }

  const changePopularState = async (blogId, isPopular) => {
    const url = `${apiURL}/admin/blog/add-popular`
    const data = await patchPopular(url, blogId, isPopular)

    setBlogData(data)
  }

  const patchPopular = async (url, blogId, isPopular) => {
    try {
      return (
        await fetch(url, {
          method: 'PATCH',
          body: JSON.stringify({ blogId, isPopular }),
          headers: {
            'Content-Type': 'application/json',
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
      <ModalError />
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
            <th>Tên bài viết</th>
            <th>Tác giả</th>
            <th>Đề xuất</th>
            <th>Tình trạng</th>
            <th>Đã xét duyệt</th>
            <th>TG tạo</th>
            <th>TG sửa</th>
          </tr>
        </thead>
        <tbody>
          {blogData.map((blog, index) => (
            <tr key={blog._id}>
              <td>
                <Form>
                  <Form.Check
                    checked={checkboxChosen.includes(blog._id)}
                    type={'checkbox'}
                    onChange={() => checkBoxChosenSingle(blog._id)}
                  />
                </Form>
              </td>
              <td>{index + 1}</td>
              <td className={styles.breakWord}>{blog.title}</td>
              <td>{blog.postedBy.fullName}</td>
              <td>{blog.allowRecommend ? 'Yes' : 'No'}</td>
              <td>{blog.isPopular ? 'Hiện' : 'Ẩn'}</td>
              <td>{blog.isVerified ? 'Yes' : 'No'}</td>
              <td>{formatDateToLocaleString(blog.createdAt)}</td>
              <td>{formatDateToLocaleString(blog.updatedAt)}</td>
              <td>
                {blog.allowRecommend && blog.isVerified && (
                  <>
                    {!checkboxChosen.includes(blog._id) && (
                      <i
                        onClick={() =>
                          changePopularState(blog._id, blog.isPopular)
                        }
                        title={
                          blog.isPopular
                            ? 'Xóa khỏi blog nổi bật'
                            : 'Thêm vào blog nổi bật'
                        }
                        className={
                          blog.isPopular
                            ? `fa-solid fa-circle-minus ${styles.buttonIcon} ${styles.removePopular}`
                            : `fa-solid fa-circle-plus ${styles.buttonIcon} ${styles.addPopular}`
                        }
                      ></i>
                    )}

                    {checkboxChosen.includes(blog._id) && (
                      <i
                        className={
                          blog.isPopular
                            ? `fa-solid fa-circle-minus ${styles.buttonIcon} ${styles.removePopular} ${styles.disabled}`
                            : `fa-solid fa-circle-plus ${styles.buttonIcon} ${styles.addPopular} ${styles.disabled}`
                        }
                      ></i>
                    )}
                  </>
                )}
                <i
                  onClick={showDeleteModal}
                  title={'Xóa blog'}
                  className={
                    checkboxChosen.includes(blog._id)
                      ? `fa-solid fa-trash ${styles.buttonIcon} ${styles.delete}`
                      : `fa-solid fa-trash ${styles.buttonIcon} ${styles.delete} ${styles.disabled}`
                  }
                ></i>
                <Link to={`/blog/${blog._id}`}>
                  <i
                    title={'Truy cập bài viết'}
                    className={`fa-solid fa-arrow-up-right-from-square ${styles.buttonIcon}`}
                  ></i>
                </Link>
              </td>
            </tr>
          ))}
          {blogData.length === 0 && (
            <tr>
              <td colSpan="10">Không có dữ liệu.</td>
            </tr>
          )}
        </tbody>
      </MainTable>
      <Modal
        show={isShowDeleteModal}
        onHide={showDeleteModal}
        className={styles.createModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Xóa blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Đồng ý xóa blog?</p>
        </Modal.Body>

        <Modal.Footer>
          <MainButton onClick={deleteBlogIsChosen}>Đồng ý</MainButton>
          <MainButton onClick={showDeleteModal}>Hủy</MainButton>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AdminBlog

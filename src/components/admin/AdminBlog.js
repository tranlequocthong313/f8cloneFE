import { useEffect, useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { createBlog } from '../../actions/userAction'
import { apiURL } from '../../context/constants'
import MainButton from '../utils/button/MainButton'
import MainTable from '../utils/table/MainTable'
import styles from './AdminBlog.module.scss'

const AdminBlog = ({ blogData }) => {
  const formatTimeHandler = (date) => new Date(date).toLocaleString()

  const dispatch = useDispatch()

  const [showModal, setShowModal] = useState(false)
  const [check, setCheck] = useState([])
  const [checkAll, setCheckAll] = useState([])
  const [isCheckAll, setIsCheckAll] = useState(false)

  useEffect(() => {
    const blogId = blogData.map((blog) => blog._id)
    setCheckAll(blogId)
  }, [blogData])

  const checkHandler = (id) =>
    setCheck((prev) => {
      const isChecked = prev.includes(id)
      if (isChecked) {
        const newArray = prev.filter((item) => item !== id)
        setIsCheckAll(false)
        return newArray
      }
      const newArray = [...prev, id]
      newArray.length === checkAll.length && setIsCheckAll(true)
      return newArray
    })

  const checkAllHandler = () => {
    if (!isCheckAll) {
      setCheck(checkAll)
      return setIsCheckAll(true)
    }
    setCheck([])
    setIsCheckAll(false)
  }

  const showModalHandler = () => setShowModal((prev) => !prev)

  const deleteBlogHandler = async () => {
    try {
      showModalHandler()
      const res = await fetch(`${apiURL}/admin/blog/delete-soft`, {
        method: 'POST',
        body: JSON.stringify({ blogId: check }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await res.json()
      console.log(data)
      dispatch(createBlog({ blogData: data.blog }))
    } catch (error) {
      console.log(error)
    } finally {
      setCheck([])
      setIsCheckAll(false)
    }
  }

  const setPopularHandler = async (blogId, isPopular) => {
    try {
      const res = await fetch(`${apiURL}/admin/blog/add-popular`, {
        method: 'POST',
        body: JSON.stringify({ blogId, isPopular }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await res.json()
      dispatch(createBlog({ blogData: data.blog }))
    } catch (error) {
      console.log(error)
    } finally {
      setCheck([])
      setIsCheckAll(false)
    }
  }

  return (
    <>
      <MainTable>
        <thead>
          <tr>
            <th>
              <Form>
                <Form.Check checked={isCheckAll} onChange={checkAllHandler} />
              </Form>
            </th>
            <th className={styles.tableItem}>STT</th>
            <th className={styles.tableItem}>Tên bài viết</th>
            <th className={styles.tableItem}>Tên tác giả</th>
            <th className={styles.tableItem}>Được phép đề xuất</th>
            <th className={styles.tableItem}>Tình trạng</th>
            <th className={styles.tableItem}>Đã xét duyệt</th>
            <th className={styles.tableItem}>Thời gian tạo</th>
          </tr>
        </thead>
        <tbody>
          {blogData.length !== 0 &&
            blogData.map((blog, index) => (
              <tr key={blog._id}>
                <td>
                  <Form>
                    <Form.Check
                      checked={check.includes(blog._id)}
                      type={'checkbox'}
                      onChange={() => checkHandler(blog._id)}
                    />
                  </Form>
                </td>
                <td className={styles.tableItem}>{index + 1}</td>
                <td>{blog.title}</td>
                <td className={styles.tableItem}>{blog.postedBy.fullName}</td>
                <td className={styles.tableItem}>
                  {blog.allowRecommend ? 'Yes' : 'No'}
                </td>
                <td className={styles.tableItem}>
                  {blog.isPopular ? 'Hiện' : 'Ẩn'}
                </td>
                <td className={styles.tableItem}>
                  {blog.isVerified ? 'Yes' : 'No'}
                </td>
                <td className={styles.tableItem}>
                  {formatTimeHandler(blog.createdAt)}
                </td>
                <td>
                  {blog.allowRecommend && blog.isVerified && (
                    <>
                      {!check.includes(blog._id) && (
                        <i
                          onClick={() =>
                            setPopularHandler(blog._id, blog.isPopular)
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
                      {check.includes(blog._id) && (
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
                    onClick={showModalHandler}
                    title={'Xóa blog'}
                    className={
                      check.includes(blog._id)
                        ? `fa-solid fa-trash ${styles.buttonIcon} ${styles.delete}`
                        : `fa-solid fa-trash ${styles.buttonIcon} ${styles.delete} ${styles.disabled}`
                    }
                  ></i>
                  <Link to={`/blog/${blog.slug}`}>
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
              <td colSpan="10" className={styles.tableItem}>
                Không có dữ liệu.
              </td>
            </tr>
          )}
        </tbody>
      </MainTable>
      <Modal
        show={showModal}
        onHide={showModalHandler}
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
          <MainButton onClick={deleteBlogHandler}>Đồng ý</MainButton>
          <MainButton onClick={showModalHandler}>Hủy</MainButton>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AdminBlog

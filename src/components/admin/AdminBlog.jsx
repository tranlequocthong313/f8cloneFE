import { useEffect, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { createBlog } from '../../actions/userAction';
import { apiURL } from '../../context/constants';
import MainButton from '../utils/button/MainButton';
import MainTable from '../utils/table/MainTable';
import styles from './AdminBlog.module.scss';

const AdminBlog = ({ blogData }) => {
  const dispatch = useDispatch();

  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [checkboxChosen, setCheckboxChosen] = useState([]);
  const [checkboxChosenAll, setCheckboxChosenAll] = useState([]);
  const [isCheckboxChosenAll, setIsCheckboxChosenAll] = useState(false);

  useEffect(() => {
    const blogIds = blogData?.map((blog) => blog._id);
    setCheckboxChosenAll(blogIds);
  }, [blogData]);

  const showDeleteModal = () => setIsShowDeleteModal((prev) => !prev);

  const formatDateToLocaleString = (date) => new Date(date).toLocaleString();

  const checkBoxChosenSingle = (id) =>
    setCheckboxChosen((prev) => {
      const isChosen = prev.includes(id);

      if (isChosen) {
        const newChosen = prev.filter((item) => item !== id);
        setIsCheckboxChosenAll(false);
        return newChosen;
      }
      const newChosen = [...prev, id];
      const isChosenAllCheckbox = newChosen.length === checkboxChosenAll.length;
      isChosenAllCheckbox && setIsCheckboxChosenAll(true);
      return newChosen;
    });

  const handleCheckBoxChosenAll = () => {
    if (isCheckboxChosenAll) {
      setCheckboxChosen([]);
      setIsCheckboxChosenAll(false);
    } else {
      setCheckboxChosen(checkboxChosenAll);
      setIsCheckboxChosenAll(true);
    }
  };

  const deleteBlogIsChosen = async () => {
    try {
      showDeleteModal();
      const res = await fetch(`${apiURL}/admin/blog/delete-soft`, {
        method: 'POST',
        body: JSON.stringify({ blogId: checkboxChosen }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      dispatch(createBlog({ blogData: data.blog }));
    } catch (error) {
      console.log(error.message);
    } finally {
      setCheckboxChosen([]);
      setIsCheckboxChosenAll(false);
    }
  };

  const changePopularState = async (blogId, isPopular) => {
    try {
      const res = await fetch(`${apiURL}/admin/blog/add-popular`, {
        method: 'POST',
        body: JSON.stringify({ blogId, isPopular }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      dispatch(createBlog({ blogData: data.blog }));
    } catch (error) {
      console.log(error.message);
    } finally {
      setCheckboxChosen([]);
      setIsCheckboxChosenAll(false);
    }
  };

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
            <th className={styles.tableItem}>STT</th>
            <th className={styles.tableItem}>Tên bài viết</th>
            <th className={styles.tableItem}>Tác giả</th>
            <th className={styles.tableItem}>Được phép đề xuất</th>
            <th className={styles.tableItem}>Tình trạng</th>
            <th className={styles.tableItem}>Đã xét duyệt</th>
            <th className={styles.tableItem}>Thời gian tạo</th>
            <th className={styles.tableItem}>Thời gian sửa</th>
          </tr>
        </thead>
        <tbody>
          {blogData?.map((blog, index) => (
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
              <td className={styles.tableItem}>{index + 1}</td>
              <td className={styles.breakWord}>{blog.title}</td>
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
                {formatDateToLocaleString(blog.createdAt)}
              </td>
              <td className={styles.tableItem}>
                {formatDateToLocaleString(blog.updatedAt)}
              </td>
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
  );
};

export default AdminBlog;

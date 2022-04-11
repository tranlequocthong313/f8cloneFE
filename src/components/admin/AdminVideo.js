import React, { useEffect, useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { createVideo } from '../../actions/userAction'
import { apiURL } from '../../context/constants'
import MainButton from '../utils/button/MainButton'
import MainTable from '../utils/table/MainTable'
import timeSinceHandler from '../utils/timeSinceHandler/timeSinceHandler'
import MainToast from '../utils/toast/MainToast'
import styles from './AdminVideo.module.scss'
import youtubeDurationFormat from 'youtube-duration-format'

const AdminVideo = ({ videoData }) => {
  const dispatch = useDispatch()

  const [showModal, setShowModal] = useState(false)
  const [check, setCheck] = useState([])
  const [checkAll, setCheckAll] = useState([])
  const [isCheckAll, setIsCheckAll] = useState(false)

  useEffect(() => {
    const videoId = videoData.map((video) => video._id)
    setCheckAll(videoId)
  }, [videoData])

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

  const formatTimeHandler = (date) => new Date(date).toLocaleString()

  const deleteVideoHandler = async () => {
    try {
      showModalHandler()
      const res = await fetch(`${apiURL}/admin/video/delete-soft`, {
        method: 'POST',
        body: JSON.stringify({ videoId: check }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await res.json()
      dispatch(createVideo({ videoData: data.video }))
      console.log(data.video)
    } catch (error) {
      console.log(error)
    } finally {
      setCheck([])
      setIsCheckAll(false)
    }
  }

  const setPopularHandler = async (id, isPopular) => {
    try {
      const res = await fetch(`${apiURL}/admin/video/add-popular`, {
        method: 'POST',
        body: JSON.stringify({ videoId: id, isPopular }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await res.json()
      dispatch(createVideo({ videoData: data.video }))
      console.log(data.video)
    } catch (error) {
      console.log(error)
    } finally {
      setCheck([])
      setIsCheckAll(false)
    }
  }

  const formatDuration = (duration) => {
    const durationFormatted = youtubeDurationFormat(duration)
    return durationFormatted
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
            <th className={styles.tableItem}>Tên video</th>
            <th className={styles.tableItem}>Thời gian</th>
            <th className={styles.tableItem}>Tình trạng</th>
            <th className={styles.tableItem}>Thời gian tạo</th>
          </tr>
        </thead>
        <tbody>
          {videoData.length !== 0 &&
            videoData.map((video, index) => (
              <tr key={video._id}>
                <td>
                  <Form>
                    <Form.Check
                      checked={check.includes(video._id)}
                      type={'checkbox'}
                      onChange={() => checkHandler(video._id)}
                    />
                  </Form>
                </td>
                <td className={styles.tableItem}>{index + 1}</td>
                <td>{video.title}</td>
                <td className={styles.tableItem}>
                  {formatDuration(video.duration)}
                </td>
                <td className={styles.tableItem}>
                  {video.isPopular ? 'Hiện' : 'Ẩn'}
                </td>
                <td className={styles.tableItem}>
                  {formatTimeHandler(video.createdAt)}
                </td>
                <td>
                  {!check.includes(video._id) && (
                    <i
                      onClick={() =>
                        setPopularHandler(video._id, video.isPopular)
                      }
                      title={
                        video.isPopular
                          ? 'Xóa khỏi video nổi bật'
                          : 'Thêm vào video nổi bật'
                      }
                      className={
                        video.isPopular
                          ? `fa-solid fa-circle-minus ${styles.buttonIcon} ${styles.removePopular}`
                          : `fa-solid fa-circle-plus ${styles.buttonIcon} ${styles.addPopular}`
                      }
                    ></i>
                  )}
                  {check.includes(video._id) && (
                    <i
                      className={
                        video.isPopular
                          ? `fa-solid fa-circle-minus ${styles.buttonIcon} ${styles.removePopular} ${styles.disabled}`
                          : `fa-solid fa-circle-plus ${styles.buttonIcon} ${styles.addPopular} ${styles.disabled}`
                      }
                    ></i>
                  )}
                  <i
                    onClick={showModalHandler}
                    title={'Xóa video'}
                    className={
                      check.includes(video._id)
                        ? `fa-solid fa-trash ${styles.buttonIcon} ${styles.delete}`
                        : `fa-solid fa-trash ${styles.buttonIcon} ${styles.delete} ${styles.disabled}`
                    }
                  ></i>
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href={`https://www.youtube.com/watch?v=${video.videoId}`}
                  >
                    <i
                      title={'Truy cập video'}
                      className={`fa-solid fa-arrow-up-right-from-square ${styles.buttonIcon}`}
                    ></i>
                  </a>
                </td>
              </tr>
            ))}
          {videoData.length === 0 && (
            <tr>
              <td colSpan="5" className={styles.tableItem}>
                Không có dữ liệu.
              </td>
            </tr>
          )}
        </tbody>
      </MainTable>
      <Modal show={showModal} onHide={showModalHandler} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xóa video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Đồng ý xóa video?</p>
        </Modal.Body>

        <Modal.Footer>
          <MainButton onClick={deleteVideoHandler}>Đồng ý</MainButton>
          <MainButton onClick={showModalHandler}>Hủy</MainButton>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AdminVideo

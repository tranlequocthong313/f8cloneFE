import { useContext, useEffect, useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { apiURL } from '../../context/constants'
import { ErrorContext } from '../../context/ErrorContext'
import MainButton from '../utils/button/MainButton'
import consoleLog from '../utils/console-log/consoleLog'
import ModalError from '../utils/modal-error/ModalError'
import MainTable from '../utils/table/MainTable'
import styles from './AdminVideo.module.scss'

const AdminVideo = ({ videoData, setVideoData }) => {
  const { onShowError } = useContext(ErrorContext)

  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [checkboxChosen, setCheckboxChosen] = useState([])
  const [checkboxChosenAll, setCheckboxChosenAll] = useState([])
  const [isCheckboxChosenAll, setIsCheckboxChosenAll] = useState(false)

  useEffect(() => {
    const videoId = videoData.map((video) => video._id)
    setCheckboxChosenAll(videoId)
  }, [videoData])

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

  const deleteVideoIsChosen = async () => {
    showDeleteModal()

    const url = `${apiURL}/admin/video/delete-soft`
    const data = await deleteVideo(url)

    setVideoData(data)
    uncheckAll()
  }

  const deleteVideo = async (url) => {
    try {
      return (
        await fetch(url, {
          method: 'DELETE',
          body: JSON.stringify({ videoId: checkboxChosen }),
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

  const changePopularState = async (videoId, isPopular) => {
    const url = `${apiURL}/admin/video/add-popular`
    const data = await patchPopular(url, videoId, isPopular)

    setVideoData(data)
  }

  const patchPopular = async (url, videoId, isPopular) => {
    try {
      return (
        await fetch(url, {
          method: 'PATCH',
          body: JSON.stringify({ videoId, isPopular }),
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
            <th>Tên video</th>
            <th>Tình trạng</th>
            <th>TG tạo</th>
          </tr>
        </thead>
        <tbody>
          {videoData.map((video, index) => (
            <tr key={video._id}>
              <td>
                <Form>
                  <Form.Check
                    checked={checkboxChosen.includes(video._id)}
                    type={'checkbox'}
                    onChange={() => checkBoxChosenSingle(video._id)}
                  />
                </Form>
              </td>
              <td>{index + 1}</td>
              <td className={styles.breakWord}>{video.title}</td>
              <td>{video.isPopular ? 'Hiện' : 'Ẩn'}</td>
              <td>{formatDateToLocaleString(video.createdAt)}</td>
              <td>
                {!checkboxChosen.includes(video._id) && (
                  <i
                    onClick={() =>
                      changePopularState(video._id, video.isPopular)
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
                {checkboxChosen.includes(video._id) && (
                  <i
                    className={
                      video.isPopular
                        ? `fa-solid fa-circle-minus ${styles.buttonIcon} ${styles.removePopular} ${styles.disabled}`
                        : `fa-solid fa-circle-plus ${styles.buttonIcon} ${styles.addPopular} ${styles.disabled}`
                    }
                  ></i>
                )}
                <i
                  onClick={showDeleteModal}
                  title={'Xóa video'}
                  className={
                    checkboxChosen.includes(video._id)
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
              <td colSpan="10">Không có dữ liệu.</td>
            </tr>
          )}
        </tbody>
      </MainTable>
      <Modal show={isShowDeleteModal} onHide={isShowDeleteModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xóa video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Đồng ý xóa video?</p>
        </Modal.Body>

        <Modal.Footer>
          <MainButton onClick={deleteVideoIsChosen}>Đồng ý</MainButton>
          <MainButton onClick={showDeleteModal}>Hủy</MainButton>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AdminVideo

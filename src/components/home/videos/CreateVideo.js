import { useState } from 'react'
import { Modal, Button, Form, Spinner } from 'react-bootstrap'
import { apiURL } from '../../../context/constants'
import { useDispatch } from 'react-redux'
import styles from './CreateVideo.module.scss'
import { createVideo } from '../../../actions/userAction'
import MainToast from '../../utils/toast/MainToast'
import removeActions from '../../utils/remove-accents/removeActions'
import MainButton from '../../utils/button/MainButton'

const CreateVideo = () => {
  const dispatch = useDispatch()

  const [videoId, setVideoId] = useState('')
  const [createStatus, setCreateStatus] = useState({
    isSuccess: false,
    show: false,
  })
  const [showModal, setShowModal] = useState(false)
  const [isPopular, setIsPopular] = useState(false)
  const [loading, setLoading] = useState(false)

  const showModalHandler = () => setShowModal((prev) => !prev)

  const createStatusHandler = (isSuccess, show) => {
    setCreateStatus((prev) => {
      return {
        ...prev,
        isSuccess,
        show,
      }
    })
  }

  const getYoutubeData = async () => {
    showModalHandler()
    setLoading(true)
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&part=snippet,contentDetails,statistics,status`,
      )

      const data = await res.json()
      const youtube = data.items[0]

      const videoData = {
        videoId,
        duration: youtube.contentDetails.duration,
        title: youtube.snippet.localized.title,
        search: removeActions(youtube.snippet.localized.title),
        image: youtube.snippet.thumbnails.standard // Many videos doesn't have thumbnails standard
          ? youtube.snippet.thumbnails.standard.url
          : youtube.snippet.thumbnails.high
          ? youtube.snippet.thumbnails.high.url
          : youtube.snippet.thumbnails.medium.url,
        viewCount: +youtube.statistics.viewCount,
        likeCount: +youtube.statistics.likeCount,
        commentCount: +youtube.statistics.commentCount,
        isPopular,
      }

      createVideoHandler(videoData)
    } catch (error) {
      console.log(error)
      createStatus(false, true)
      setLoading(false)
      setIsPopular(false)
    }
  }

  const createVideoHandler = async (videoData) => {
    try {
      const res = await fetch(`${apiURL}/admin/video/create`, {
        method: 'POST',
        body: JSON.stringify(videoData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await res.json()

      dispatch(createVideo({ videoData: data.video }))
      createStatusHandler(true, true)
    } catch (error) {
      console.log(error)
      createStatusHandler(false, true)
    } finally {
      setLoading(false)
      setIsPopular(false)
    }
  }

  return (
    <>
      <MainButton
        outline={true}
        className={styles.videoCreate}
        onClick={showModalHandler}
      >
        <i className="fa-brands fa-youtube"></i>
        Tạo video
      </MainButton>
      <Modal
        show={showModal}
        onHide={showModalHandler}
        className={styles.createModal}
      >
        <Modal.Header closeButton style={{ border: 'none' }}></Modal.Header>
        <Form className={styles.createForm}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className={styles.heading}>Thêm video</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập video id"
              onChange={(e) => setVideoId(e.target.value)}
              className={styles.createVideoInput}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicEmail"
            style={{ display: 'flex' }}
          >
            <Form.Check
              onChange={() => setIsPopular((prev) => !prev)}
              style={{ margin: '0 8px' }}
            />
            <Form.Label>Youtube Video ID</Form.Label>
          </Form.Group>
        </Form>
        <Modal.Footer style={{ border: 'none' }}>
          <MainButton
            onClick={getYoutubeData}
            primary={true}
            className={
              !loading ? styles.button : `${styles.button} ${styles.disabled}`
            }
          >
            Thêm
            {loading && (
              <Spinner
                animation="border"
                size="sm"
                style={{ marginLeft: 8, color: '#fff' }}
              />
            )}
          </MainButton>
          <MainButton
            className={
              !loading
                ? `${styles.button} ${styles.cancel}`
                : `${styles.button} ${styles.cancel} ${styles.disabled}`
            }
            onClick={showModalHandler}
          >
            Hủy
          </MainButton>
        </Modal.Footer>
      </Modal>
      <MainToast
        status={createStatus}
        setStatus={() =>
          setCreateStatus((prev) => {
            return {
              ...prev,
              show: false,
            }
          })
        }
        successText={'Tạo video thành công!'}
        failText={'Tạo video không thành công!'}
      />
    </>
  )
}

export default CreateVideo

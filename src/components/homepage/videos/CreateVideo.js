import { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { apiURL } from '../../../context/constants'
import { useDispatch } from 'react-redux'
import styles from './CreateVideo.module.scss'
import { createVideo } from '../../../actions/userAction'
import MainToast from '../../utils/toast/MainToast'
import removeActions from '../../utils/remove-accents/removeActions'

const CreateVideo = () => {
  const dispatch = useDispatch()

  const [videoId, setVideoId] = useState('')
  const [createStatus, setCreateStatus] = useState({
    isSuccess: false,
    show: false,
  })
  const [showModal, setShowModal] = useState(false)
  const showModalHandler = () => setShowModal(prev => !prev)

  const createStatusHandler = (isSuccess, show) => {
    setCreateStatus(prev => {
      return {
        ...prev,
        isSuccess,
        show,
      }
    })
  }

  const getYoutubeData = async () => {
    showModalHandler()
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&part=snippet,contentDetails,statistics,status`
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
      }

      createVideoHandler(videoData)
    } catch (error) {
      console.log(error)
      createStatus(false, true)
    }
  }

  const createVideoHandler = async videoData => {
    try {
      const res = await fetch(`${apiURL}/video/create`, {
        method: 'POST',
        body: JSON.stringify(videoData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await res.json()

      if (!data.success) return createStatusHandler(false, true)

      dispatch(createVideo({ videoData }))
      createStatusHandler(true, true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className={styles.videoCreate} onClick={showModalHandler}>
        <i className="bi bi-youtube"></i> Tạo video
      </div>
      <Modal
        show={showModal}
        onHide={showModalHandler}
        className={styles.createModal}
      >
        <Modal.Header closeButton style={{ border: 'none' }}></Modal.Header>
        <Form className={styles.createForm}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Youtube Video ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập video id"
              onChange={e => setVideoId(e.target.value)}
            />
          </Form.Group>
        </Form>
        <Modal.Footer style={{ border: 'none' }}>
          <Button onClick={getYoutubeData} className={styles.createButton}>
            Tạo
          </Button>
          <Button variant="secondary" onClick={showModalHandler}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
      <MainToast
        createStatus={createStatus}
        setCreateStatus={() =>
          setCreateStatus(prev => {
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

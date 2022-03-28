import React, { useState } from 'react'
import { Modal, Button, Toast, ToastContainer, Form } from 'react-bootstrap'
import { apiURL } from '../../../context/constants'
import { useDispatch } from 'react-redux'
import styles from './CreateVideo.module.scss'
import { createVideo } from '../../../actions/userAction'
import f8logo from '../../../asset/f8_icon.png'
import MainToast from '../../utils/toast/MainToast'

const CreateVideo = () => {
  const dispatch = useDispatch()

  const [videoId, setVideoId] = useState('')
  const [createStatus, setCreateStatus] = useState({
    isSuccess: false,
    show: false,
  })
  const [showModal, setShowModal] = useState(false)

  const showModalHandler = () => setShowModal(prev => !prev)

  const getYoutubeData = async () => {
    showModalHandler()
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&part=snippet,contentDetails,statistics,status`
      )

      const data = await res.json()

      console.log(data)

      const videoData = {
        videoId,
        duration: data.items[0].contentDetails.duration,
        title: data.items[0].snippet.localized.title,
        image: data.items[0].snippet.thumbnails.standard
          ? data.items[0].snippet.thumbnails.standard.url
          : data.items[0].snippet.thumbnails.high
          ? data.items[0].snippet.thumbnails.high.url
          : data.items[0].snippet.thumbnails.medium.url,
        viewCount: +data.items[0].statistics.viewCount,
        likeCount: +data.items[0].statistics.likeCount,
        commentCount: +data.items[0].statistics.commentCount,
      }

      createVideoHandler(videoData)
    } catch (error) {
      console.log(error.message)
      setCreateStatus(prev => {
        return {
          ...prev,
          isSuccess: false,
          show: true,
        }
      })
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

      if (data.success) {
        dispatch(createVideo({ videoData }))
        setCreateStatus(prev => {
          return {
            ...prev,
            isSuccess: true,
            show: true,
          }
        })
      } else {
        setCreateStatus(prev => {
          return {
            ...prev,
            isSuccess: false,
            show: true,
          }
        })
      }
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

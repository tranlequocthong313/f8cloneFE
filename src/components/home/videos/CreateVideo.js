import { useContext, useState } from 'react'
import { Modal, Form, Spinner } from 'react-bootstrap'
import { apiURL } from '../../../context/constants'
import styles from './CreateVideo.module.scss'
import { removeActions } from '../../../utils/format/index'
import MainButton from '../../../utils/button/MainButton'
import MainModal from '../../../utils/modal/MainModal'
import { ModalContext } from '../../../context/ModalContext'
import consoleLog from '../../../utils/console-log/consoleLog'
import Cookies from 'js-cookie'

const CreateVideo = ({ setVideoData }) => {
  const { onShowError } = useContext(ModalContext)

  const [videoId, setVideoId] = useState('')
  const [isShowCreateModal, setIsShowCreateModal] = useState(false)
  const [isPopular, setIsPopular] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const showCreateVideoModal = () => setIsShowCreateModal((prev) => !prev)

  const setLoadingAndPopularFalse = () => {
    setIsLoading(false)
    setIsPopular(false)
  }

  const getYoutubeDataByAPI = async () => {
    showCreateVideoModal()
    setIsLoading(true)

    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&part=snippet,contentDetails,statistics,status`
    const data = await getYoutubeVideo(url)
    if (data) {
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

      createVideoByYoutubeAPIData(videoData)
    }
  }

  const getYoutubeVideo = async (url) => {
    try {
      return (await fetch(url)).json()
    } catch (error) {
      consoleLog(error.message)
      onShowError()
      setLoadingAndPopularFalse()
    }
  }

  const createVideoByYoutubeAPIData = async (videoData) => {
    const url = `${apiURL}/admin/video/create`
    const data = await postCreateVideo(url, videoData)
    if (!data.success) return
    setVideoData((prev) => [data.video, ...prev])
  }

  const postCreateVideo = async (url, videoData) => {
    const token = Cookies.get('token')
    if (!token) return

    try {
      return (
        await fetch(url, {
          method: 'POST',
          body: JSON.stringify(videoData),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      ).json()
    } catch (error) {
      consoleLog(error.message)
      onShowError()
    } finally {
      setLoadingAndPopularFalse()
    }
  }

  return (
    <>
      <MainButton
        outline={true}
        className={styles.videoCreate}
        onClick={showCreateVideoModal}
      >
        <i className="fa-brands fa-youtube"></i>
        Tạo video
      </MainButton>
      <MainModal
        show={isShowCreateModal}
        onHide={showCreateVideoModal}
        className={styles.createModal}
        centered={true}
        closeButton={true}
      >
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
            onClick={getYoutubeDataByAPI}
            primary={true}
            className={
              !isLoading ? styles.button : `${styles.button} ${styles.disabled}`
            }
          >
            Thêm
            {isLoading && (
              <Spinner
                animation="border"
                size="sm"
                style={{ marginLeft: 8, color: '#fff' }}
              />
            )}
          </MainButton>
          <MainButton
            className={
              !isLoading
                ? `${styles.button} ${styles.cancel}`
                : `${styles.button} ${styles.cancel} ${styles.disabled}`
            }
            onClick={isShowCreateModal}
          >
            Hủy
          </MainButton>
        </Modal.Footer>
      </MainModal>
    </>
  )
}

export default CreateVideo

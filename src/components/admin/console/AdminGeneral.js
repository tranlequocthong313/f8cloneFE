import { useContext, useEffect, useState } from 'react'
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { apiURL } from '../../../context/constants'
import { ModalContext } from '../../../context/ModalContext'
import MainButton from '../../../utils/button/MainButton'
import consoleLog from '../../../utils/console-log/consoleLog'
import styles from './AdminGeneral.module.scss'
import Cookies from 'js-cookie'
import { LessonContext } from '../../../context/LessonContext'

const AdminGeneral = ({
  episodes,
  setEpisodes,
  courseId,
  titleLesson,
  videoIdLesson,
  lessonId,
  manageMode,
}) => {
  const user = useSelector((state) => state.user)
  const { onShowError } = useContext(ModalContext)
  const { episodeChosenId } = useContext(LessonContext)

  const [episodeChosen, setEpisodeChosen] = useState(
    episodeChosenId ? episodeChosenId : ''
  )
  const [title, setTitle] = useState('')
  const [videoId, setVideoId] = useState('')

  useEffect(() => {
    setTitle(titleLesson ? titleLesson : '')
    setVideoId(videoIdLesson ? videoIdLesson : '')
    setEpisodeChosen(episodeChosenId ? episodeChosenId : '')
  }, [videoIdLesson, titleLesson, episodeChosenId])

  const getYoutubeDataByAPI = async () => {
    if (!videoId) return

    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&part=snippet,contentDetails,statistics,status`
    const data = await getYoutubeVideo(url)
    if (data) {
      const youtube = data.items[0]
      const lessonData = {
        videoId,
        duration: youtube.contentDetails.duration,
        title: title ? title : youtube.snippet.localized.title,
        episodeParent: episodeChosen,
        postedBy: user.userId,
      }

      manageMode === 'add-lesson'
        ? createLesson(lessonData)
        : editLesson(lessonData)
    }
  }

  const getYoutubeVideo = async (url) => {
    try {
      return (await fetch(url)).json()
    } catch (error) {
      consoleLog(error.message)
      onShowError()
    }
  }

  const createLesson = async (lessonData) => {
    const url = `${apiURL}/lessons/create-lesson/${courseId}`
    const data = await postCreateLesson(url, lessonData)

    setEpisodes(data.episodes)
    setTitle('')
    setVideoId('')
  }

  const postCreateLesson = async (url, lessonData) => {
    const token = Cookies.get('token')
    if (!token) return

    try {
      return (
        await fetch(url, {
          method: 'POST',
          body: JSON.stringify(lessonData),
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

  const editLesson = async (lessonData) => {
    const url = `${apiURL}/lessons/edit-lesson/${courseId}/${episodeChosenId}/${lessonId}`
    const data = await putCreateLesson(url, lessonData)

    setEpisodes(data.episodes)
    setTitle('')
    setVideoId('')
    setEpisodeChosen(episodes[0]._id)
  }

  const putCreateLesson = async (url, lessonData) => {
    const token = Cookies.get('token')
    if (!token) return

    try {
      return (
        await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(lessonData),
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
    <Form className={styles.wrapper} onSubmit={(e) => e.preventDefault()}>
      <FormGroup className={styles.formItem}>
        <FormLabel>Tên</FormLabel>
        <FormControl value={title} onChange={(e) => setTitle(e.target.value)} />
      </FormGroup>
      <FormGroup className={styles.formItem}>
        <FormLabel>Chương học</FormLabel>
        <Form.Select
          value={episodeChosen}
          onChange={(e) => setEpisodeChosen(e.target.value)}
        >
          {episodes.map((episode) => (
            <option key={episode._id} value={episode._id}>
              {episode.title}
            </option>
          ))}
        </Form.Select>
      </FormGroup>
      <FormGroup className={styles.formItem}>
        <FormLabel>Bài học video</FormLabel>
        <FormControl
          style={{ width: '50%' }}
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
        />
      </FormGroup>
      <MainButton
        primary={true}
        className={styles.submitButton}
        onClick={getYoutubeDataByAPI}
      >
        Lưu lại
      </MainButton>
    </Form>
  )
}

export default AdminGeneral

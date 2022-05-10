import { useState } from 'react'
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import styles from './AdminAddEpisodeConsole.module.scss'
import MainButton from '../../../utils/button/MainButton'
import { apiURL } from '../../../context/constants'
import consoleLog from '../../../utils/console-log/consoleLog'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'

const AdminAddEpisodeConsole = ({ setManageMode, courseId, setEpisodes }) => {
  const [episodeTitle, setEpisodeTitle] = useState('')

  const user = useSelector((state) => state.user)

  const setEpisodeAndClearInput = (episodes) => {
    setEpisodes(episodes)
    setEpisodeTitle('')
  }

  const addEpisode = async () => {
    const url = `${apiURL}/courses/add-episode/${courseId}`
    const data = await putAddEpisode(url)
    setEpisodeAndClearInput(data.episodes)
  }

  const putAddEpisode = async (url) => {
    const token = Cookies.get('token')
    if (!token) return

    try {
      return (
        await fetch(url, {
          method: 'PUT',
          body: JSON.stringify({ title: episodeTitle }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      ).json()
    } catch (error) {
      consoleLog(error.message)
    }
  }

  return (
    <Form className={styles.wrapper} onSubmit={(e) => e.preventDefault()}>
      <FormGroup className={styles.formItem}>
        <FormLabel>Tên chương</FormLabel>
        <div className="d-flex align-items-center">
          <FormControl
            value={episodeTitle}
            onChange={(e) => setEpisodeTitle(e.target.value)}
          />
        </div>
      </FormGroup>
      <div className={styles.buttonWrapper}>
        <MainButton
          primary={true}
          className={`${styles.button} ${styles.cancel}`}
          onClick={() => setManageMode('add-lesson')}
        >
          Quay lại
        </MainButton>
        <MainButton
          primary={true}
          onClick={addEpisode}
          className={`${styles.button} ${styles.create}`}
        >
          {'Tạo chương'}
        </MainButton>
      </div>
    </Form>
  )
}

export default AdminAddEpisodeConsole

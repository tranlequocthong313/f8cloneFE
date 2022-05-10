import { useContext, useEffect, useState } from 'react'
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import styles from './AdminEditEpisodeConsole.module.scss'
import MainButton from '../../../utils/button/MainButton'
import { LessonContext } from '../../../context/LessonContext'
import { apiURL } from '../../../context/constants'
import consoleLog from '../../../utils/console-log/consoleLog'
import Cookies from 'js-cookie'

const AdminEditEpisodeConsole = ({ setManageMode, courseId, setEpisodes }) => {
  const {
    episodeChosenData: { title, _id },
    setEpisodeChosenData,
  } = useContext(LessonContext)

  const [episodeTitle, setEpisodeTitle] = useState('')

  useEffect(() => setEpisodeTitle(title), [title])

  const setEpisodeClearInputAndChosen = (episodes) => {
    setEpisodes(episodes)
    setEpisodeChosenData(null)
    setEpisodeTitle('')
    setManageMode('add-lesson')
  }

  const editEpisode = async () => {
    const url = `${apiURL}/courses/edit-episode/${courseId}/${_id}`
    const data = await patchEditEpisode(url)
    setEpisodeClearInputAndChosen(data.episodes)
  }

  const patchEditEpisode = async (url) => {
    const token = Cookies.get('token')
    if (!token) return

    try {
      return (
        await fetch(url, {
          method: 'PATCH',
          body: JSON.stringify({ title: episodeTitle }),
          headers: {
            'Content-Type': 'application/json',
            Application: `Bearer ${token}`,
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
          onClick={editEpisode}
          className={`${styles.button} ${styles.create}`}
        >
          Sửa chương
        </MainButton>
      </div>
    </Form>
  )
}

export default AdminEditEpisodeConsole

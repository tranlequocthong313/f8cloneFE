import { useContext, useEffect, useState } from 'react'
import AdminHeader from '../../components/admin/header/AdminHeader'
import AdminTrack from '../../components/admin/track/AdminTrack'
import { apiURL } from '../../context/constants'
import { useLocation } from 'react-router-dom'
import consoleLog from '../../utils/console-log/consoleLog'
import SubLoading from '../../utils/loading/SubLoading'
import { Col, Row } from 'react-bootstrap'
import AdminEditEpisodeConsole from '../../components/admin/console/AdminEditEpisodeConsole'
import AdminAddEpisodeConsole from '../../components/admin/console/AdminAddEpisodeConsole'
import AdminEditLessonConsole from '../../components/admin/console/AdminEditLessonConsole'
import AdminAddLessonConsole from '../../components/admin/console/AdminAddLessonConsole'
import { LessonContext } from '../../context/LessonContext'

const AdminLesson = () => {
  const location = useLocation()
  const courseId = location.pathname.split('/admin/lessons/')[1]
  const { setEpisodeChosenId } = useContext(LessonContext)

  const [course, setCourse] = useState(null)
  const [episodes, setEpisodes] = useState([])
  const [loading, setLoading] = useState(true)
  const [manageMode, setManageMode] = useState('add-lesson')

  useEffect(() => {
    switch (manageMode) {
      case 'add-lesson': {
        document.title = 'Thiết kế bài học'
        break
      }
      case 'add-episode': {
        document.title = 'Thiết kế chương'
        break
      }
      case 'edit-episode': {
        document.title = 'Sửa chương'
        break
      }
      case 'edit-lesson': {
        document.title = 'Sửa bài học'
        break
      }
      default:
        return
    }
  }, [manageMode])

  useEffect(() => {
    ;(async () => {
      setLoading(true)

      const url = `${apiURL}/courses/${courseId}/lessons`
      const data = await getCourseById(url)

      console.log(data)
      if (data) {
        setCourse(data)
        setEpisodes(data.episodes)
        setEpisodeChosenId(data.episodes[0]._id)
        setLoading(false)
      }
    })()
  }, [courseId, setEpisodeChosenId])

  const getCourseById = async (url) => {
    try {
      return (await fetch(url)).json()
    } catch (error) {
      consoleLog(error.message)
    }
  }

  return loading ? (
    <SubLoading />
  ) : (
    <>
      <AdminHeader manageMode={manageMode} setManageMode={setManageMode} />
      <Row style={{ marginTop: 50, flex: '1 1' }}>
        <Col xl={2}>
          <AdminTrack
            setManageMode={setManageMode}
            episodes={episodes}
            heading={course.title}
            courseId={course._id}
            setEpisodes={setEpisodes}
          />
        </Col>
        <Col xl={10}>
          {manageMode === 'add-lesson' && (
            <AdminAddLessonConsole
              episodes={episodes}
              setEpisodes={setEpisodes}
              courseId={course._id}
              manageMode={manageMode}
            />
          )}
          {manageMode === 'edit-lesson' && (
            <AdminEditLessonConsole
              episodes={episodes}
              setEpisodes={setEpisodes}
              courseId={course._id}
            />
          )}
          {manageMode === 'add-episode' && (
            <AdminAddEpisodeConsole
              setEpisodes={setEpisodes}
              courseId={course._id}
              setManageMode={setManageMode}
            />
          )}
          {manageMode === 'edit-episode' && (
            <AdminEditEpisodeConsole
              setManageMode={setManageMode}
              courseId={course._id}
              setEpisodes={setEpisodes}
            />
          )}
        </Col>
      </Row>
    </>
  )
}

export default AdminLesson

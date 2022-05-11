import { useContext, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import LessonActionBar from '../../components/lesson/LessonActionBar'
import LessonContent from '../../components/lesson/LessonContent'
import LessonHeader from '../../components/lesson/LessonHeader'
import LessonTrack from '../../components/lesson/LessonTrack'
import consoleLog from '../../utils/console-log/consoleLog'
import SubLoading from '../../utils/loading/SubLoading'
import { apiURL } from '../../context/constants'
import { LessonContext } from '../../context/LessonContext'
import { useSelector } from 'react-redux'

const Lesson = () => {
  const {
    isShowMenuTrack,
    handleIsShowMenuTrack,
    setVideoId,
    setChosenLesson,
    setChosenEpisode,
    setLessons,
    setTitleLesson,
    setEpisodeChosenTitle,
    setUpdatedAt,
  } = useContext(LessonContext)
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()

  const location = useLocation()
  const courseId = location.pathname.split('/lesson/')[1]

  const [loading, setLoading] = useState(true)
  const [episodes, setEpisodes] = useState([])

  useEffect(() => {
    ;(async () => {
      if (!user.coursesEnrolled.includes(courseId))
        return navigate(`/courses/${courseId}`)

      setLoading(true)

      const url = `${apiURL}/courses/${courseId}/lessons`
      const data = await getCourseById(url)

      if (data) {
        setEpisodes(data.episodes)
        setLoading(false)
      }
    })()
  }, [
    courseId,
    setChosenLesson,
    setVideoId,
    setChosenEpisode,
    setLessons,
    setTitleLesson,
    setEpisodeChosenTitle,
    setUpdatedAt,
    navigate,
    user.coursesEnrolled,
  ])

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
      <LessonHeader episodes={episodes} />
      <LessonContent isShowMenuTrack={isShowMenuTrack} episodes={episodes} />
      {isShowMenuTrack && (
        <LessonTrack episodes={episodes} heading={'Nội dung khóa học'} />
      )}
      <LessonActionBar
        handleIsShowMenuTrack={handleIsShowMenuTrack}
        isShowMenuTrack={isShowMenuTrack}
        episodes={episodes}
      />
    </>
  )
}

export default Lesson

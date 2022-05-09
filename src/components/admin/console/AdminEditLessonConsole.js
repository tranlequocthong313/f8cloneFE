import { useContext } from 'react'
import { LessonContext } from '../../../context/LessonContext'
import AdminGeneral from './AdminGeneral'

const AdminEditLessonConsole = ({ episodes, setEpisodes, courseId }) => {
  const { chosenLesson, titleLesson, videoId, episodeChosenId } =
    useContext(LessonContext)

  return (
    <AdminGeneral
      episodes={episodes}
      setEpisodes={setEpisodes}
      courseId={courseId}
      titleLesson={titleLesson}
      videoIdLesson={videoId}
      lessonId={chosenLesson}
      episodeChosenId={episodeChosenId}
      manageMode={'edit-lesson'}
    />
  )
}

export default AdminEditLessonConsole

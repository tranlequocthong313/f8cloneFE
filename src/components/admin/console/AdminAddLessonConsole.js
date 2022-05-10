import AdminGeneral from './AdminGeneral'

const AdminAddLessonConsole = ({ episodes, setEpisodes, courseId }) => {
  return (
    <AdminGeneral
      episodes={episodes}
      setEpisodes={setEpisodes}
      courseId={courseId}
      manageMode={'add-lesson'}
    />
  )
}

export default AdminAddLessonConsole

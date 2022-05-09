import Cookies from 'js-cookie'
import { useContext, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import { apiURL } from '../../../context/constants'
import { LessonContext } from '../../../context/LessonContext'
import consoleLog from '../../../utils/console-log/consoleLog'
import styles from './AdminTrack.module.scss'
import ModalConfirm from '../../../utils/modal/ModalConfirm'
import { ModalContext } from '../../../context/ModalContext'

const AdminTrack = ({
  episodes,
  className,
  heading,
  setManageMode,
  courseId,
  setEpisodes,
}) => {
  const {
    isEpisodeChosen,
    chooseEpisode,
    chosenLesson,
    setChosenLesson,
    setEpisodeChosenData,
    setTitleLesson,
    setVideoId,
    setLessonComments,
    setEpisodeChosenId,
    episodeChosenId,
  } = useContext(LessonContext)
  const { onShowConfirm, onHideConfirm } = useContext(ModalContext)

  const [deleteOption, setDeleteOption] = useState('')

  const deleteEpisode = async () => {
    onHideConfirm()

    const url = `${apiURL}/courses/delete-episode/${courseId}/${episodeChosenId}`
    const data = await delDeleteEpisode(url)

    setEpisodes(data.episodes)
  }

  const delDeleteEpisode = async (url) => {
    try {
      return (
        await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      ).json()
    } catch (error) {
      consoleLog(error.message)
    }
  }

  const deleteLesson = async () => {
    onHideConfirm()

    const url = `${apiURL}/courses/delete-lesson/${courseId}/${episodeChosenId}/${chosenLesson}`
    const data = await patchDeleteLesson(url)

    setEpisodes(data.episodes)
  }

  const patchDeleteLesson = async (url) => {
    const token = Cookies.get('token')
    if (!token) return

    try {
      return (
        await fetch(url, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      ).json()
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.container}>
        <header className={styles.heading}>
          <i
            className="fa-solid fa-square-plus"
            onClick={() => {
              setManageMode('add-episode')
              setEpisodeChosenData(null)
            }}
          ></i>
          <h4>{heading}</h4>
        </header>
        <div className={styles.body}>
          {episodes.length === 0 ? (
            <p className={styles.noResult}>Chưa có bài học nào.</p>
          ) : (
            episodes.map((episode, index) => (
              <div key={episode._id}>
                <div
                  className={styles.lessonWrapper}
                  onClick={() => chooseEpisode(episode._id)}
                >
                  <i
                    className="fa-solid fa-trash"
                    onClick={() => {
                      onShowConfirm()
                      setDeleteOption('episode')
                      setEpisodeChosenId(episode._id)
                    }}
                  ></i>
                  <i
                    className="fa-solid fa-pen"
                    onClick={(e) => {
                      setManageMode('edit-episode')
                      e.stopPropagation()
                      setEpisodeChosenData(episode)
                    }}
                  ></i>
                  <h4 className={styles.episodeTitle}>{`Chương ${index + 1}: ${
                    episode.title
                  }`}</h4>
                </div>
                <Collapse in={isEpisodeChosen(episode._id)}>
                  <div className={styles.panelBody}>
                    {episode.lessons.map((lesson, index) => (
                      <div
                        className={
                          chosenLesson === lesson._id
                            ? `${styles.lessonItem} ${styles.active}`
                            : styles.lessonItem
                        }
                        key={lesson._id}
                        onClick={() => {
                          setManageMode('edit-lesson')
                          setChosenLesson(lesson._id)
                          setTitleLesson(lesson.title)
                          setVideoId(lesson.videoId)
                          setLessonComments(lesson.comments)
                          setEpisodeChosenId(episode._id)
                        }}
                      >
                        <div className={styles.lessonInfo}>
                          <i
                            className="fa-solid fa-trash"
                            onClick={(e) => {
                              onShowConfirm()
                              setDeleteOption('lesson')
                              setEpisodeChosenId(episode._id)
                              setChosenLesson(lesson._id)

                              e.stopPropagation()
                            }}
                          ></i>
                          <i className="fa-solid fa-circle-play"></i>
                          <h5 className={styles.lessonTitle}>{`Bài ${
                            index + 1
                          }: ${lesson.title}`}</h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </Collapse>
              </div>
            ))
          )}
        </div>
      </div>
      <ModalConfirm
        onConfirm={() =>
          deleteOption === 'episode' ? deleteEpisode() : deleteLesson()
        }
        body={
          deleteOption === 'episode'
            ? 'Bạn có đồng ý xóa chương này?'
            : 'Bạn có đồng ý xóa bài học này?'
        }
        header={deleteOption === 'episode' ? 'Xóa chương' : 'Xóa bài học'}
      />
    </div>
  )
}

export default AdminTrack

import { useState } from 'react'
import { Navbar, Image } from 'react-bootstrap'
import styles from './LessonHeader.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../asset/images/f8_icon.png'
import CircularProgressBar from '../../utils/progress-bar/CircularProgressBar'
import { useSelector } from 'react-redux'

const LessonHeader = ({ episodes }) => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  const [lessonLearned, setLessonLearned] = useState([])
  const [totalLesson, setTotalLesson] = useState([])

  episodes.forEach((episode) => {
    episode.lessons.forEach((lesson) => {
      if (!totalLesson.includes(lesson._id))
        setTotalLesson((prev) => [...prev, lesson._id])

      if (
        !lessonLearned.includes(lesson._id) &&
        user.lessonLearned.includes(lesson._id)
      ) {
        setLessonLearned((prev) => [...prev, lesson._id])
      }
    })
  })

  return (
    <Navbar className={styles.navHeader}>
      <div
        onClick={() => navigate(-1)}
        className={styles.backHome}
        title={'Quay lại'}
      >
        <i className="fa-solid fa-chevron-left"></i>
      </div>
      <Navbar.Brand className={styles.logo}>
        <Link to="/">
          <Image src={logo} className={styles.logoNavbar} />
        </Link>
        <h4 className={styles.logoHeading}>Học Lập Trình Để Đi Làm</h4>
      </Navbar.Brand>
      <div className={styles.userAction}>
        <div className={styles.progressBar}>
          <CircularProgressBar
            numberPercent={`${Math.floor(
              (lessonLearned.length / totalLesson.length) * 100
            )}%`}
            className={styles.circularProgress}
          />
          <p>
            <strong>{`${lessonLearned.length}/${totalLesson.length}`}</strong>{' '}
            bài học
          </p>
        </div>
      </div>
    </Navbar>
  )
}

export default LessonHeader

import React, { useContext, useState, useEffect } from 'react'
import LessonActionBar from '../../components/lesson/LessonActionBar'
import LessonContent from '../../components/lesson/LessonContent'
import LessonHeader from '../../components/lesson/LessonHeader'
import LessonTrack from '../../components/lesson/LessonTrack'
import Comment from '../../components/utils/comment/Comment'
import Loading from '../../components/utils/loading/Loading'
import { apiURL } from '../../context/constants'
import { LessonContext } from '../../context/LessonContext'
import styles from './Lesson.module.scss'

const Lesson = () => {
  const { isShowMenuTrack, handleIsShowMenuTrack } = useContext(LessonContext)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    setTimeout(() => setLoading(false), 500)
  }, [])

  return loading ? (
    <Loading />
  ) : (
    <>
      <LessonHeader />
      <LessonContent isShowMenuTrack={isShowMenuTrack} />
      {isShowMenuTrack && <LessonTrack />}

      <LessonActionBar
        handleIsShowMenuTrack={handleIsShowMenuTrack}
        isShowMenuTrack={isShowMenuTrack}
      />
    </>
  )
}

export default Lesson

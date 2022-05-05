import React, { useContext, useState, useEffect } from 'react'
import LessonActionBar from '../../components/lesson/LessonActionBar'
import LessonContent from '../../components/lesson/LessonContent'
import LessonHeader from '../../components/lesson/LessonHeader'
import LessonTrack from '../../components/lesson/LessonTrack'
import Comment from '../../components/utils/comment/Comment'
import SubLoading from '../../components/utils/loading/SubLoading'
import { apiURL } from '../../context/constants'
import { LessonContext } from '../../context/LessonContext'
import styles from './Lesson.module.scss'

const Lesson = () => {
  const {
    isShowMenuTrack,
    handleIsShowMenuTrack,
    setVideoId,
    setChosenLesson,
    setChosenEpisode,
    setLessons,
  } = useContext(LessonContext)

  const [loading, setLoading] = useState(true)
  const [episodes, setEpisodes] = useState([
    {
      _id: Math.random(),
      title: 'Khái niệm kỹ thuật cần biết',
      lessons: [
        {
          _id: Math.random(),
          learned: true,
          videoId: 'M62l1xA5Eu8',
          title: 'Domain là gì? Tên miền là gì?',
          time: '10:34',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: 'M62l1xA5Eu8',
          title: 'Domain là gì? Tên miền là gì?',
          time: '10:34',
        },
      ],
    },
    {
      _id: Math.random(),
      title: 'Môi trường, con người IT',
      lessons: [
        {
          _id: Math.random(),
          learned: false,
          videoId: 'CyZ_O7v62h4',
          title:
            'Học IT cần tố chất gì? Góc nhìn khác từ chuyên gia định hướng giáo dục',
          time: '24:10',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: 'YH-E4Y3EaT4',
          title: 'Sinh viên IT đi thực tập tại doanh nghiệp cần biết những gì?',
          time: '34:51',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: '2sg1yNl1WvE',
          title:
            'Chọn ngành IT có sai lầm? Những trải nghiệm thực tế sau 2 tháng làm việc tại doanh nghiệp?',
          time: '47:12',
        },
      ],
    },
  ])

  useEffect(() => {
    setLoading(true)
    setVideoId(episodes[0].lessons[0].videoId)
    setChosenLesson(episodes[0].lessons[0]._id)
    setChosenEpisode((prev) => [episodes[0]._id, ...prev])
    setLessons(episodes)

    setTimeout(() => setLoading(false), 500)
  }, [episodes, setChosenLesson, setVideoId, setChosenEpisode, setLessons])

  return loading ? (
    <SubLoading />
  ) : (
    <>
      <LessonHeader />
      <LessonContent isShowMenuTrack={isShowMenuTrack} />
      {isShowMenuTrack && (
        <LessonTrack episodes={episodes} heading={'Nội dung khóa học'} />
      )}

      <LessonActionBar
        handleIsShowMenuTrack={handleIsShowMenuTrack}
        isShowMenuTrack={isShowMenuTrack}
      />
    </>
  )
}

export default Lesson

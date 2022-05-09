import { createContext, useState, useEffect } from 'react'
import { apiURL } from './constants'
import consoleLog from '../utils/console-log/consoleLog'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { learnedLesson } from '../actions/userAction'

export const LessonContext = createContext()

const LessonContextProvider = ({ children }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const [isShowMenuTrack, setIsShowMenuTrack] = useState(true)
  const [chosenLesson, setChosenLesson] = useState('')
  const [titleLesson, setTitleLesson] = useState('')
  const [chosenEpisode, setChosenEpisode] = useState([])
  const [play, setPlay] = useState(0) // Youtube autoplay option using 1/0 instead true/false
  const [videoId, setVideoId] = useState('')
  const [lessons, setLessons] = useState([])
  const [episodeChosenData, setEpisodeChosenData] = useState(null)
  const [episodeChosenTitle, setEpisodeChosenTitle] = useState('')
  const [updatedAt, setUpdatedAt] = useState('')
  const [lessonComments, setLessonComments] = useState([])
  const [episodeChosenId, setEpisodeChosenId] = useState('')

  useEffect(() => (document.title = titleLesson), [titleLesson])

  const playVideo = (lessonId, lessonVideoId) => {
    setPlay(1)
    setVideoId(lessonVideoId)
    setChosenLesson(lessonId)
  }

  const isEpisodeChosen = (id) => chosenEpisode.includes(id)

  const handleIsShowMenuTrack = () => setIsShowMenuTrack((prev) => !prev)

  const chooseEpisode = (id) =>
    setChosenEpisode((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )

  const onEnd = async () => {
    if (user.lessonLearned.includes(chosenLesson)) return

    const token = Cookies.get('token')
    if (!token) return

    const url = `${apiURL}/me/lesson-learned/${chosenLesson}`
    const data = await patchLessonLearned(url, token)

    dispatch(learnedLesson(data))
  }

  const patchLessonLearned = async (url, token) => {
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
      consoleLog(error.message)
    }
  }

  const value = {
    chosenLesson,
    playVideo,
    handleIsShowMenuTrack,
    videoId,
    play,
    setPlay,
    chosenEpisode,
    setVideoId,
    isShowMenuTrack,
    setChosenLesson,
    setChosenEpisode,
    isEpisodeChosen,
    chooseEpisode,
    setLessons,
    lessons,
    setTitleLesson,
    titleLesson,
    setEpisodeChosenData,
    episodeChosenData,
    onEnd,
    episodeChosenTitle,
    setEpisodeChosenTitle,
    updatedAt,
    setUpdatedAt,
    lessonComments,
    setLessonComments,
    episodeChosenId,
    setEpisodeChosenId,
  }

  return (
    <LessonContext.Provider value={value}>{children}</LessonContext.Provider>
  )
}

export default LessonContextProvider

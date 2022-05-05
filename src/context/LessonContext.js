import React, { createContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { apiURL } from './constants'
import consoleLog from '../components/utils/console-log/consoleLog'

export const LessonContext = createContext()

const LessonContextProvider = ({ children }) => {
  const location = useLocation()

  const [isShowMenuTrack, setIsShowMenuTrack] = useState(true)
  const [chosenLesson, setChosenLesson] = useState('')
  const [chosenEpisode, setChosenEpisode] = useState([])
  const [lockedLesson, setLockedLesson] = useState(null)
  const [play, setPlay] = useState(false)
  const [videoId, setVideoId] = useState('')
  const [lessons, setLessons] = useState([])

  const playVideo = (lessonIndex, lessonVideoId) => {
    setPlay(true)
    setVideoId(lessonVideoId)
    setChosenLesson(lessonIndex)
  }

  const isEpisodeChosen = (id) => chosenEpisode.includes(id)

  const handleIsShowMenuTrack = () => setIsShowMenuTrack((prev) => !prev)

  const chooseEpisode = (id) =>
    setChosenEpisode((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )

  const value = {
    chosenLesson,
    lockedLesson,
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
  }

  return (
    <LessonContext.Provider value={value}>{children}</LessonContext.Provider>
  )
}

export default LessonContextProvider

import React, { createContext, useState, useEffect } from 'react'
import {
  useLocation,
  useHistory,
  //   createSearchParams,
  //   useSearchParams,
} from 'react-router-dom'
import { apiURL } from './constants'
import consoleLog from '../components/utils/console-log/consoleLog'

export const LessonContext = createContext()

const LessonContextProvider = ({ children }) => {
  const location = useLocation()
  const history = useHistory()

  const [isShowMenuTrack, setIsShowMenuTrack] = useState(true)
  const [chosenLesson, setChosenLesson] = useState(null)
  const [lockedLesson, setLockedLesson] = useState(null)
  //   const [searchParams, setSearchParams] = useSearchParams()
  //   const [query, setQuery] = useState(searchParams.get('id'))
  const [play, setPlay] = useState(false)
  const [videoId, setVideoId] = useState('')
  const [course, setCourse] = useState(null)

  const active = async (id) => {
    try {
      setIsShowMenuTrack(id)
      createParams(id)
    } catch (error) {
      consoleLog(error.message)
    }
  }

  const playVideo = (lessonId, lessonVideoId) => {
    setIsShowMenuTrack((prev) => !prev)
    setPlay(true)
    // active(lessonId)
    setVideoId(lessonVideoId)
    createParams(lessonId)
  }

  const createParams = (id) => {
    console.log('create params', id)
    history({
      pathname: location.pathname,
      //   search: createSearchParams({
      //     id,
      //   }).toString(),
    })
    // setQuery(id)
  }

  const onEnd = async () => {
    // try {
    //   console.log('Video End')
    //   await fetch(`${apiURL}${location.pathname}?id=${query}`)
    // } catch (error) {
    //   consoleLog(error.message)
    // }
  }

  const handleIsShowMenuTrack = () => setIsShowMenuTrack((prev) => !prev)

  const value = {
    course,
    chosenLesson,
    lockedLesson,
    playVideo,
    handleIsShowMenuTrack,
    videoId,
    play,
    setPlay,
    onEnd,
    active,
    isShowMenuTrack,
  }

  return (
    <LessonContext.Provider value={value}>{children}</LessonContext.Provider>
  )
}

export default LessonContextProvider

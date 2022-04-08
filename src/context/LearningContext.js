import React, { createContext, useState, useEffect } from 'react'
import {
  useLocation,
  useNavigate,
  createSearchParams,
  useSearchParams,
} from 'react-router-dom'
import { apiURL } from './constants'

export const LearningContext = createContext()

const LearningContextProvider = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const [show, setShow] = useState(true) //Show menu track
  const [active, setActive] = useState(null) //Is Chosen lesson
  const [locked, setLocked] = useState(null) //lock lesson
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('id'))
  const [play, setPlay] = useState(false)
  const [videoId, setVideoId] = useState('')
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    ;(async () => {
      try {
        setLoading(true)
        const res = await fetch(`${apiURL}${location.pathname}`, {
          signal: controller.signal,
        })
        const data = await res.json()

        setCourse(data)

        // getLearningEpisode(data.episode)
      } catch (error) {
        console.log(error.message)
      } finally {
        setLoading(false)
      }
    })()

    return () => controller?.abort()
  }, [])

  // const getLearningEpisode = episodes => {
  //   const learningEpisode = episodes.find(episode => episode.learning)
  //   const learningLesson = learningEpisode.lessons.find(
  //     lesson => lesson.learned === false
  //   )

  //   activeHandler(learningLesson.id) // Set default lesson active state
  //   setVideoId(learningLesson.videoId)
  //   createParams(learningLesson.id)
  // }

  const activeHandler = async (id) => {
    try {
      setActive(id)
      createParams(id)
      await fetch(`${apiURL}${location.pathname}?id=${query}`)
    } catch (error) {
      console.log(error)
    }
  }

  const playVideoHandler = (lessonId, lessonVideoId) => {
    showHandler()
    setPlay(true)
    activeHandler(lessonId)
    setVideoId(lessonVideoId)
    createParams(lessonId)
  }

  const showHandler = () => {
    console.log("I'm fucking running")
    setShow((prev) => !prev)
  }

  const createParams = (id) => {
    console.log('create params', id)
    navigate({
      pathname: location.pathname,
      search: createSearchParams({
        id,
      }).toString(),
    })
    setQuery(id)
  }

  const onEndHandler = async () => {
    try {
      console.log('Video End')
      await fetch(`${apiURL}${location.pathname}?id=${query}`)
    } catch (error) {
      console.log(error)
    }
  }

  const value = {
    course,
    show,
    showHandler,
    active,
    activeHandler,
    locked,
    playVideoHandler,
    videoId,
    play,
    setPlay,
    onEndHandler,
    loading,
  }

  return (
    <LearningContext.Provider value={value}>
      {children}
    </LearningContext.Provider>
  )
}

export default LearningContextProvider

// 1) !learned && locked && !active -> disabled + icon lock
// 2) !learned && !locked && !active -> normal + icon none
// 3) learned && !locked && !active -> normal + icon tick
// 4) learned && !locked && active -> active + icon tick
// 5) !learned && !locked && active -> active + icon none

// (*) episode[0].lessons[0] khong bao gio bi locked && default active

// - learned = true|false -->> OK
// - active = check by id of lesson (active when !locked)
// - locked = [lesson.id except episode[0].lessons[0]] -
// locked.includes(lesson.id) => locked
// onEnd(() => setLocked(prev => prev.shift())

// episode is learning => episode.lesson => !learned => active

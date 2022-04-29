// import React, { createContext, useState, useEffect } from 'react'
// import {
//   useLocation,
//   useHistory,
//   createSearchParams,
//   useSearchParams,
// } from 'react-router-dom'
// import { apiURL } from './constants'

// export const LearningContext = createContext()

// const LearningContextProvider = ({ children }) => {
//   const location = useLocation()
//   const history = useHistory()

//   const [isShowMenuTrack, setIsShowMenuTrack] = useState(true)
//   const [chosenLesson, setChosenLesson] = useState(null)
//   const [lockedLesson, setLockedLesson] = useState(null)
//   const [searchParams, setSearchParams] = useSearchParams()
//   const [query, setQuery] = useState(searchParams.get('id'))
//   const [play, setPlay] = useState(false)
//   const [videoId, setVideoId] = useState('')
//   const [course, setCourse] = useState(null)
//   const [loading, setLoading] = useState(false)

//   const active = async (id) => {
//     try {
//       setIsShowMenuTrack(id)
//       createParams(id)
//       await fetch(`${apiURL}${location.pathname}?id=${query}`)
//     } catch (error) {
//       console.error(error.message)
//     }
//   }

//   const playVideo = (lessonId, lessonVideoId) => {
//     setIsShowMenuTrack((prev) => !prev)
//     setPlay(true)
//     active(lessonId)
//     setVideoId(lessonVideoId)
//     createParams(lessonId)
//   }

//   const createParams = (id) => {
//     console.log('create params', id)
//     history({
//       pathname: location.pathname,
//       search: createSearchParams({
//         id,
//       }).toString(),
//     })
//     setQuery(id)
//   }

//   const onEnd = async () => {
//     try {
//       console.log('Video End')
//       await fetch(`${apiURL}${location.pathname}?id=${query}`)
//     } catch (error) {
//       console.error(error.message)
//     }
//   }

//   const handleIsShowMenuTrack = () => setIsShowMenuTrack((prev) => !prev)

//   const value = {
//     course,
//     isShowMenuTrack,
//     chosenLesson,
//     lockedLesson,
//     playVideo,
//     handleIsShowMenuTrack,
//     videoId,
//     play,
//     setPlay,
//     onEnd,
//     loading,
//   }

//   return (
//     <LearningContext.Provider value={value}>
//       {children}
//     </LearningContext.Provider>
//   )
// }

// export default LearningContextProvider

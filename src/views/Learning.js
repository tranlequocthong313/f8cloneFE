import React, { useContext, useState, useEffect } from 'react'
import LearningActionBar from '../components/learning/LearningActionBar'
import LearningContent from '../components/learning/LearningContent'
import LearningHeader from '../components/learning/LearningHeader'
import LearningTrack from '../components/learning/LearningTrack'
import { LearningContext } from '../context/LearningContext'

const Learning = () => {
  const { show, showHandler, course } = useContext(LearningContext)

  return (
    <>
      <LearningHeader />
      <LearningContent show={show} />
      {show && (
        <LearningTrack showHandler={showHandler} episodes={course.episode} />
      )}
      <LearningActionBar showHandler={showHandler} show={show} />
    </>
  )
}

export default Learning

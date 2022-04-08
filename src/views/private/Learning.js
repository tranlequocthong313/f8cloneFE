import React, { useContext, useState, useEffect } from 'react'
import LearningActionBar from '../../components/learning/LearningActionBar'
import LearningContent from '../../components/learning/LearningContent'
import LearningHeader from '../../components/learning/LearningHeader'
import LearningTrack from '../../components/learning/LearningTrack'
import Comment from '../../components/utils/comment/Comment'
import { apiURL } from '../../context/constants'
import { LearningContext } from '../../context/LearningContext'
import styles from './Learning.module.scss'

const Learning = () => {
  const { show, showHandler, course, loading } = useContext(LearningContext)

  return (
    <>
      <LearningHeader />
      <LearningContent show={show} />
      {show && (
        <LearningTrack
          // episodes={course.episode}
          loading={loading}
        />
      )}

      {/* {showComment && (
        <Comment
          // setShowComment={() => setShowComment(false)}
          // commentData={blog}
          // setCommentData={setCommentData}
          // blogId={blog._id}
        /> */}
      {/* )} */}
      <LearningActionBar
        // episodes={course.episode}
        show={show}
        showHandler={showHandler}
        loading={loading}
      />
    </>
  )
}

export default Learning

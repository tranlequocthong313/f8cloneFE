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
  const { show, showHandler, course } = useContext(LearningContext)
  const [showComment, setShowComment] = useState(false)

  return (
    <>
      <LearningHeader />
      <LearningContent show={show} />
      {show && (
        <LearningTrack showHandler={showHandler} episodes={course.episode} />
      )}
      <div
        className={styles.commentButton}
        onClick={() => setShowComment(true)}
      >
        <button className={styles.wrapper}>
          <i className="fa-solid fa-comments"></i>
          <span className={styles.title}>Hỏi đáp</span>
        </button>
      </div>
      {/* {showComment && (
        <Comment
          // setShowComment={() => setShowComment(false)}
          // commentData={blog}
          // setCommentData={setCommentData}
          // blogId={blog._id}
        /> */}
      {/* )} */}
      <LearningActionBar showHandler={showHandler} show={show} />
    </>
  )
}

export default Learning

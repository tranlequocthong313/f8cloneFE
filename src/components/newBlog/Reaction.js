import React from 'react'

import styles from './Reaction.module.scss'

const Reaction = ({
  isLike,
  commentData,
  likeHandler,
  setShowComment,
  likeCount,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.reactButton} onClick={likeHandler}>
        <i
          className={
            isLike ? `${styles.active} bi bi-heart-fill` : 'bi bi-heart'
          }
        ></i>
        <span>{likeCount}</span>
      </div>
      <div className={styles.reactButton} onClick={setShowComment}>
        <i className="bi bi-chat"></i>
        <span>{commentData.length}</span>
      </div>
    </div>
  )
}

export default Reaction

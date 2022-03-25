import React from 'react'

import styles from './Reaction.module.scss'

const Reaction = ({
  blogId,
  isLike,
  likeHandler,
  commentHandler,
  likeCount,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.reactButton} onClick={() => likeHandler(blogId)}>
        <i
          className={
            isLike ? `${styles.active} bi bi-heart-fill` : 'bi bi-heart'
          }
        ></i>
        <span>{likeCount}</span>
      </div>
      <div className={styles.reactButton} onClick={commentHandler}>
        <i className="bi bi-chat"></i>
        <span>{0}</span>
      </div>
    </div>
  )
}

export default Reaction

import React from 'react'
import Comment from '../utils/comment/Comment'
import VerticalModal from '../utils/vertical-modal/VerticalModal'

import styles from './Reaction.module.scss'

const Reaction = ({
  isLike,
  commentData,
  like,
  setShowComment,
  likeCount,
  setCommentData,
  blogId,
}) => {
  return (
    <div className={styles.reaction}>
      <div className={styles.reactButton} onClick={like}>
        <i
          className={
            isLike
              ? `${styles.active} fa-solid fa-heart`
              : 'fa-regular fa-heart'
          }
        ></i>
        <span>{likeCount}</span>
      </div>

      <VerticalModal
        button={
          <div className={styles.reactButton} onClick={setShowComment}>
            <i className="fa-regular fa-comment"></i>
            <span>{commentData.length}</span>
          </div>
        }
        placement={'end'}
        closeButton={true}
        className={styles.wrapper}
      >
        <Comment
          setShowComment={() => setShowComment(false)}
          commentData={commentData}
          setCommentData={setCommentData}
          blogId={blogId}
        />
      </VerticalModal>
    </div>
  )
}

export default Reaction

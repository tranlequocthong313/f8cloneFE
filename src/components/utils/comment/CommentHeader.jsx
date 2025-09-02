import React from 'react'
import styles from './CommentHeader.module.scss'

const CommentHeader = ({ comments }) => {
  return (
    <div className={styles.heading}>
      {comments?.length >= 1 && (
        <>
          <h4>{comments.length} bình luận</h4>
          <p>(Nếu thấy bình luận spam, các bạn bấm report giúp admin nhé)</p>
        </>
      )}
      {!comments || comments?.length === 0 && <h4>Chưa có bình luận</h4>}
    </div>
  )
}

export default CommentHeader

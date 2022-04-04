import React from 'react'
import styles from './CommentHeader.module.scss'

const CommentHeader = ({ commentData }) => {
  return (
    <div className={styles.heading}>
      {commentData.length >= 1 && (
        <>
          <h4>{commentData.length} bình luận</h4>
          <p>(Nếu thấy bình luận spam, các bạn bấm report giúp admin nhé)</p>
        </>
      )}
      {commentData.length === 0 && <h4>Chưa có bình luận</h4>}
    </div>
  )
}

export default CommentHeader

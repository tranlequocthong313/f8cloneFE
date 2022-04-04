import React from 'react'
import { emojies } from '../../../context/constants'
import styles from './CommentReaction.module.scss'

const CommentReaction = ({ reactCommentHandler, commentId }) => {
  return (
    <div className={styles.wrapper}>
      {emojies.map(emoji => (
        <div className={styles.container} key={emoji.title}>
          <div className={styles.item}>
            <div className={styles.title}>{emoji.title}</div>
            <div
              onClick={e => {
                e.stopPropagation()
                reactCommentHandler(emoji.title, commentId)
              }}
              style={{
                backgroundImage: `url(${emoji.icon})`,
              }}
              className={styles.icon}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default CommentReaction

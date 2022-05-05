import Comment from '../utils/comment/Comment'
import VerticalModal from '../utils/vertical-modal/VerticalModal'
import styles from './Reaction.module.scss'

const Reaction = ({ isLike, handleLike, likeCount, blog }) => {
  return (
    <div className={styles.reaction}>
      <div className={styles.reactButton} onClick={handleLike}>
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
          <div className={styles.reactButton}>
            <i className="fa-regular fa-comment"></i>
            <span>{blog.comments.length}</span>
          </div>
        }
        placement={'end'}
        closeButton={true}
        className={styles.wrapper}
      >
        <Comment data={blog} />
      </VerticalModal>
    </div>
  )
}

export default Reaction

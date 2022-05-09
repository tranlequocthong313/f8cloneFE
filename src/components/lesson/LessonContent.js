import { useContext } from 'react'
import { LessonContext } from '../../context/LessonContext'
import Comment from '../../utils/comment/Comment'
import VerticalModal from '../../utils/modal/VerticalModal'
import styles from './LessonContent.module.scss'
import LessonVideo from './LessonVideo'

const LessonContent = ({ isShowMenuTrack }) => {
  const { titleLesson, updatedAt, chosenLesson, lessonComments } =
    useContext(LessonContext)

  const updatedAtSplitted = updatedAt.split('-')

  return (
    <div
      className={
        isShowMenuTrack
          ? styles.wrapper
          : `${styles.wrapper} ${styles.fullWidth}`
      }
    >
      <LessonVideo />
      <div className={styles.content}>
        <div className={styles.contentTop}>
          <div className={styles.heading}>
            <h4>{titleLesson}</h4>
            {updatedAt && (
              <p>{`Cập nhật tháng ${updatedAtSplitted[1]} năm ${updatedAtSplitted[0]}`}</p>
            )}
          </div>
        </div>
        <div className={styles.aboutMessage}>
          <p>
            Tham gia nhóm{' '}
            <a
              rel="noopener noreferrer"
              target="_blank"
              href={'https://www.facebook.com/groups/f8official/'}
            >
              Học lập trình tại F8
            </a>{' '}
            trên Facebook để cùng nhau trao đổi trong quá trình học tập ❤️
          </p>
          <p>
            Các bạn subscribe kênh Youtube{' '}
            <a
              rel="noopener noreferrer"
              target="_blank"
              href={'https://url.mycv.vn/f8_youtube?ref=lesson_desc'}
            >
              F8 Official
            </a>{' '}
            để nhận thông báo khi có các bài học mới nhé ❤️
          </p>
        </div>

        {chosenLesson && (
          <VerticalModal
            button={
              <div className={styles.commentButton}>
                <button className={styles.button}>
                  <i className="fa-solid fa-comments"></i>
                  <span className={styles.title}>Hỏi đáp</span>
                </button>
              </div>
            }
            placement={'end'}
            closeButton={true}
            className={styles.commentWrapper}
          >
            <Comment
              data={{ _id: chosenLesson, comments: lessonComments }}
              commentType={'lessons'}
            />
          </VerticalModal>
        )}
      </div>
      <div className={styles.poweredBy}>
        Made with <i className="fa-solid fa-heart"></i>{' '}
        <span className={styles.dot}>.</span> Powered by F8
      </div>
    </div>
  )
}

export default LessonContent

import React, { useEffect, useState } from 'react'
import { apiURL } from '../../context/constants'
import Comment from '../utils/comment/Comment'
import consoleLog from '../utils/console-log/consoleLog'
import VerticalModal from '../utils/vertical-modal/VerticalModal'
import styles from './LessonContent.module.scss'
import LessonVideo from './LessonVideo'

const LessonContent = ({ isShowMenuTrack }) => {
  const [blog, setBlog] = useState(null)

  useEffect(() => {
    ;(async () => {
      const url = `${apiURL}/blog/626ab4416530914b398c7b2e`
      const data = await getBlogBySlug(url)

      if (data) {
        setBlog(data.blogSlug)
        document.title = `${data.blogSlug.titleDisplay} | by F8`
      }
    })()
  }, [])

  const getBlogBySlug = async (url) => {
    try {
      return (await fetch(url)).json()
    } catch (error) {
      consoleLog(error.message)
    }
  }

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
            <h3>
              Học IT cần tố chất gì? Góc nhìn khác từ chuyên gia định hướng giáo
              dục
            </h3>
            <p>Cập nhật tháng 2 năm 2022</p>
          </div>
          <button className={styles.addNoteButton}>
            <i className="fa-solid fa-plus"></i>
            <span className={styles.label}>
              Thêm ghi chú tại <span className={styles.duration}>00:00</span>
            </span>
          </button>
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
          <Comment data={blog} />
        </VerticalModal>
      </div>
      <div className={styles.poweredBy}>
        Made with <i className="fa-solid fa-heart"></i>{' '}
        <span className={styles.dot}>.</span> Powered by F8
      </div>
    </div>
  )
}

export default LessonContent

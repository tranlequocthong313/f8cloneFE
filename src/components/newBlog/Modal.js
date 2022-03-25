import { useState, useEffect, useCallback } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'
import ContentEditable from '../utils/content-editable/ContentEditable'
import moment from 'moment'
import { apiURL } from '../../context/constants'
import styles from './Modal.module.scss'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Modal = ({ blogContent, setShowModal }) => {
  const navigate = useNavigate()
  // Get city living
  const timezone = Intl.DateTimeFormat()
    .resolvedOptions()
    .timeZone.split('/')[1]

  const date = moment().add(1, 'hours').format('yyyy-MM-DThh:mm')

  const [preview, setPreview] = useState(null)
  const [showSchedule, setShowSchedule] = useState(false)
  const [schedule, setSchedule] = useState(date)
  const [tags, setTags] = useState([])
  const [allowRecommend, setAllowRecommend] = useState(false)
  const [titleDisplay, setTitleDisplay] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)

  // maxLengthContentEditable library require maxLength is string
  const LIMIT_TITLE_DISPLAY_LENGTH = '100'
  const LIMIT_DESCRIPTION_LENGTH = '160'

  // F8 uses these number value to trigger show help text under contentEditable input
  const SHOW_HELP_NUMBER_TITLE_DISPLAY = 67
  const SHOW_HELP_NUMBER_DESCRIPTION = 108

  useEffect(() => {
    return () => {
      preview && URL.revokeObjectURL(preview)
    }
  }, [preview])

  const onDrop = useCallback(acceptedFiles => {
    const image = URL.createObjectURL(acceptedFiles[0])
    setPreview(image)
    setImage(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    name: 'image',
  })

  const showScheduleHandler = () => {
    setShowSchedule(prev => !prev)
  }

  const readingTimeHandler = content => {
    const WORDS_PER_MINUTE = 200 // People read 200 words/min https://infusion.media/content-marketing/how-to-calculate-reading-time/
    const SMALLEST_READING_TIME = 1

    const wordCount = content.trim().length
    const minute = Math.floor(wordCount / WORDS_PER_MINUTE)

    if (minute <= SMALLEST_READING_TIME) {
      return 1 // readingTime default 1 minute
    }

    return minute
  }

  const createSlugBlog = title => {
    const slug = title.toLowerCase().replace(/\s/g, '-') + '.html'

    return slug
  }

  const postBlogHandler = async () => {
    try {
      const token = Cookies.get('token')

      if (!token) return

      const formData = new FormData()

      formData.append('title', blogContent.title)
      formData.append('content', blogContent.content)
      formData.append('image', image)
      formData.append('titleDisplay', titleDisplay)
      formData.append('description', description)
      formData.append('slug', createSlugBlog(blogContent.title))
      formData.append('readingTime', readingTimeHandler(blogContent.content))
      formData.append('allowRecommend', allowRecommend)
      formData.append('tags', tags)
      formData.append('schedule', schedule)

      await fetch(`${apiURL}/new-blog`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      navigate(`/blog/${formData.get('slug')}`)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className={styles.modal}>
      <div className={styles.close} onClick={() => setShowModal(false)}>
        x
      </div>
      <Row className={styles.wrapper}>
        <Col md={12} lg={6} xl={6} className={styles.colLeft}>
          <h3>Xem trước</h3>
          <form
            {...getRootProps()}
            role="button"
            tabIndex="0"
            className={styles.postButtonThumb}
            style={preview && { backgroundImage: `url(${preview})` }}
          >
            <input
              type="file"
              accept="image/*"
              autoComplete="off"
              name="image"
              tabIndex="-1"
              hidden
              {...getInputProps()}
            />
            <p>
              Thêm một ảnh đại diện hấp dẫn sẽ giúp bài viết của bạn cuốn hút
              hơn với độc giả.
            </p>
            <span>Kéo thả ảnh vào đây, hoặc bấm để chọn ảnh</span>
          </form>
          <ContentEditable
            className={`${styles.contentEditable} ${styles.title}`}
            text={'Tiêu đề khi tin được hiển thị'}
            onInput={e => setTitleDisplay(e.target.innerText)}
            maxLength={LIMIT_TITLE_DISPLAY_LENGTH}
          />
          {titleDisplay.length >= SHOW_HELP_NUMBER_TITLE_DISPLAY && (
            <div className={styles.help}>{`${titleDisplay.length}/100`}</div>
          )}
          <ContentEditable
            className={`${styles.contentEditable} ${styles.description}`}
            text={'Mô tả khi tin được hiển thị'}
            onInput={e => setDescription(e.target.innerText)}
            maxLength={LIMIT_DESCRIPTION_LENGTH}
          />
          {description.length >= SHOW_HELP_NUMBER_DESCRIPTION && (
            <div className={styles.help}>{`${description.length}/160`}</div>
          )}
          <p className={styles.note}>
            <strong>Lưu ý:</strong> Chỉnh sửa tại đây sẽ thay đổi cách bài viết
            được hiển thị tại trang chủ, tin nổi bật - Chứ không ảnh hưởng tới
            nội dung bài viết của bạn.
          </p>
        </Col>
        <Col md={12} lg={6} xl={6} className={styles.colRight}>
          <span>
            Thêm tối đa 5 thẻ để độc giả biết bài viết của bạn nói về điều gì.
          </span>
          <input
            type="text"
            placeholder="Ví dụ: Front-end, ReactJS, UI, UX"
            className={styles.tagsInput}
            onChange={e =>
              setTags(prev => {
                return [...prev, e.target.value]
              })
            }
          />
          <form className={styles.allow}>
            <input
              type="checkbox"
              checked
              className={styles.checkMark}
              onChange={() => setAllowRecommend(prev => !prev)}
            />
            <label>
              Đề xuất bài viết của bạn đến các độc giả quan tâm tới nội dung
              này.
            </label>
          </form>
          {showSchedule && (
            <form className={styles.schedule}>
              <label>Thời gian xuất bản:</label>
              <input
                type="datetime-local"
                value={schedule}
                onChange={e => setSchedule(e.target.value)}
              />
              <div className={styles.help}>{timezone} time (GMT+7)</div>
              <p>
                Bài viết này sẽ được xuất bản tự động theo thời gian đã lên lịch
                phía trên.
              </p>
            </form>
          )}
          <div className={styles.actions}>
            <button className={styles.postButton} onClick={postBlogHandler}>
              Xuất bản ngay
            </button>
            <button
              className={styles.postScheduleButton}
              onClick={showScheduleHandler}
            >
              {!showSchedule ? 'Lên lịch xuất bản' : 'Hủy lên lịch'}
            </button>
          </div>
          <img
            width={200}
            src={
              'http://localhost:5000/f8-prod/blog_posts/250951029_2310653682405428_2097463697023468442_n.jpg'
            }
            alt=""
          />
        </Col>
      </Row>
    </div>
  )
}

export default Modal

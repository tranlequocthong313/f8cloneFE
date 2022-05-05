import { useState, useEffect, useCallback, useContext, useRef } from 'react'
import { Row, Col, Spinner } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'
import ContentEditable from '../utils/content-editable/ContentEditable'
import moment from 'moment'
import { apiURL } from '../../context/constants'
import styles from './PostOption.module.scss'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage'
import { storage } from '../../firebase/config'
import { createBlog } from '../../actions/blogAction'
import removeActions from '../utils/remove-accents/removeActions'
import { useSelector } from 'react-redux'
import { PostContext } from '../../context/PostContext'
import { SocketContext } from '../../context/SocketContext'
import { ErrorContext } from '../../context/ErrorContext'
import ModalError from '../utils/modal-error/ModalError'

const PostOption = ({ blogContent }) => {
  const navigate = useNavigate()
  const titleDisplayRef = useRef()
  const { setShowModal } = useContext(PostContext)
  const { onShowError } = useContext(ErrorContext)
  const user = useSelector((state) => state.user)
  const { current } = useContext(SocketContext).socket

  const LIMIT_TITLE_DISPLAY_LENGTH = '100'
  const LIMIT_DESCRIPTION_LENGTH = '160'
  const SHOW_HELP_NUMBER_TITLE_DISPLAY = 67
  const SHOW_HELP_NUMBER_DESCRIPTION = 108

  const date = moment().add(1, 'hours').format('yyyy-MM-DDTHH:mm')

  const [schedule, setSchedule] = useState(date)
  const [preview, setPreview] = useState(null)
  const [isSchedule, setIsSchedule] = useState(false)
  const [allowRecommend, setAllowRecommend] = useState(true)
  const [titleDisplay, setTitleDisplay] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [tags, setTags] = useState([])
  const [tag, setTag] = useState('')
  const [invalidTag, setInvalidTag] = useState(null)

  const timezone = Intl.DateTimeFormat()
    .resolvedOptions()
    .timeZone.split('/')[1]

  useEffect(() => {
    return () => preview && URL.revokeObjectURL(preview)
  }, [preview])

  const onDrop = useCallback((acceptedFiles) => {
    const image = URL.createObjectURL(acceptedFiles[0])
    setPreview(image)
    setImage(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    name: 'image',
  })

  const readingTime = (content) => {
    const AVERAGE_WORDS_PER_MINUTE = 200 //People read average 200 words/min https://infusion.media/content-marketing/how-to-calculate-reading-time/
    const SHORTEST_READING_TIME = 1

    const wordCount = content.split(' ').length
    const minute = Math.floor(wordCount / AVERAGE_WORDS_PER_MINUTE)

    return minute <= SHORTEST_READING_TIME ? SHORTEST_READING_TIME : minute
  }

  const uploadImageToStorage = () => {
    setLoading(true)

    if (!image) return postBlog()

    const storageRef = ref(storage, `uploads/${image.name}`)
    const uploadTask = uploadBytesResumable(storageRef, image)
    uploadTask.on(
      'state_changed',
      () => {},
      (err) => console.log(err),
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref)
          postBlog(url)
        } catch (error) {
          onShowError()
          setLoading(false)
        }
      }
    )
  }

  const dispatchAndNavigate = (data) => {
    createBlog({ blogData: data.blog })
    navigate(
      !data.blog.schedule ? `/blog/${data.blog._id}` : '/my-post/published'
    )
  }

  const postBlog = async (image) => {
    const token = Cookies.get('token')
    if (!token) return

    const blogData = {
      image,
      tags,
      schedule: isSchedule ? schedule : null,
      allowRecommend,
      description,
      title: blogContent.title,
      content: blogContent.content,
      readingTime: readingTime(blogContent.content),
      search: removeActions(
        titleDisplay.length === 0 ? blogContent.title : titleDisplay
      ),
      titleDisplay:
        titleDisplay.length === 0 ? blogContent.title : titleDisplay,
      isPopular: false,
      isVerified: user.isAdmin ? true : false,
      isPosted: true,
    }

    const url = `${apiURL}/new-post`
    const data = await postNewPost(url, blogData, token)

    if (current && !user.isAdmin) {
      current.emit('post', {
        sender: user,
        postId: data.blog._id,
        receiverId: process.env.REACT_APP_ADMIN_ID,
        post: data.blog,
        description: 'có bài viết chờ được xét duyệt',
        notificationType: 'post',
        createdAt: new Date(),
      })
    }

    dispatchAndNavigate(data)
    setShowModal(false)
  }

  const postNewPost = async (url, blogData, token) => {
    try {
      return (
        await fetch(url, {
          method: 'POST',
          body: JSON.stringify(blogData),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      ).json()
    } catch (error) {
      onShowError()
    } finally {
      setLoading(false)
    }
  }

  const addTag = (e) => {
    const isFullTagsSize = tags && tags.length === 5
    if (isFullTagsSize) return

    const isEnterPressed = e.keyCode === 13
    if (isEnterPressed) {
      const isExistTagAlready = tags.includes(tag)
      if (isExistTagAlready) return setInvalidTag('Bạn đã thêm thẻ này')

      const isValidTagAddInput = !tag.match(
        /[`!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/
      )
      if (!isValidTagAddInput)
        return setInvalidTag(
          'Thẻ chỉ hỗ trợ chữ cái, số, dấu cách và dấu gạch ngang'
        )

      setInvalidTag(null)
      setTags((prev) => [...prev, tag.trim()])
      setTag('')
    }
  }

  const removeTag = (tag) =>
    setTags((prev) => prev.filter((item) => item !== tag))

  return (
    <div className={styles.modal}>
      <ModalError />
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
            onInput={(e) => setTitleDisplay(e.target.innerText)}
            maxLength={LIMIT_TITLE_DISPLAY_LENGTH}
            ref={titleDisplayRef}
          />
          {titleDisplay.length >= SHOW_HELP_NUMBER_TITLE_DISPLAY && (
            <div className={styles.help}>{`${titleDisplay.length}/100`}</div>
          )}
          <ContentEditable
            className={`${styles.contentEditable} ${styles.description}`}
            text={'Mô tả khi tin được hiển thị'}
            onInput={(e) => setDescription(e.target.innerText)}
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
          Bạn đã thêm thẻ này
          <div
            className={
              invalidTag !== null
                ? `${styles.tagWrapper} ${styles.invalid}`
                : styles.tagWrapper
            }
          >
            {tags &&
              tags.map((tag) => (
                <div
                  key={tag}
                  id={`tag_${tag}`}
                  tabIndex={1}
                  className={styles.tagCard}
                >
                  <span>{tag}</span>
                  <button onClick={() => removeTag(tag)}>x</button>
                </div>
              ))}
            {(!tags || tags.length !== 5) && (
              <input
                type="text"
                placeholder={
                  tags && tags.length === 5
                    ? ''
                    : 'Ví dụ: Front-end, ReactJS, UI, UX'
                }
                className={styles.tagsInput}
                disabled={tags && tags.length === 5}
                onKeyDown={addTag}
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
            )}
          </div>
          {invalidTag !== null && (
            <div className={styles.invalidText}>{invalidTag}</div>
          )}
          <form className={styles.allow}>
            <input
              type="checkbox"
              checked={allowRecommend}
              className={styles.checkMark}
              onChange={() => setAllowRecommend((prev) => !prev)}
            />
            <label>
              Đề xuất bài viết của bạn đến các độc giả quan tâm tới nội dung
              này.
            </label>
          </form>
          {isSchedule && (
            <form className={styles.schedule}>
              <label>Thời gian xuất bản:</label>
              <input
                type="datetime-local"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
              />
              <div className={styles.help}>{timezone} time (GMT+7)</div>
              <p>
                Bài viết này sẽ được xuất bản tự động theo thời gian đã lên lịch
                phía trên.
              </p>
            </form>
          )}
          <div className={styles.actions}>
            <button
              className={
                !loading
                  ? styles.postButton
                  : `${styles.postButton} ${styles.disabled}`
              }
              onClick={uploadImageToStorage}
            >
              {isSchedule ? 'Lên lịch xuất bản' : 'Xuất bản ngay'}
              {loading && (
                <Spinner
                  animation="border"
                  size="sm"
                  style={{ marginLeft: 8, color: '#fff' }}
                />
              )}
            </button>
            <button
              className={styles.postScheduleButton}
              onClick={() => setIsSchedule((prev) => !prev)}
            >
              {!isSchedule ? 'Lên lịch xuất bản' : 'Hủy lên lịch'}
            </button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default PostOption

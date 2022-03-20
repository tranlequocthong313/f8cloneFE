import React, { useState, useEffect, useCallback } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'
import ContentEditable from '../utils/content-editable/ContentEditable'
import moment from 'moment'
import { apiURL } from '../../context/constants'
import styles from './Modal.module.scss'

const Modal = ({ blogDataHandler, data, setShowModal }) => {
  // Get city living
  const timezone = Intl.DateTimeFormat()
    .resolvedOptions()
    .timeZone.split('/')[1]

  const date = moment().add(1, 'hours').format('yyyy-MM-DThh:mm')

  const [preview, setPreview] = useState(null)
  const [showSchedule, setShowSchedule] = useState(false)
  const [schedule, setSchedule] = useState(date)
  const [tags, setTags] = useState('')
  const [allow, setAllow] = useState(false)
  const [titleDisplay, setTitleDisplay] = useState('')
  const [description, setDescription] = useState('')
  const [thumb, setThumb] = useState(null)

  useEffect(() => {
    return () => {
      preview && URL.revokeObjectURL(preview)
    }
  }, [preview])

  const onDrop = useCallback(acceptedFiles => {
    const image = URL.createObjectURL(acceptedFiles[0])
    setPreview(image)
    setThumb(acceptedFiles[0])
    console.log(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    name: 'thumb',
  })

  const showScheduleHandler = () => {
    setShowSchedule(prev => !prev)
  }

  const publicHandler = () => {
    const detail = {
      tags: [tags],
      titleDisplay,
      description,
      allow,
      schedule,
      thumb,
    }

    blogDataHandler(detail)
  }

  return (
    <div className={styles.modal}>
      <div className={styles.close} onClick={() => setShowModal(false)}>
        x
      </div>
      <Row className={styles.wrapper}>
        <Col md={12} lg={6} xl={6} className={styles.colLeft}>
          <h3>Xem trước</h3>
          <div
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
              name="thumb"
              tabIndex="-1"
              hidden
              {...getInputProps()}
            />
            <p>
              Thêm một ảnh đại diện hấp dẫn sẽ giúp bài viết của bạn cuốn hút
              hơn với độc giả.
            </p>
            <span>Kéo thả ảnh vào đây, hoặc bấm để chọn ảnh</span>
          </div>
          <ContentEditable
            className={`${styles.contentEditable} ${styles.title}`}
            text={'Tiêu đề khi tin được hiển thị'}
            value={data.title}
            onKeyPress={e => setTitleDisplay(e.target.innerText)}
          />
          <ContentEditable
            className={`${styles.contentEditable} ${styles.description}`}
            text={'Mô tả khi tin được hiển thị'}
            value={data.description}
            onKeyPress={e => setDescription(e.target.innerText)}
          />
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
            onChange={e => setTags(e.target.value)}
          />
          <form className={styles.allow}>
            <input
              type="checkbox"
              checked
              className={styles.checkMark}
              onChange={() => setAllow(prev => !prev)}
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
            <button className={styles.postButton} onClick={publicHandler}>
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

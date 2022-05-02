import React, { useEffect, previewVideo } from 'react'
import MainModal from '../utils/main-modal/MainModal'
import styles from './PreviewCourse.module.scss'
import VideoPlayer from './VideoPlayer'

const PreviewCourse = ({
  showVideoPreviewCourse,
  isShowVideoPreviewCourse,
  previewVideo,
}) => {
  useEffect(() => {
    const resize = () =>
      window.innerWidth < 739 && showVideoPreviewCourse(false)

    window.addEventListener(
      'resize',
      () => window.innerWidth < 739 && showVideoPreviewCourse(false)
    )

    return () => window.removeEventListener('resize', resize)
  }, [showVideoPreviewCourse])

  return (
    <MainModal
      show={isShowVideoPreviewCourse}
      onHide={showVideoPreviewCourse}
      centered={true}
      closeButton={true}
    >
      <div className={styles.wrapper}>
        <h3>Giới thiệu khóa học</h3>
        <h2>Xây Dựng Website với ReactJS</h2>
        <VideoPlayer videoId={previewVideo} />
      </div>
    </MainModal>
  )
}

export default PreviewCourse

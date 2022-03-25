import React from 'react'

import styles from './PreviewCourse.module.scss'
import VideoPlayer from './VideoPlayer'

const PreviewCourse = ({ previewVideo, showHandler }) => {
  return (
    <div className={styles.wrapper} onClick={showHandler}>
      <div className={styles.body} onClick={e => e.stopPropagation()}>
        <div className={styles.heading}>
          <h3>Giới thiệu khóa học</h3>
          <h2>Xây Dựng Website với ReactJS</h2>
          <i className="bi bi-x" onClick={showHandler}></i>
        </div>
        <VideoPlayer videoId={previewVideo} page={'course-slug'} />
      </div>
    </div>
  )
}

export default PreviewCourse

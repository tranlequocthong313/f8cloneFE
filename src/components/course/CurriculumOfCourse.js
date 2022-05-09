import React, { useState, useEffect } from 'react'
import CourseCollapse from './CourseCollapse'
import styles from './CurriculumOfCourse.module.scss'

const CurriculumOfCourse = ({ episodeList, totalLesson }) => {
  const [collapsedCurriculum, setCollapsedCurriculum] = useState([])
  const [collapsedCurriculumAll, setCollapsedCurriculumAll] = useState([])
  const [isCollapsedCurriculumAll, setIsCollapsedCurriculumAll] =
    useState(false)

  useEffect(() => {
    episodeList.map((episode) =>
      setCollapsedCurriculumAll((prev) => [...prev, episode._id])
    )
  }, [episodeList])

  const collapseCurriculumSingle = (id) =>
    setCollapsedCurriculum((prev) => {
      const isOpen = prev.includes(id)

      if (isOpen) {
        const newCollapsed = prev.filter((item) => item !== id)
        newCollapsed.length !== collapsedCurriculumAll.length &&
          setIsCollapsedCurriculumAll(false)
        return newCollapsed
      }

      const newCollapsed = [...prev, id]
      newCollapsed.length === collapsedCurriculumAll.length &&
        setIsCollapsedCurriculumAll(true)
      return newCollapsed
    })

  const handleCollapseCurriculumAll = () => {
    if (!isCollapsedCurriculumAll) {
      setCollapsedCurriculum((prev) => [...prev, ...collapsedCurriculumAll])
      setIsCollapsedCurriculumAll(true)
    } else {
      setCollapsedCurriculum([])
      setIsCollapsedCurriculumAll(false)
    }
  }

  return (
    <div className={styles.curriculumOfCourse}>
      <div className={styles.headerSticky}>
        <div className={styles.headerBlock}>
          <h3>Nội dung khóa học</h3>
        </div>
      </div>
      <div className={styles.subHeadWrapper}>
        <ul>
          <li>
            <strong>{episodeList.length}</strong> chương
          </li>
          <li className={styles.dot}>.</li>
          <li>
            <strong>{totalLesson.length}</strong> bài học
          </li>
        </ul>
        <div className={styles.toggleBtn} onClick={handleCollapseCurriculumAll}>
          {!isCollapsedCurriculumAll ? 'Mở rộng tất cả' : 'Thu nhỏ tất cả'}
        </div>
      </div>
      <div className={styles.curriculumPanel}>
        <div className={styles.panelGroup}>
          {episodeList.map((episode) => (
            <div className={styles.panel} key={episode._id}>
              <div
                className={styles.panelHeading}
                onClick={() => collapseCurriculumSingle(episode._id)}
              >
                <h5 className={styles.panelTitle}>
                  <div className={styles.headLine}>
                    {collapsedCurriculum.includes(episode._id) ? (
                      <i className="fa-solid fa-minus"></i>
                    ) : (
                      <i className="fa-solid fa-plus"></i>
                    )}
                    <div className={`${styles.floatLeft} ${styles.groupName}`}>
                      <strong>{episode.title}</strong>
                    </div>
                    <span className={styles.timeOfSection}>
                      {episode.lessons.length} bài học
                    </span>
                  </div>
                </h5>
              </div>
              <CourseCollapse
                collapsedCurriculum={collapsedCurriculum}
                episodeId={episode._id}
                lessons={episode.lessons}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CurriculumOfCourse

import React, { useState, useEffect } from 'react'
import CourseCollapse from './CourseCollapse'
import styles from './CurriculumOfCourse.module.scss'
import '../../sass/_float.scss'

const CurriculumOfCourse = ({ episodeList }) => {
  const [open, setOpen] = useState([])
  const [openAll, setOpenAll] = useState([])
  const [isOpenAll, setIsOpenAll] = useState(false)

  useEffect(() => {
    episodeList.map(episode => setOpenAll(prev => [...prev, episode.id]))
  }, [episodeList])

  const openHandler = id =>
    setOpen(prev => {
      const isOpen = prev.includes(id)

      if (isOpen) {
        const newArray = prev.filter(item => item !== id)

        if (newArray.length !== openAll.length) {
          setIsOpenAll(false)
        }

        return newArray
      } else {
        const newArray = [...prev, id]

        if (newArray.length === openAll.length) {
          setIsOpenAll(true)
        }

        return newArray
      }
    })

  const handleOpenAll = () => {
    if (!isOpenAll) {
      setOpen(prev => [...prev, ...openAll])
      setIsOpenAll(true)
    } else {
      setOpen([])
      setIsOpenAll(false)
    }
  }

  return (
    <div className={styles.curriculumOfCourse}>
      <div className={styles.headerSticky}>
        <div className={styles.headerBlock}>
          <h3 className={'floatLeft'}>Nội dung khóa học</h3>
        </div>
      </div>
      <div className={styles.subHeadWrapper}>
        <ul>
          <li>
            <strong>4</strong> chương
          </li>
          <li className={styles.dot}>.</li>
          <li>
            <strong>10</strong> bài học
          </li>
          <li className={styles.dot}>.</li>
          <li>
            Thời lượng <strong>03 giờ 25 phút</strong>
          </li>
        </ul>
        <div className={styles.toggleBtn} onClick={handleOpenAll}>
          {!isOpenAll ? 'Mở rộng tất cả' : 'Thu nhỏ tất cả'}
        </div>
      </div>
      <div className={styles.curriculumPanel}>
        <div className={styles.panelGroup}>
          {episodeList.map(episode => (
            <div className={styles.panel} key={episode.id}>
              <div
                className={styles.panelHeading}
                onClick={() => openHandler(episode.id)}
              >
                <h5 className={styles.panelTitle}>
                  <div className={styles.headLine}>
                    {open.includes(episode.id) ? (
                      <i className="bi bi-dash"></i>
                    ) : (
                      <i className="bi bi-plus"></i>
                    )}
                    <div className={`${styles.floatLeft} ${styles.groupName}`}>
                      <strong>{episode.title}</strong>
                    </div>
                    <span className={`floatRight ${styles.timeOfSection}`}>
                      {episode.lessons.length} bài học
                    </span>
                  </div>
                </h5>
              </div>
              <CourseCollapse
                open={open}
                episodeId={episode.id}
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

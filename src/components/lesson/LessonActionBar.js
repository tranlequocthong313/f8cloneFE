import styles from './LessonActionBar.module.scss'
import VerticalModal from '../../utils/modal/VerticalModal'
import LessonTrackItem from './LessonTrackItem'
import { LessonContext } from '../../context/LessonContext'
import { useContext } from 'react'

const LessonActionBar = ({
  episodes,
  handleIsShowMenuTrack,
  isShowMenuTrack,
}) => {
  const { episodeChosenTitle } = useContext(LessonContext)

  return (
    <div className={styles.wrapper}>
      <div className={styles.toggleTrackMenu} onClick={handleIsShowMenuTrack}>
        <h4 className={styles.title}>{episodeChosenTitle}</h4>
        <button className={styles.toggleButton}>
          {!isShowMenuTrack && <i className="fa-solid fa-bars"></i>}
          {isShowMenuTrack && <i className="fa-solid fa-arrow-right"></i>}
        </button>
      </div>
      <div className={styles.mobileAndTabletTrack}>
        <VerticalModal
          button={
            <div className={styles.toggleTrackMenu}>
              <h4 className={styles.title}>{episodeChosenTitle}</h4>
              <button className={styles.toggleButton}>
                <i className="fa-solid fa-bars"></i>
              </button>
            </div>
          }
          closeButton={true}
          hideOnComputer={true}
          header={
            <h4 style={{ fontSize: 16, fontWeight: 600 }}>Nội dung khóa học</h4>
          }
          className={styles.modalWrapper}
        >
          <div
            className={styles.container}
            style={{
              'overflow-y': 'scroll',
            }}
          >
            <div className={styles.body}>
              <LessonTrackItem episodes={episodes} />
            </div>
          </div>
        </VerticalModal>
      </div>
    </div>
  )
}

export default LessonActionBar

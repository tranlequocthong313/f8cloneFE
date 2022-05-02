import styles from './LessonActionBar.module.scss'
import VerticalModal from '../utils/vertical-modal/VerticalModal'
import LessonTrackItem from './LessonTrackItem'

const LessonActionBar = ({
  episodes,
  handleIsShowMenuTrack,
  isShowMenuTrack,
}) => {
  return (
    <div className={styles.wrapper}>
      <button className={styles.button}>
        <i className="fa-solid fa-chevron-left"></i>
        <span>BÀI TRƯỚC</span>
      </button>
      <button
        className={`${styles.button} ${styles.primary} ${styles.disabled}`}
      >
        <span>BÀI TIẾP THEO</span>
        <i className="fa-solid fa-chevron-right"></i>
      </button>
      <div className={styles.toggleTrackMenu} onClick={handleIsShowMenuTrack}>
        <h4 className={styles.title}>1. Khái niệm kỹ thuật cần biết</h4>
        <button className={styles.toggleButton}>
          {!isShowMenuTrack && <i className="fa-solid fa-bars"></i>}
          {isShowMenuTrack && <i className="fa-solid fa-arrow-right"></i>}
        </button>
      </div>

      <div className={styles.mobileAndTabletTrack}>
        <VerticalModal
          button={
            <div className={styles.toggleTrackMenu}>
              <h4 className={styles.title}>1. Khái niệm kỹ thuật cần biết</h4>
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
          <div className={styles.container}>
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

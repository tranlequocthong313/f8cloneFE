import { useState } from 'react'
import styles from './Notification.module.scss'
import '../../../../sass/_custom.scss'
// import BackDrop from '../../../utils/backdrop/BackDrop'

const Notification = ({ notifications }) => {
  const [seen, setSeen] = useState(false)
  const [show, setShow] = useState(false)
  const [showMarkAll, setShowMarkAll] = useState(false)

  const seenHandler = () => {
    setSeen(prev => !prev)
  }

  const showHandler = () => {
    setShow(prev => !prev)
  }

  const showMarkAllHandler = () => {
    setShowMarkAll(prev => !prev)
  }

  return (
    <>
      {/* <BackDrop show={show} onClick={showHandler} /> */}
      <i
        className={`${styles.userNotification} bi bi-bell-fill`}
        onClick={showHandler}
      >
        {/* {show && (
          <div className={styles.wrapper} onClick={e => e.stopPropagation()}>
            <header className={styles.header}>
              <h6>Thông báo</h6>
              <i className="bi bi-three-dots" onClick={showMarkAllHandler}>
                {showMarkAll && (
                  <ul className={styles.markAll} onClick={seenHandler}>
                    <li>
                      <i className="bi bi-check"></i>
                      <span>Đánh dấu tất cả đẫ đọc</span>
                    </li>
                  </ul>
                )}
              </i>
            </header>
            <div className={styles.body}>
              <ul className={styles.list}>
                {notifications.map(notification => (
                  <li
                    className={!seen ? styles.noSeen : ''}
                    key={notification.id}
                    onClick={() => seenHandler(notification.id)}
                  >
                    <Link to={'/'} onClick={showHandler}>
                      <div className={styles.avatar}>
                        <Image src={notification.avatar} />
                      </div>
                      <div className={styles.content}>
                        <div>
                          <span className={styles.name}>
                            {notification.name}
                          </span>{' '}
                          {notification.description}
                        </div>
                        <div className={styles.createdTime}>
                          {notification.time}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
                <li className={!seen ? styles.noSeen : ''}>
                  <div className={styles.avatar}>
                    <Image
                      src={
                        'https://fullstack.edu.vn/assets/images/f8_avatar.png'
                      }
                    />
                  </div>
                  <div className={styles.content}>
                    <div>
                      Chào mừng{' '}
                      <span className={styles.name}>Thống Trần Lê Quốc </span>
                      đã gia nhập F8. Hãy luôn đam mê, kiên trì và theo đuổi mục
                      tiêu tới cùng bạn nhé ❤️
                    </div>
                    <div className={styles.createdTime}>vài giây trước</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )} */}
      </i>
    </>
  )
}

export default Notification

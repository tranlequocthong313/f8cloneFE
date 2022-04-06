import { useState } from 'react'
import styles from './Notification.module.scss'
import '../../../../sass/_custom.scss'
import Tippy from '../../../utils/tippy/Tippy'
import { Link } from 'react-router-dom'
import f8logo from '../../../../asset/images/f8_icon.png'

const Notification = ({ notifications }) => {
  const [seen, setSeen] = useState(false)
  const [showMarkAll, setShowMarkAll] = useState(false)

  const seenHandler = () => {
    setSeen((prev) => !prev)
  }

  const showMarkAllHandler = () => {
    setShowMarkAll((prev) => !prev)
  }

  return (
    <Tippy
      button={<i className={`${styles.userNotification} fa-solid fa-bell`}></i>}
      className={styles.wrapper}
    >
      <header className={styles.header}>
        <h6>Thông báo</h6>
        <Tippy
          button={<i className="bi bi-three-dots"></i>}
          className={styles.markAll}
        >
          <div className={styles.markAllItem} onClick={seenHandler}>
            <i className="bi bi-check"></i>
            <span>Đánh dấu tất cả đẫ đọc</span>
          </div>
        </Tippy>
      </header>
      <div className={styles.body}>
        <ul className={styles.list}>
          {/* {notifications.map((notification) => (
              <li
                className={!seen ? styles.noSeen : ''}
                key={notification.id}
                onClick={() => seenHandler(notification.id)}
              >
                <Link to={'/'}>
                  <div className={styles.avatar}>
                    <img alt="" src={notification.avatar} />
                  </div>
                  <div className={styles.content}>
                    <div>
                      <span className={styles.name}>{notification.name}</span>{' '}
                      {notification.description}
                    </div>
                    <div className={styles.createdTime}>
                      {notification.time}
                    </div>
                  </div>
                </Link>
              </li>
            ))} */}
          <li className={!seen ? styles.noSeen : ''}>
            <div className={styles.avatar}>
              <img alt="" src={f8logo} />
            </div>
            <div className={styles.content}>
              <div>
                Chào mừng{' '}
                <span className={styles.name}>Thống Trần Lê Quốc </span>
                đã gia nhập F8. Hãy luôn đam mê, kiên trì và theo đuổi mục tiêu
                tới cùng bạn nhé ❤️
              </div>
              <div className={styles.createdTime}>vài giây trước</div>
            </div>
          </li>
        </ul>
      </div>
    </Tippy>
  )
}

export default Notification

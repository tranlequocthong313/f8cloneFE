import { useEffect, useState } from 'react'
import styles from './Notification.module.scss'
import '../../../../sass/_custom.scss'
import Tippy from '../../../utils/tippy/Tippy'
import { Link } from 'react-router-dom'
import f8logo from '../../../../asset/images/f8_icon.png'
import { apiURL } from '../../../../context/constants'
import timeSinceHandler from '../../../utils/timeSinceHandler/timeSinceHandler'
import Cookies from 'js-cookie'

const Notification = ({ notifications }) => {
  const [seenAll, setSeenAll] = useState([])
  const [newPostNotification, setNewPostNotification] = useState([])
  const [noSeenCount, setNoSeenCount] = useState([])

  useEffect(() => {
    const controller = new AbortController()

    ;(async () => {
      try {
        const token = Cookies.get('token')
        if (!token) return

        const res = await fetch(
          `${apiURL}/notification/`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
          {
            signal: controller.signal,
          },
        )

        const data = await res.json()
        data.forEach((item) => {
          if (!item.isSeen) setNoSeenCount((prev) => [...prev, item._id])
          setSeenAll((prev) => [...prev, item._id])
        })
        setNewPostNotification(data)
      } catch (error) {
        console.log(error)
      }
    })()

    return () => controller?.abort()
  }, [])

  const countNoSeenHandler = (id) => {
    const isSeenCount = noSeenCount.includes(id)
    isSeenCount && setNoSeenCount((prev) => prev.filter((item) => item !== id))
  }

  console.log(noSeenCount)

  console.log(noSeenCount.length)

  const seenHandler = async (notificationId) => {
    try {
      const token = Cookies.get('token')
      if (!token) return

      const res = await fetch(`${apiURL}/notification/seen-notification`, {
        method: 'POST',
        body: JSON.stringify({
          notificationId: notificationId ? [notificationId] : seenAll,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()
      notificationId ? countNoSeenHandler(notificationId) : setNoSeenCount([])
      setNewPostNotification(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Tippy
      button={
        <i className={`${styles.userNotification} fa-solid fa-bell`}>
          {newPostNotification &&
            newPostNotification.length > 0 &&
            noSeenCount.length > 0 && (
              <div className={styles.notificationCount}>
                {noSeenCount.length}
              </div>
            )}
        </i>
      }
      className={styles.wrapper}
    >
      <header className={styles.header}>
        <h6>Thông báo</h6>
        <Tippy
          button={<i className="bi bi-three-dots"></i>}
          className={styles.markAll}
        >
          <div className={styles.markAllItem} onClick={() => seenHandler(null)}>
            <i className="bi bi-check"></i>
            <span>Đánh dấu tất cả đẫ đọc</span>
          </div>
        </Tippy>
      </header>
      <div className={styles.body}>
        <ul className={styles.list}>
          {newPostNotification &&
            newPostNotification.length !== 0 &&
            newPostNotification.map((notification) => (
              <li
                className={
                  notification.isSeen
                    ? styles.item
                    : `${styles.item} ${styles.noSeen}`
                }
                key={notification._id}
                onClick={() => seenHandler(notification._id)}
              >
                <Link to={`/blog/${notification.slug}`}>
                  <div className={styles.avatar}>
                    <img
                      alt=""
                      src={notification.image ? notification.image : f8logo}
                    />
                  </div>
                  <div className={styles.content}>
                    <div>
                      <span className={styles.name}>{notification.title}</span>{' '}
                      {notification.description}
                    </div>
                    <div className={styles.createdTime}>
                      {timeSinceHandler(notification.createdAt)}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          <li className={`${styles.item} ${styles.noSeen}`}>
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

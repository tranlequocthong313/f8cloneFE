import { useContext, useEffect, useState } from 'react'
import styles from './Notification.module.scss'
import '../../../../sass/_custom.scss'
import Tippy from '../../../../utils/tippy/Tippy'
import { Link } from 'react-router-dom'
import f8logo from '../../../../asset/images/f8_icon.png'
import { apiURL } from '../../../../context/constants'
import { timeSince } from '../../../../utils/format/index'
import Cookies from 'js-cookie'
import { SocketContext } from '../../../../context/SocketContext'
import { Dropdown } from 'react-bootstrap'
import consoleLog from '../../../../utils/console-log/consoleLog'

const Notification = () => {
  const [seenAll, setSeenAll] = useState([])
  const [notifications, setNotifications] = useState([])

  const { current } = useContext(SocketContext).socket

  useEffect(() => {
    current?.on('notificationReceived', async (data) => {
      const url = `${apiURL}/notification/new-notification`
      const notifications = await createNotification(url, data)

      setNotifications((prev) => [notifications, ...prev])
      handleSetSeenAll([notifications])
    })
  }, [current])

  const createNotification = async (url, notificationData) => {
    try {
      return (
        await fetch(url, {
          method: 'POST',
          body: JSON.stringify(notificationData),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      ).json()
    } catch (error) {
      consoleLog(error.message)
    }
  }

  const handleSetSeenAll = (notificationData) =>
    notificationData.forEach((item) =>
      setSeenAll((prev) => [...prev, item._id])
    )

  useEffect(() => {
    ;(async () => {
      try {
        const token = Cookies.get('token')
        if (!token) return

        const res = await fetch(`${apiURL}/notification/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await res.json()

        handleSetSeenAll(data)
        setNotifications(data)
      } catch (error) {
        consoleLog(error.message)
      }
    })()
  }, [])

  const seenOrSeenAll = async (notificationId) => {
    const token = Cookies.get('token')
    if (!token) return

    const url = `${apiURL}/notification/seen-notification`
    const data = await deleteNotification(url, notificationId, token)

    setNotifications(data)
    handleSetSeenAll(data)
  }

  const deleteNotification = async (url, notificationId, token) => {
    try {
      return (
        await fetch(url, {
          method: 'DELETE',
          body: JSON.stringify({
            notificationId,
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      ).json()
    } catch (error) {
      consoleLog(error.message)
    }
  }

  return (
    <Tippy
      button={
        <i className={`${styles.userNotification} fa-solid fa-bell`}>
          {notifications &&
            notifications.length > 0 &&
            notifications.length > 0 && (
              <div className={styles.notificationCount}>
                {notifications.length}
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
          <Dropdown.Item
            className={styles.markAllItem}
            onClick={() => seenOrSeenAll(seenAll)}
          >
            <i className="bi bi-check"></i>
            <span>Đánh dấu tất cả đẫ đọc</span>
          </Dropdown.Item>
        </Tippy>
      </header>
      <div className={styles.body}>
        <ul className={styles.list}>
          {notifications &&
            notifications.length !== 0 &&
            notifications.map((notification) => (
              <li
                className={
                  notification.isSeen
                    ? styles.item
                    : `${styles.item} ${styles.noSeen}`
                }
                href={`/${
                  notification.postType === 'blogs' ? 'blog' : 'lesson'
                }/${notification.postId}`}
                key={notification._id}
                onClick={() => seenOrSeenAll([notification._id])}
              >
                <Link
                  to={`/${
                    notification.postType === 'blogs' ? 'blog' : 'lesson'
                  }/${notification.postId}`}
                >
                  <div className={styles.avatar}>
                    <img
                      alt={`${notification.senderName} ảnh đại diện`}
                      src={notification.senderImage}
                    />
                  </div>
                  <div className={styles.content}>
                    <div>
                      <span className={styles.name}>
                        {notification.senderName}
                      </span>{' '}
                      {notification.description}
                    </div>
                    <div className={styles.createdTime}>
                      {timeSince(notification.createdAt)}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          <li className={styles.item}>
            <div className={styles.avatar}>
              <img alt="F8 logo" src={f8logo} />
            </div>
            <div className={styles.content}>
              <div>
                Chào mừng{' '}
                <span className={styles.name}>Thống Trần Lê Quốc </span>
                đã gia nhập F8. Hãy luôn đam mê, kiên trì và theo đuổi mục tiêu
                tới cùng bạn nhé ❤️
              </div>
            </div>
          </li>
        </ul>
      </div>
    </Tippy>
  )
}

export default Notification

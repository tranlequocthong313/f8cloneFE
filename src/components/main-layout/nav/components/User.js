import React, { useState, useEffect } from 'react'
import { Image } from 'react-bootstrap'
import Notification from './Notification'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './User.module.scss'
import MyCourse from './MyCourse'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import BackDrop from '../../../utils/backdrop/BackDrop'
import { Link } from 'react-router-dom'
import userDefaultImage from '../../../../asset/nobody_m.256x256.jpg'
import { auth } from '../../../../firebase/config'
import { useDispatch } from 'react-redux'
import { logout } from '../../../../actions/userAction'
import Cookies from 'js-cookie'

const NOTIFICATION_DUMMY_DATA = [
  {
    id: Math.random(),
    avatar:
      'https://files.fullstack.edu.vn/f8-prod/user_photos/172872/621507f705718.jpg',
    name: 'Nguyễn Văn Vinh',
    description: 'đã nhắc tới bạn trong một bình luận',
    time: 'một năm trước',
  },
  {
    id: Math.random(),
    avatar:
      'https://files.fullstack.edu.vn/f8-prod/user_photos/172872/621507f705718.jpg',
    name: 'Nguyễn Văn Vinh',
    description: 'đã nhắc tới bạn trong một bình luận',
    time: 'một năm trước',
  },
  {
    id: Math.random(),
    avatar:
      'https://files.fullstack.edu.vn/f8-prod/user_photos/172872/621507f705718.jpg',
    name: 'Nguyễn Văn Vinh',
    description: 'đã nhắc tới bạn trong một bình luận',
    time: 'một năm trước',
  },
  {
    id: Math.random(),
    avatar:
      'https://files.fullstack.edu.vn/f8-prod/user_photos/172872/621507f705718.jpg',
    name: 'Nguyễn Văn Vinh',
    description: 'đã nhắc tới bạn trong một bình luận',
    time: 'một năm trước',
  },
  {
    id: Math.random(),
    avatar:
      'https://files.fullstack.edu.vn/f8-prod/user_photos/172872/621507f705718.jpg',
    name: 'Nguyễn Văn Vinh',
    description: 'đã nhắc tới bạn trong một bình luận',
    time: 'một năm trước',
  },
  {
    id: Math.random(),
    avatar:
      'https://files.fullstack.edu.vn/f8-prod/user_photos/172872/621507f705718.jpg',
    name: 'Nguyễn Văn Vinh',
    description: 'đã nhắc tới bạn trong một bình luận',
    time: 'một năm trước',
  },
  {
    id: Math.random(),
    avatar:
      'https://files.fullstack.edu.vn/f8-prod/user_photos/172872/621507f705718.jpg',
    name: 'Nguyễn Văn Vinh',
    description: 'đã nhắc tới bạn trong một bình luận',
    time: 'một năm trước',
  },
  {
    id: Math.random(),
    avatar:
      'https://files.fullstack.edu.vn/f8-prod/user_photos/172872/621507f705718.jpg',
    name: 'Nguyễn Văn Vinh',
    description: 'đã nhắc tới bạn trong một bình luận',
    time: 'một năm trước',
  },
]

const User = ({ photoURL, displayName, email, currentPage }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [show, setShow] = useState(false)
  const showHandler = () => setShow(prev => !prev)

  // Dispatch logout action and navigate user to login page after logout
  const dispatchAndNavigateHandler = () => {
    dispatch(logout())
    navigate('/login')
  }

  const singOutHandler = () => {
    Cookies.remove('token')
    dispatchAndNavigateHandler()

    signOut(auth)
      .then(() => {
        dispatchAndNavigateHandler()
      })
      .catch(error => error)
  }

  // Listen window resize to hide mobile nav on computer
  useEffect(() => {
    const resizeHandler = () => {
      if (window.innerWidth >= 1024) return setShow(false)
    }
    window.addEventListener('resize', resizeHandler)

    return () => window.removeEventListener('resize', resizeHandler)
  }, [])

  return (
    // <div className={styles.userAction}>
    <>
      <MyCourse />
      <Notification notifications={NOTIFICATION_DUMMY_DATA} />
      <>
        <BackDrop onClick={showHandler} show={show} />
        <Image
          className={styles.userPicture}
          src={photoURL || userDefaultImage}
          onClick={showHandler}
        />
        {show && (
          <div className={styles.container} onClick={e => e.stopPropagation()}>
            <div className={styles.user}>
              <Image
                src={photoURL || userDefaultImage}
                className={styles.avatar}
              />
              <div className={styles.info}>
                <div className={styles.name}>{displayName || null}</div>
                <div className={styles.fullName}>{email || null}</div>
              </div>
            </div>
            <hr></hr>
            <div className={styles.content}>
              <ul className={styles.list}>
                <li>
                  <Link to="new-blog">Viết blog</Link>
                </li>
                <li>
                  <Link to="me/bookmark/posts">Bài viết của tôi</Link>
                </li>
                <hr></hr>
                <li>
                  <Link to="me/bookmark/posts">Bài viết đã lưu</Link>
                </li>
                <hr></hr>

                <li>
                  <Link to="settings">Cài đặt</Link>
                </li>
                <li>
                  <Link to="/login" onClick={singOutHandler}>
                    Đăng xuất
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </>
    </>
    // </div>
  )
}

export default User

import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Row, Col, Image } from 'react-bootstrap'
import styles from './BlogDetail.module.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useNavigate } from 'react-router-dom'
import BlogSameAuthor from './BlogSameAuthor'
import BlogHighlights from './BlogHighlights'
import Topics from '../blog/Topics'
import noPhotoUser from '../../asset/images/nobody_m.256x256.jpg'
import timeSinceHandler from '../utils/timeSinceHandler/timeSinceHandler'
import { apiURL } from '../../context/constants'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import Reaction from './Reaction'
import Comment from '../utils/comment/Comment'
import io from 'socket.io-client'
import Tippy from '../utils/tippy/Tippy'

const socket = io.connect(apiURL)

const BlogDetail = ({ blog }) => {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()

  const [likeCount, setLikeCount] = useState(blog.likes)
  const [isLike, setIsLike] = useState(blog.likes.includes(user.userId))
  const [showComment, setShowComment] = useState(false)
  const [commentData, setCommentData] = useState(blog.comments)
  const [bookmarkData, setBookmarkData] = useState(null)

  useEffect(() => {
    socket.on('comment', (comment) => {
      setCommentData((prev) => {
        return [comment, ...prev]
      })
    })
  }, [])

  useEffect(() => {
    document.body.style.overflow = showComment ? 'hidden' : 'overlay'
  }, [showComment])

  useEffect(() => {
    setIsLike(likeCount.includes(user.userId))
  }, [user.userId, likeCount])

  const likeHandler = async () => {
    try {
      const token = Cookies.get('token')
      if (!token) return navigate('/login')

      const res = await fetch(`${apiURL}/blog/like`, {
        method: 'PUT',
        body: JSON.stringify({ blogId: blog._id }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()
      data.likes.length === 0 ? setLikeCount([]) : setLikeCount(data.likes)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const controller = new AbortController()

    ;(async () => {
      try {
        const token = Cookies.get('token')
        if (!token) return

        const res = await fetch(
          `${apiURL}/me/bookmark`,
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
        setBookmarkData(data.bookmark)
      } catch (error) {
        console.log(error)
      }
    })()

    return () => controller?.abort()
  }, [])

  const bookmarkHandler = async (blogId) => {
    try {
      const token = Cookies.get('token')
      if (!token) return navigate('/login')

      const res = await fetch(`${apiURL}/me/bookmark`, {
        method: 'PUT',
        body: JSON.stringify({ blogId }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()
      setBookmarkData(data.bookmark)
    } catch (error) {}
  }

  return (
    <Row className={styles.wrapper}>
      <Col xl={2} className={styles.colLeft}>
        <div className={styles.aside}>
          <h4 className={styles.fullName}>{blog.postedBy.fullName}</h4>
          <p className={styles.userTitle}>{blog.postedBy.bio}</p>
          <hr />
          <Reaction
            commentData={commentData}
            isLike={isLike}
            likeCount={likeCount.length}
            likeHandler={likeHandler}
            setShowComment={() => setShowComment(true)}
          />
        </div>
      </Col>
      <Col md={12} lg={12} xl={6} className={styles.colRight}>
        <h3 className={styles.heading}>{blog.title}</h3>
        <div className={styles.header}>
          <div className={styles.user}>
            <Image
              src={
                blog.postedBy.photoURL ? blog.postedBy.photoURL : noPhotoUser
              }
              className={styles.avatar}
            />
            <div className={styles.info}>
              <p className={styles.name}>{blog.postedBy.fullName}</p>
              <p className={styles.time}>
                {timeSinceHandler(blog.createdAt)}{' '}
                <span className={styles.dot}>.</span>
                {blog.readingTime} phút đọc
              </p>
            </div>
          </div>
          <div className={styles.actions}>
            <div
              className={styles.bookmark}
              onClick={() => bookmarkHandler(blog._id)}
            >
              <i
                className={
                  bookmarkData && bookmarkData.includes(blog._id)
                    ? `${styles.bookmarkActive} fa-solid fa-bookmark`
                    : 'fa-regular fa-bookmark'
                }
              ></i>
            </div>
            <Tippy
              button={
                <i className={`fa-solid fa-ellipsis ${styles.option}`}></i>
              }
              className={styles.menuWrapper}
            >
              <div className={styles.menuItem}>
                <i className="fa-brands fa-facebook"></i>
                <span>Chia sẻ lên Facebook</span>
              </div>
              <div className={styles.menuItem}>
                <i className="fa-brands fa-twitter"></i>
                <span>Chia sẻ lên Twitter</span>
              </div>
              <div className={styles.menuItem}>
                <i className="fa-solid fa-envelope"></i>
                <span>Chia sẻ tới Email</span>
              </div>
              <div className={styles.menuItem}>
                <i className="fa-solid fa-link"></i>
                <span>Sao chép liên kết</span>
              </div>
              <div className={styles.menuItem}>
                <i className="fa-solid fa-flag"></i>
                <span>Báo cáo bài viết</span>
              </div>
            </Tippy>
          </div>
        </div>
        <ReactMarkdown children={blog.content} className={styles.markDown} />
        <Reaction
          commentData={commentData}
          isLike={isLike}
          likeCount={likeCount.length}
          likeHandler={likeHandler}
          setShowComment={() => setShowComment(true)}
          blogId={blog._id}
          setCommentData={setCommentData}
        />
        {blog.tags && (
          <div className={styles.tags}>
            {blog.tags.map((tag) => (
              <Link to="/" key={tag}>
                {tag}
              </Link>
            ))}
          </div>
        )}
        <BlogSameAuthor />
        <BlogHighlights blog={blog} />
        <Topics />
      </Col>
    </Row>
  )
}

export default BlogDetail

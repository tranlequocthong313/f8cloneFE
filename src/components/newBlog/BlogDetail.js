import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Row, Col, Image } from 'react-bootstrap'
import styles from './BlogDetail.module.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useNavigate } from 'react-router-dom'
import BlogSameAuthor from './BlogSameAuthor'
import BlogHighlights from './BlogHighlights'
import Topics from '../blogpage/Topics'
import noPhotoUser from '../../asset/nobody_m.256x256.jpg'
import timeSinceHandler from '../utils/timeSinceHandler/timeSinceHandler'
import { apiURL } from '../../context/constants'
import Cookies from 'js-cookie'
import { useSelector, useDispatch } from 'react-redux'
import Reaction from './Reaction'
import Comment from '../utils/comment/Comment'
import io from 'socket.io-client'

const socket = io.connect(apiURL)

const BlogDetail = ({ blog }) => {
  const user = useSelector(state => state.user)
  const navigate = useNavigate()

  const [likeCount, setLikeCount] = useState(blog.likes)
  const [isLike, setIsLike] = useState(blog.likes.includes(user.userId))
  const [showComment, setShowComment] = useState(false)
  const [commentData, setCommentData] = useState(blog.comments)
  const [bookmarkData, setBookmarkData] = useState(null)

  useEffect(() => {
    console.log(blog.likes)
    console.log(user.userId)
    console.log(blog.likes.includes(user.userId))
    // setIsLike(blog.likes.includes(user.userId))
  }, [blog.likes, user.userId])

  useEffect(() => {
    socket.on('comment', comment => {
      console.log('socket on:', comment)
      setCommentData(prev => {
        return [comment, ...prev]
      })
    })
  }, [])

  useEffect(() => {
    if (showComment) {
      document.body.style.overflow = 'hidden'
    }

    if (!showComment) {
      document.body.style.overflow = 'overlay'
    }
  }, [showComment])

  useEffect(() => {
    setIsLike(likeCount.includes(user.userId))
  }, [user.userId, likeCount])

  const likeHandler = async () => {
    try {
      const token = Cookies.get('token')
      if (!token) {
        navigate('/login')
        return
      }

      const res = await fetch(`${apiURL}/blog/like`, {
        method: 'PUT',
        body: JSON.stringify({ blogId: blog._id }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()

      if (data.likes.length === 0) {
        setLikeCount([])
      } else {
        setLikeCount(data.likes)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    const getBookmark = async () => {
      const token = Cookies.get('token')

      if (!token) return

      const res = await fetch(`${apiURL}/me/bookmark`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()
      console.log(data.bookmark)
      setBookmarkData(data.bookmark)
    }

    getBookmark()
  }, [])

  const bookmarkHandler = async blogId => {
    try {
      const token = Cookies.get('token')

      if (!token) {
        return navigate('/login')
      }

      const res = await fetch(`${apiURL}/me/bookmark`, {
        method: 'PUT',
        body: JSON.stringify({ blogId }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()
      console.log(data.bookmark)

      setBookmarkData(data.bookmark)
    } catch (error) {}
  }
  return (
    <Row className={styles.wrapper}>
      {/* {user && user.createBlog.isSuccess && (
        <MainToast
          createStatus={user.blogCreated}
          setCreateStatus={dispatch(
            createBlog({
              show: false,
              isSuccess: false,
            })
          )}
          successText={'Xuất bản thành công'}
        />
      )} */}
      <Col xl={2} className={styles.colLeft}>
        <div className={styles.aside}>
          <h4 className={styles.fullName}>{blog.postedBy.fullName}</h4>
          <p className={styles.userTitle}></p>
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
        <h1 className={styles.heading}>{blog.title}</h1>
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
                    ? `${styles.bookmarkActive} bi bi-bookmark-fill`
                    : 'bi bi-bookmark'
                }
              ></i>
            </div>
            <div className={styles.option}>
              <i className="bi bi-three-dots"></i>
            </div>
          </div>
        </div>
        <ReactMarkdown children={blog.content} />
        <Reaction
          commentData={commentData}
          isLike={isLike}
          likeCount={likeCount.length}
          likeHandler={likeHandler}
          setShowComment={() => setShowComment(true)}
        />
        {blog.tags && (
          <div className={styles.tags}>
            {blog.tags.map(tag => (
              <Link to="/" key={tag}>
                {tag}
              </Link>
            ))}
          </div>
        )}
        <BlogSameAuthor />
        <BlogHighlights />
        <Topics />
      </Col>
      {showComment && (
        <Comment
          setShowComment={() => setShowComment(false)}
          commentData={commentData}
          setCommentData={setCommentData}
          blogId={blog._id}
        />
      )}
    </Row>
  )
}

export default BlogDetail

import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Row, Col, Image } from 'react-bootstrap'
import styles from './BlogDetail.module.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useNavigate } from 'react-router-dom'
import BlogSameAuthor from './BlogSameAuthor'
import BlogHighlights from './BlogHighlights'
import timeSince from '../utils/timeSince/timeSince'
import { apiURL } from '../../context/constants'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import Reaction from './Reaction'
import Tippy from '../utils/tippy/Tippy'
import MainButton from '../utils/button/MainButton'
import io from 'socket.io-client'
import remarkGfm from 'remark-gfm'

const socket = io.connect(apiURL)

const BlogDetail = ({ blog, blogHighlight }) => {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()

  const [likeCount, setLikeCount] = useState(blog.likes)
  const [isLike, setIsLike] = useState(blog.likes.includes(user.userId))
  const [isShowComment, setIsShowComment] = useState(false)
  const [commentData, setCommentData] = useState(blog.comments)
  const [bookmarkData, setBookmarkData] = useState(null)
  const [isShowVerifyBar, setIsShowVerifyBar] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    socket.on('comment', (comment) => {
      setCommentData((prev) => {
        return [comment, ...prev]
      })
    })
  }, [])

  useEffect(
    () => (document.body.style.overflow = isShowComment ? 'hidden' : 'overlay'),
    [isShowComment]
  )

  useEffect(
    () => setIsLike(likeCount.includes(user.userId)),
    [user.userId, likeCount]
  )

  useEffect(() => {
    ;(async () => {
      const token = Cookies.get('token')
      if (!token) return

      const url = `${apiURL}/me/bookmark`
      const data = await getBookmark(url, token)

      setBookmarkData(data.bookmark)
    })()
  }, [])

  const getBookmark = async (url, token) => {
    try {
      return (
        await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      ).json()
    } catch (error) {
      console.log(error.message)
    }
  }

  const bookmark = async (blogId) => {
    const token = Cookies.get('token')
    if (!token) return navigate('/login')

    const url = `${apiURL}/me/bookmark`
    const data = await patchBookmark(url, blogId, token)
    if (data.status === 500) return

    setBookmarkData(data.bookmark)
  }

  const patchBookmark = async (url, blogId, token) => {
    try {
      return (
        await fetch(url, {
          method: 'PATCH',
          body: JSON.stringify({ blogId }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      ).json()
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleLike = async () => {
    const token = Cookies.get('token')
    if (!token) return navigate('/login')

    const url = `${apiURL}/blog/like`
    const data = await patchLike(url, token)
    if (!data.success) return

    const hasLike = data.likes && data.likes.length !== 0
    hasLike ? setLikeCount(data.likes) : setLikeCount([])
    addNotification(data)
  }

  const patchLike = async (url, token) => {
    try {
      return (
        await fetch(url, {
          method: 'PATCH',
          body: JSON.stringify({ blogId: blog._id }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      ).json()
    } catch (error) {
      console.log(error.message)
    }
  }

  const addNotification = async (blog) => {
    const url = `${apiURL}/notification/new-notification`
    await postNotification(url, blog)
  }

  const postNotification = async (url, blog) => {
    try {
      return await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          description: 'đã yêu thích bài viết của bạn.',
          slug: blog.slug,
          notifiedBy: user.userId,
          sendFor: user.userId === blog.postedBy ? null : blog.postedBy,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  const verifyBlog = async (blogId) => {
    const url = `${apiURL}/admin/blog/verify`
    patchVerifyBlog(url, blogId)
  }

  const patchVerifyBlog = async (url, blogId) => {
    try {
      return await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({ isVerified, blogId }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.log(error.message)
    } finally {
      setIsShowVerifyBar(false)
      navigate('/admin/blog')
    }
  }

  return (
    <Row className={styles.wrapper}>
      {!blog.isVerified && user.isAdmin && !isShowVerifyBar && (
        <div className={styles.verifyBar}>
          <MainButton
            primary={true}
            className={`${styles.button} ${styles.cancel}`}
            onClick={() => {
              setIsVerified(false)
              verifyBlog(blog._id)
            }}
          >
            Không xét duyệt
          </MainButton>
          <MainButton
            primary={true}
            className={styles.button}
            onClick={() => {
              setIsVerified(true)
              verifyBlog(blog._id)
            }}
          >
            Xét duyệt bài viết
          </MainButton>
        </div>
      )}
      {!blog.isVerified && !user.isAdmin && (
        <div className={styles.verifyBar}>
          <i>
            <i className="fa-solid fa-clock"></i>
            Đang chờ kiểm duyệt ...
          </i>
        </div>
      )}
      <Col xl={2} className={styles.colLeft}>
        <div className={styles.aside}>
          <h4 className={styles.fullName}>{blog.postedBy.fullName}</h4>
          <p className={styles.userTitle}>{blog.postedBy.bio}</p>
          <hr />
          <Reaction
            commentData={commentData}
            isLike={isLike}
            likeCount={likeCount.length}
            handleLike={handleLike}
            setShowComment={() => setIsShowComment(true)}
            blogId={blog._id}
            setCommentData={setCommentData}
          />
        </div>
      </Col>
      <Col md={12} lg={12} xl={6} className={styles.colRight}>
        <h3 className={styles.heading}>{blog.title}</h3>
        <div className={styles.header}>
          <div className={styles.user}>
            <Link to={`/${blog.postedBy.slug}`}>
              <Image src={blog.postedBy.photoURL} className={styles.avatar} />
            </Link>
            <div className={styles.info}>
              <Link to={`/${blog.postedBy.slug}`}>
                <p className={styles.name}>{blog.postedBy.fullName}</p>
              </Link>
              <p className={styles.time}>
                {timeSince(blog.createdAt)}{' '}
                <span className={styles.dot}>.</span>
                {blog.readingTime} phút đọc
              </p>
            </div>
          </div>
          <div className={styles.actions}>
            <div className={styles.bookmark} onClick={() => bookmark(blog._id)}>
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
              {user.userId === blog.postedBy._id && (
                <Link
                  to={`/edit-blog/${blog.slug}`}
                  className={styles.menuItem}
                >
                  <i className="fa-solid fa-pen"></i>
                  <span>Sửa bài viết</span>
                </Link>
              )}
              <div data-href={window.location.href} className="fb-share-button">
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ff8clone.tk%2F&amp;src=sdkpreparse"
                  className={styles.menuItem}
                >
                  <i className="fa-brands fa-facebook"></i>
                  <span>Chia sẻ lên Facebook</span>
                </a>
              </div>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href={`https://twitter.com/share?ref_src=twsrc%5Etfw&url=${window.location.href}`}
                className={styles.menuItem}
                data-show-count="false"
              >
                <i className="fa-brands fa-twitter"></i>
                <span>Chia sẻ lên Twitter</span>
              </a>

              <a
                href={`mailto:mail@mail.com;body=${window.location.href}`}
                className={styles.menuItem}
              >
                <i className="fa-solid fa-envelope"></i>
                <span>Chia sẻ tới Email</span>
              </a>
              <div
                className={styles.menuItem}
                onClick={() =>
                  navigator.clipboard.writeText(window.location.href)
                }
              >
                <i className="fa-solid fa-link"></i>
                <span>Sao chép liên kết</span>
              </div>
              {user.userId !== blog.postedBy._id && (
                <div className={styles.menuItem}>
                  <i className="fa-solid fa-flag"></i>
                  <span>Báo cáo bài viết</span>
                </div>
              )}
            </Tippy>
          </div>
        </div>
        <ReactMarkdown
          children={blog.content}
          className={styles.MarkdownParser}
          remarkPlugins={[remarkGfm]}
        />
        <Reaction
          commentData={commentData}
          isLike={isLike}
          likeCount={likeCount.length}
          handleLike={handleLike}
          setShowComment={() => setIsShowComment(true)}
          blogId={blog._id}
          setCommentData={setCommentData}
        />
        {blog.tags && (
          <div className={styles.tags}>
            {blog.tags.map((tag) => (
              <Link to={`/blog/tag/${tag}`} key={tag}>
                {tag}
              </Link>
            ))}
          </div>
        )}

        <BlogSameAuthor postedBy={blog.postedBy._id} blogId={blog._id} />
        <BlogHighlights blogHighlight={blogHighlight} />
      </Col>
    </Row>
  )
}

export default BlogDetail

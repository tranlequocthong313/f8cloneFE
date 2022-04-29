import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Row, Col, Image, Dropdown } from 'react-bootstrap'
import styles from './BlogDetail.module.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useHistory } from 'react-router-dom'
import BlogSameAuthor from './BlogSameAuthor'
import BlogHighlights from './BlogHighlights'
import timeSince from '../utils/timeSince/timeSince'
import { apiURL } from '../../context/constants'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import Reaction from './Reaction'
import Tippy from '../utils/tippy/Tippy'
import MainButton from '../utils/button/MainButton'
import remarkGfm from 'remark-gfm'

const BlogDetail = ({ blog, blogHighlight }) => {
  const user = useSelector((state) => state.user)
  const history = useHistory()

  const [likeCount, setLikeCount] = useState(blog.likes)
  const [isLike, setIsLike] = useState(blog.likes.includes(user.userId))
  const [bookmarkData, setBookmarkData] = useState(null)

  useEffect(() => {
    ;(async () => {
      const { accessToken } = JSON.parse(Cookies.get('userData'))
      if (!accessToken) return

      const url = `${apiURL}/me/bookmark`
      const data = await getBookmark(url, accessToken)

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
    const { accessToken } = JSON.parse(Cookies.get('userData'))
    if (!accessToken) return history.push('/login')

    const url = `${apiURL}/me/bookmark`
    const data = await patchBookmark(url, blogId, accessToken)
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
    const { accessToken } = JSON.parse(Cookies.get('userData'))
    if (!accessToken) return history.push('/login')

    const url = isLike
      ? `${apiURL}/blog/unlike/${blog._id}`
      : `${apiURL}/blog/like/${blog._id}`
    const data = await patchLike(url, accessToken)

    if (data.likes && data.likes.length > 0) {
      setLikeCount(data.likes)
      setIsLike(data.likes.includes(user.userId))
    } else {
      setIsLike(false)
      setLikeCount([])
    }
  }

  const patchLike = async (url, token) => {
    try {
      return (
        await fetch(url, {
          method: 'PATCH',
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

  const notAllowBlog = async () => {
    const url = `${apiURL}/admin/blog/verify`
    patchVerifyBlog(url, false)
  }

  const allowBlog = async () => {
    const url = `${apiURL}/admin/blog/verify`
    patchVerifyBlog(url, true)
  }

  const patchVerifyBlog = async (url, isVerified) => {
    try {
      return await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({ isVerified, blogId: blog._id }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.log(error.message)
    } finally {
      history.push('/admin/blog')
    }
  }

  return (
    <Row className={styles.wrapper}>
      {!blog.isVerified && user.isAdmin && (
        <div className={styles.verifyBar}>
          <MainButton
            primary={true}
            className={`${styles.button} ${styles.cancel}`}
            onClick={notAllowBlog}
          >
            Không xét duyệt
          </MainButton>
          <MainButton
            primary={true}
            className={styles.button}
            onClick={allowBlog}
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
            isLike={isLike}
            likeCount={likeCount.length}
            handleLike={handleLike}
            blog={blog}
          />
        </div>
      </Col>
      <Col md={12} lg={12} xl={6} className={styles.colRight}>
        <h3 className={styles.heading}>{blog.title}</h3>
        <div className={styles.header}>
          <div className={styles.user}>
            <Image src={blog.postedBy.photoURL} className={styles.avatar} />

            <div className={styles.info}>
              <p className={styles.name}>{blog.postedBy.fullName}</p>

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
                <Dropdown.Item className={styles.menuItem}>
                  <Link to={`/edit-post/${blog._id}`}>
                    <i className="fa-solid fa-pen"></i>
                    <span>Sửa bài viết</span>
                  </Link>
                </Dropdown.Item>
              )}
              <Dropdown.Item className={styles.menuItem}>
                <div
                  data-href={window.location.href}
                  className="fb-share-button"
                >
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ff8clone.tk%2F&amp;src=sdkpreparse"
                  >
                    <i className="fa-brands fa-facebook"></i>
                    <span>Chia sẻ lên Facebook</span>
                  </a>
                </div>
              </Dropdown.Item>
              <Dropdown.Item className={styles.menuItem}>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={`https://twitter.com/share?ref_src=twsrc%5Etfw&url=${window.location.href}`}
                  data-show-count="false"
                >
                  <i className="fa-brands fa-twitter"></i>
                  <span>Chia sẻ lên Twitter</span>
                </a>
              </Dropdown.Item>
              <Dropdown.Item className={styles.menuItem}>
                <a href={`mailto:mail@mail.com;body=${window.location.href}`}>
                  <i className="fa-solid fa-envelope"></i>
                  <span>Chia sẻ tới Email</span>
                </a>
              </Dropdown.Item>
              <Dropdown.Item className={styles.menuItem}>
                <div
                  onClick={() =>
                    navigator.clipboard.writeText(window.location.href)
                  }
                  style={{ padding: '10px 0' }}
                >
                  <i className="fa-solid fa-link"></i>
                  <span>Sao chép liên kết</span>
                </div>
              </Dropdown.Item>
            </Tippy>
          </div>
        </div>
        <ReactMarkdown
          children={blog.content}
          className={styles.MarkdownParser}
          remarkPlugins={[remarkGfm]}
        />
        <Reaction
          isLike={isLike}
          likeCount={likeCount.length}
          handleLike={handleLike}
          blog={blog}
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

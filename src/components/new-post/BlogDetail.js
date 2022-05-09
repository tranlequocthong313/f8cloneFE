import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Row, Col, Image } from 'react-bootstrap'
import styles from './BlogDetail.module.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useNavigate } from 'react-router-dom'
import BlogSameAuthor from './BlogSameAuthor'
import BlogHighlights from './BlogHighlights'
import { timeSince } from '../../utils/format/index'
import { apiURL } from '../../context/constants'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import Reaction from './Reaction'
import Tippy from '../../utils/tippy/Tippy'
import consoleLog from '../../utils/console-log/consoleLog'
import MainButton from '../../utils/button/MainButton'
import remarkGfm from 'remark-gfm'

const BlogDetail = ({ blog, blogHighlight }) => {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()

  const [likeCount, setLikeCount] = useState(blog.likes)
  const [isLike, setIsLike] = useState(blog.likes.includes(user.userId))
  const [bookmarkData, setBookmarkData] = useState(null)

  useEffect(() => {
    ;(async () => {
      const { token } = Cookies.get('token')
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
      consoleLog(error.message)
    }
  }

  const bookmark = async (blogId) => {
    const token = Cookies.get('token')
    if (!token) return navigate('/login')

    const url = `${apiURL}/me/bookmark`
    const data = await patchBookmark(url, blogId, token)

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
      consoleLog(error.message)
    }
  }

  const handleLike = async () => {
    const token = Cookies.get('token')
    if (!token) return navigate('/login')

    const url = isLike
      ? `${apiURL}/blog/unlike/${blog._id}`
      : `${apiURL}/blog/like/${blog._id}`
    const data = await patchLike(url, token)

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
      consoleLog(error.message)
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
      consoleLog(error.message)
    } finally {
      navigate('/admin/blog')
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
                <Link to={`/edit-post/${blog._id}`} className={styles.menuItem}>
                  <i className="fa-solid fa-pen"></i>
                  <span>Sửa bài viết</span>
                </Link>
              )}
              <div data-href={window.location.href} className="fb-share-button">
                <a
                  rel="noopener noreferrer"
                  className={styles.menuItem}
                  target="_blank"
                  href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ff8clone.tk%2F&amp;src=sdkpreparse"
                >
                  <i className="fa-brands fa-facebook"></i>
                  <span>Chia sẻ lên Facebook</span>
                </a>
              </div>
              <a
                rel="noopener noreferrer"
                className={styles.menuItem}
                target="_blank"
                href={`https://twitter.com/share?ref_src=twsrc%5Etfw&url=${window.location.href}`}
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
                onClick={() =>
                  navigator.clipboard.writeText(window.location.href)
                }
                className={styles.menuItem}
              >
                <i className="fa-solid fa-link"></i>
                <span>Sao chép liên kết</span>
              </div>
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

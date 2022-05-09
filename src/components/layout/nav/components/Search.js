import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './Search.module.scss'
import { Link } from 'react-router-dom'
import { apiURL } from '../../../../context/constants'
import consoleLog from '../../../../utils/console-log/consoleLog'

const Search = () => {
  const [searchInput, setSearchInput] = useState('')
  const [isFocus, setIsFocus] = useState(false)
  const [result, setResult] = useState({
    courses: [],
    blogs: [],
    videos: [],
  })

  const search = async (e) => {
    try {
      setSearchInput(e.target.value)

      const length = e.target.value.trim().length
      let match = e.target.value.match(/^[a-zA-Z ]*/)

      const isEmptySearchInput = length === 0
      if (isEmptySearchInput)
        setResult((prev) => {
          return {
            ...prev,
            courses: [],
            blogs: [],
            videos: [],
          }
        })

      const isValidSearchInput = length >= 2 && match[0] === e.target.value
      if (isValidSearchInput) {
        const res = await fetch(`${apiURL}/search/${e.target.value}`)
        const data = await res.json()

        setResult((prev) => {
          return {
            ...prev,
            courses: [...data.courses],
            blogs: [...data.blogs],
            videos: [...data.videos],
          }
        })
      }
    } catch (error) {
      consoleLog(error.message)
    }
  }

  return (
    <>
      <div
        className={
          isFocus
            ? `${styles.searchWrapper} ${styles.focus}`
            : styles.searchWrapper
        }
        tabIndex="0"
      >
        <div className={styles.searchIcon}></div>
        <input
          value={searchInput}
          type={'text'}
          placeholder="Tìm kiếm khóa học, bài viết, video, ..."
          className={styles.searchInput}
          onChange={search}
          onClick={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
        {searchInput.length >= 1 && (
          <div className={styles.clearText} onClick={() => setSearchInput('')}>
            <i className="bi bi-x"></i>
          </div>
        )}

        {searchInput.length !== 0 && (
          <div className={styles.dropDown}>
            <div className={styles.resultWrapper}>
              <div className={styles.header}>
                <i className="fa-solid fa-magnifying-glass"></i>
                {result.courses.length === 0 &&
                result.blogs.length === 0 &&
                result.videos.length === 0 &&
                searchInput.length >= 1 ? (
                  <span>Không có kết quả cho '{searchInput}'</span>
                ) : (
                  <span>Kết quả cho '{searchInput}'</span>
                )}
              </div>
              {result.courses.length > 0 && (
                <>
                  <div className={styles.heading}>
                    <h5>KHÓA HỌC</h5>
                    <Link to={`/search/course?q=${searchInput}`}>Xem thêm</Link>
                  </div>
                  {result.courses.map((course) => (
                    <Link
                      className={styles.searchItem}
                      to={`/courses/${course._id}`}
                      key={course._id}
                    >
                      <img alt={`${course.title}`} src={course.image} />
                      <span>{course.title}</span>
                    </Link>
                  ))}
                </>
              )}
              {result.blogs.length > 0 && (
                <>
                  <div className={styles.heading}>
                    <h5>BÀI VIẾT</h5>
                    <Link to={`/search/blog?q=${searchInput}`}>Xem thêm</Link>
                  </div>
                  {result.blogs.map((blog) => (
                    <Link
                      className={styles.searchItem}
                      to={`/blog/${blog._id}`}
                      key={blog._id}
                    >
                      <img
                        alt={`${blog.titleDisplay}`}
                        src={blog.image ? blog.image : blog.postedBy.photoURL}
                      />
                      <span>{blog.titleDisplay}</span>
                    </Link>
                  ))}
                </>
              )}
              {result.videos.length > 0 && (
                <>
                  <div className={styles.heading}>
                    <h5>VIDEO</h5>
                    <Link to={`/search/video?q=${searchInput}`}>Xem thêm</Link>
                  </div>
                  {result.videos.map((video) => (
                    <a
                      className={styles.searchItem}
                      rel="noopener noreferrer"
                      target="_blank"
                      href={`https://www.youtube.com/watch?v=${video.videoId}`}
                      key={video._id}
                    >
                      <img alt={`${video.title}`} src={video.image} />
                      <span>{video.title}</span>
                    </a>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Search

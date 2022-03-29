import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './Search.module.scss'
import { Link } from 'react-router-dom'
import { apiURL } from '../../../../context/constants'
import noPhotoURL from '../../../../asset/nobody_m.256x256.jpg'

const Search = ({ currentPage }) => {
  const [searchInput, setSearchInput] = useState('')
  const [result, setResult] = useState({
    courses: [],
    blogs: [],
    videos: [],
  })

  const searchHandler = async e => {
    try {
      const length = e.target.value.trim().length
      let match = e.target.value.match(/^[a-zA-Z ]*/)
      setSearchInput(e.target.value)

      if (length === 0) {
        setResult(prev => {
          return {
            ...prev,
            courses: [],
            blogs: [],
            videos: [],
          }
        })
      }

      if (length >= 2 && match[0] === e.target.value) {
        setTimeout(async () => {
          const res = await fetch(`${apiURL}/search/${e.target.value}`)
          const data = await res.json()

          setResult(prev => {
            return {
              ...prev,
              courses: [...data.courses],
              blogs: [...data.blogs],
              videos: [...data.videos],
            }
          })
        }, 500)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {currentPage !== 'new-blog' && (
        <form className={styles.searchWrapper}>
          <div className={styles.searchIcon}></div>
          <input
            value={searchInput}
            type={'text'}
            placeholder="Tìm kiếm khóa học, bài viết, video, ..."
            className={styles.searchInput}
            onChange={searchHandler}
          />
          {searchInput.length >= 1 && (
            <div
              className={styles.clearText}
              onClick={() => setSearchInput('')}
            >
              <i className="bi bi-x"></i>
            </div>
          )}

          {searchInput.length >= 1 && (
            <div className={styles.dropDown}>
              <div className={styles.resultWrapper}>
                <div className={styles.header}>
                  <i className="bi bi-search"></i>

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
                      <Link to="">Xem thêm</Link>
                    </div>
                    {result.courses.map(course => (
                      <Link
                        className={styles.searchItem}
                        to={`courses/${course.slug}`}
                        key={course._id}
                      >
                        <img alt="" src={course.image} />
                        <span>{course.title}</span>
                      </Link>
                    ))}
                  </>
                )}
                {result.blogs.length > 0 && (
                  <>
                    <div className={styles.heading}>
                      <h5>BÀI VIẾT</h5>
                      <Link to="">Xem thêm</Link>
                    </div>
                    {result.blogs.map(blog => (
                      <Link
                        className={styles.searchItem}
                        to={`blog/${blog.slug}`}
                        key={blog._id}
                      >
                        <img
                          alt=""
                          src={
                            blog.image
                              ? blog.image
                              : blog.postedBy.photoURL
                              ? blog.postedBy.photoURL
                              : noPhotoURL
                          }
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
                      <Link to="">Xem thêm</Link>
                    </div>
                    {result.videos.map(video => (
                      <a
                        className={styles.searchItem}
                        rel="noopener noreferrer"
                        target="_blank"
                        href={`https://www.youtube.com/watch?v=${video.videoId}`}
                        key={video._id}
                      >
                        <img alt="" src={video.image} />
                        <span>{video.title}</span>
                      </a>
                    ))}
                  </>
                )}
              </div>
            </div>
          )}
        </form>
      )}
    </>
  )
}

export default Search

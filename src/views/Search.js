import React, { Suspense, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Header from '../components/main-layout/nav/Header'
import SideBar from '../components/main-layout/sidebar/SideBar'
import styles from './Search.module.scss'
import ContentEditable from '../components/utils/content-editable/ContentEditable'
import { apiURL } from '../context/constants'
import { Link } from 'react-router-dom'

const Footer = React.lazy(() =>
  import('../components/main-layout/footer/Footer')
)

const Search = () => {
  const [searchInput, setSearchInput] = useState('')
  const [tabs, setTabs] = useState('courses')
  const [result, setResult] = useState({
    courses: [],
    blogs: [],
    videos: [],
  })

  const searchHandler = async e => {
    try {
      const length = e.target.innerText.trim().length
      let match = e.target.innerText.match(/^[a-zA-Z ]*/)
      setSearchInput(e.target.innerText)

      length === 0 &&
        setResult(prev => {
          return {
            ...prev,
            courses: [],
            blogs: [],
            videos: [],
          }
        })

      if (length >= 2 && match[0] === e.target.innerText) {
        const res = await fetch(`${apiURL}/search/${e.target.innerText}`)
        const data = await res.json()

        setResult(prev => {
          return {
            ...prev,
            courses: [...data.courses],
            blogs: [...data.blogs],
            videos: [...data.videos],
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Header />
      <Row>
        <SideBar />
        <Col xs={12} sm={12} md={12} lg={11} xl={11}>
          <div className="withSidebarContent">
            <Container fluid style={{ padding: 0 }}>
              <Row style={{ marginTop: 0 }} className={styles.layout}>
                <Col xs={12} lg={12} xl={12} className={styles.leftLayout}>
                  <ContentEditable
                    text={'Tìm kiếm...'}
                    maxLength={'100'}
                    className={styles.contentEditable}
                    onInput={searchHandler}
                  />
                  {searchInput.length >= 1 && (
                    <Row style={{ marginTop: 0 }}>
                      <Col md={12} lg={8} xl={8}>
                        <ul className={styles.tabs}>
                          <li
                            className={
                              tabs === 'courses'
                                ? `${styles.tab} ${styles.active}`
                                : styles.tab
                            }
                            onClick={() => setTabs('courses')}
                          >
                            Khóa học
                          </li>
                          <li
                            className={
                              tabs === 'blogs'
                                ? `${styles.tab} ${styles.active}`
                                : styles.tab
                            }
                            onClick={() => setTabs('blogs')}
                          >
                            Bài viết
                          </li>
                          <li
                            className={
                              tabs === 'videos'
                                ? `${styles.tab} ${styles.active}`
                                : styles.tab
                            }
                            onClick={() => setTabs('videos')}
                          >
                            Video
                          </li>
                        </ul>
                        {tabs === 'courses' && (
                          <div className={styles.contentWrapper}>
                            {tabs === 'courses' && result.courses.length > 0 ? (
                              result.courses.map(course => (
                                <div
                                  className={styles.contentContainer}
                                  key={course._id}
                                >
                                  <Link to={`/courses/${course.slug}`}>
                                    <div
                                      className={styles.image}
                                      style={{
                                        backgroundImage: `url(${course.image})`,
                                      }}
                                    ></div>
                                  </Link>
                                  <div className={styles.info}>
                                    <h2>
                                      <Link to={`courses/${course.slug}`}>
                                        {course.title}
                                      </Link>
                                    </h2>
                                    <p>{course.description}</p>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className={styles.blank}>
                                <span>Chưa có kết quả nào phù hợp.</span>
                              </div>
                            )}
                          </div>
                        )}
                        {tabs === 'blogs' && (
                          <div className={styles.contentWrapper}>
                            {tabs === 'blogs' && result.blogs.length > 0 ? (
                              result.blogs.map(blog => (
                                <div
                                  className={`${styles.contentContainer} ${styles.blogContent}`}
                                  key={blog._id}
                                >
                                  <Link to={`/blog/${blog.slug}`}>
                                    <div
                                      className={styles.image}
                                      style={{
                                        backgroundImage: `url(${blog.image})`,
                                      }}
                                    ></div>
                                  </Link>
                                  <div className={styles.info}>
                                    <h2>
                                      <Link to={`/blog/${blog.slug}`}>
                                        {blog.titleDisplay}
                                      </Link>
                                    </h2>
                                    <p>Đọc tiếp...</p>
                                    <div className={styles.reaction}>
                                      <div className={styles.like}>
                                        <i className="bi bi-heart-fill"></i>
                                        <span>{blog.likes.length}</span>
                                      </div>
                                      <div className={styles.comment}>
                                        <span>
                                          {blog.comments.length} bình luận
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className={styles.blank}>
                                <span>Chưa có kết quả nào phù hợp.</span>
                              </div>
                            )}
                          </div>
                        )}
                        {tabs === 'videos' && (
                          <div className={styles.contentWrapper}>
                            {tabs === 'videos' && result.videos.length > 0 ? (
                              result.videos.map(video => (
                                <div
                                  className={styles.contentContainer}
                                  key={video._id}
                                >
                                  <a
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    href={`https://www.youtube.com/watch?v=${video.videoId}`}
                                  >
                                    <div
                                      className={styles.image}
                                      style={{
                                        backgroundImage: `url(${video.image})`,
                                      }}
                                    ></div>
                                  </a>
                                  <div className={styles.info}>
                                    <h2>
                                      <a
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        href={`https://www.youtube.com/watch?v=${video.videoId}`}
                                      >
                                        {video.title}
                                      </a>
                                    </h2>
                                    <p>Xem trên Youtube...</p>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className={styles.blank}>
                                <span>Chưa có kết quả nào phù hợp.</span>
                              </div>
                            )}
                          </div>
                        )}
                      </Col>
                    </Row>
                  )}
                </Col>
              </Row>
            </Container>
          </div>
        </Col>
      </Row>
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </>
  )
}

export default Search

import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Header from '../../components/main-layout/nav/Header'
import SideBar from '../../components/main-layout/sidebar/SideBar'
import styles from './Search.module.scss'
import ContentEditable from '../../components/utils/content-editable/ContentEditable'
import { apiURL } from '../../context/constants'
import { Link, useLocation } from 'react-router-dom'
import Tabs from '../../components/utils/tabs/Tabs'
import f8Icon from '../../asset/images/f8_icon.png'
import CoursesEnrolled from '../../components/profile/ProfileCourses'

const Footer = React.lazy(() =>
  import('../../components/main-layout/footer/Footer')
)

const Search = () => {
  const location = useLocation()
  const searchInputRef = useRef()

  const [searchInput, setSearchInput] = useState('')
  const [tabs, setTabs] = useState(location.pathname)
  const [result, setResult] = useState({
    courses: [],
    blogs: [],
    videos: [],
  })

  useEffect(() => {
    const url = new URL(window.location.href)
    const query = url.searchParams.get('q')

    if (query) {
      searchInputRef.current.innerText = query
      setSearchInput(query)
      ;(async () => {
        const url = `${apiURL}/search/${query}`
        const data = await getSearch(url)

        setResult((prev) => {
          return {
            ...prev,
            courses:
              location.pathname === '/search/course' ? [...data.courses] : [],
            blogs: location.pathname === '/search/blog' ? [...data.blogs] : [],
            videos:
              location.pathname === '/search/video' ? [...data.videos] : [],
          }
        })
      })()
    }
  }, [location.pathname])

  const searchCourseBlogAndVideo = async (e) => {
    const length = e.target.innerText.trim().length
    let match = e.target.innerText.match(/^[a-zA-Z ]*/)
    setSearchInput(e.target.innerText)

    if (length === 0)
      setResult((prev) => {
        return {
          ...prev,
          courses: [],
          blogs: [],
          videos: [],
        }
      })

    const isValidSearchInput = length >= 2 && match[0] === e.target.innerText
    if (isValidSearchInput) {
      const url = `${apiURL}/search/${e.target.innerText}`
      const data = await getSearch(url)

      setResult((prev) => {
        return {
          ...prev,
          courses: [...data.courses],
          blogs: [...data.blogs],
          videos: [...data.videos],
        }
      })
    }
  }

  const getSearch = async (url) => {
    try {
      return await fetch(url)
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <>
      <Header isSearchPage={true} />
      <Row>
        <Col xs={0} sm={0} md={1} lg={1} xl={1}>
          <SideBar />
        </Col>
        <Col xs={12} sm={12} md={12} lg={11} xl={11}>
          <div className="withSidebarContent">
            <Container fluid style={{ padding: 0 }}>
              <Row style={{ marginTop: 0, height: '100vh' }}>
                <Col xs={12} lg={12} xl={12}>
                  <ContentEditable
                    text={'Tìm kiếm...'}
                    maxLength={'100'}
                    className={styles.contentEditable}
                    onInput={searchCourseBlogAndVideo}
                    ref={searchInputRef}
                  />
                  {searchInput.length >= 1 && (
                    <Row style={{ marginTop: 0 }}>
                      <Col md={12} lg={8} xl={8}>
                        <div className={styles.tabs}>
                          <Tabs
                            path={'/search/course'}
                            isActive={tabs === '/search/course'}
                            onActive={() => setTabs('/search/course')}
                            tab={'Khóa học'}
                          />
                          <Tabs
                            path={'/search/blog'}
                            isActive={tabs === '/search/blog'}
                            onActive={() => setTabs('/search/blog')}
                            tab={'Bài viết'}
                          />
                          <Tabs
                            path={'/search/video'}
                            tab={'Video'}
                            isActive={tabs === '/search/video'}
                            onActive={() => setTabs('/search/video')}
                          />
                        </div>

                        {tabs === '/search/course' && (
                          <div className={styles.contentWrapper}>
                            {tabs === '/search/course' &&
                            result.courses.length > 0 ? (
                              result.courses.map((course) => (
                                <div
                                  className={styles.contentContainer}
                                  key={course._id}
                                >
                                  <Link to={`/courses/${course._id}`}>
                                    <div
                                      className={styles.image}
                                      style={{
                                        backgroundImage: `url(${course.image})`,
                                      }}
                                    ></div>
                                  </Link>
                                  <div className={styles.info}>
                                    <h3>
                                      <Link to={`courses/${course.slug}`}>
                                        {course.title}
                                      </Link>
                                    </h3>
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
                        {tabs === '/search/blog' && (
                          <div className={styles.contentWrapper}>
                            {tabs === '/search/blog' &&
                            result.blogs.length > 0 ? (
                              result.blogs.map((blog) => (
                                <div
                                  className={`${styles.contentContainer} ${styles.blogContent}`}
                                  key={blog._id}
                                >
                                  <Link to={`/blog/${blog._id}`}>
                                    <div
                                      className={styles.image}
                                      style={{
                                        backgroundImage: blog.image
                                          ? `url(${blog.image})`
                                          : `url(${f8Icon})`,
                                      }}
                                    ></div>
                                  </Link>
                                  <div className={styles.info}>
                                    <h3>
                                      <Link to={`/blog/${blog._id}`}>
                                        {blog.titleDisplay}
                                      </Link>
                                    </h3>
                                    <p>Đọc tiếp...</p>
                                    <div className={styles.reaction}>
                                      <div className={styles.like}>
                                        <i className="fa-solid fa-heart"></i>
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
                        {tabs === '/search/video' && (
                          <div className={styles.contentWrapper}>
                            {tabs === '/search/video' &&
                            result.videos.length > 0 ? (
                              result.videos.map((video) => (
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
                                    <h3>
                                      <a
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        href={`https://www.youtube.com/watch?v=${video.videoId}`}
                                      >
                                        {video.title}
                                      </a>
                                    </h3>
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

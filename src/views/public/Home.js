import React, { useState, useEffect, Suspense } from 'react'
import styles from './Home.module.scss'
import Slide from '../../components/home/slide/Slide'
import HeadingTitleWrap from '../../utils/title-heading/HeadingTitleWrap'
import '../../sass/_withSidebarContent.scss'
import { apiURL } from '../../context/constants'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CourseList from '../../components/home/courses/CourseList'
import SubLoading from '../../utils/loading/SubLoading'
import consoleLog from '../../utils/console-log/consoleLog'

const BlogList = React.lazy(() =>
  import('../../components/home/blogs/BlogList')
)
const VideoList = React.lazy(() =>
  import('../../components/home/videos/VideoList')
)
const Footer = React.lazy(() => import('../../components/layout/footer/Footer'))

const Home = () => {
  const user = useSelector((state) => state.user)

  const [courseFE, setCourseFE] = useState([])
  const [courseBE, setCourseBE] = useState([])
  const [blogData, setBlogData] = useState([])
  const [videoData, setVideoData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(
    () =>
      (document.title =
        'F8 - học lập trình để đi làm! | Học lập trình online | Học lập trình Javascript'),
    []
  )

  useEffect(() => {
    ;(async () => {
      setLoading(true)

      const data = await getHomeData(`${apiURL}`)
      if (data) {
        const courseFe = data.courses.filter(
          (course) => course.role === 'Front-end'
        )
        const courseBe = data.courses.filter(
          (course) => course.role === 'Back-end'
        )
        const courseFullstack = data.courses.filter(
          (course) => course.role === 'Fullstack'
        )

        setCourseFE([...courseFullstack, ...courseFe])
        setCourseBE([...courseFullstack, ...courseBe])
        setBlogData(data.blogs)
        setVideoData(data.videos)
        setLoading(false)
      }
    })()
  }, [])

  const getHomeData = async (url) => {
    try {
      return (await fetch(url)).json()
    } catch (error) {
      consoleLog(error.message)
    }
  }

  return loading ? (
    <SubLoading />
  ) : (
    <>
      <Slide />
      <div className={styles.wrapper}>
        <HeadingTitleWrap
          title={'Lộ trình học Front-end'}
          label={'Mới'}
          viewMode={'Xem chi tiết'}
        />
        <CourseList courses={courseFE} />
        <HeadingTitleWrap
          title={'Lộ trình học Back-end'}
          label={'Mới'}
          viewMode={'Xem chi tiết'}
        />
        <CourseList courses={courseBE} />

        <Suspense fallback={<div></div>}>
          <HeadingTitleWrap
            title={'Bài viết nổi bật'}
            viewMode={'Xem tất cả'}
          />
          {blogData && blogData.length !== 0 ? (
            <BlogList blogs={blogData} />
          ) : (
            <p>
              Không có bài viết nào <Link to="/new-post">thêm bài viết.</Link>
            </p>
          )}
          <HeadingTitleWrap title={'Videos nổi bật'} viewMode={'Xem tất cả'} />
          {videoData && videoData.length !== 0 ? (
            <VideoList videos={videoData} />
          ) : (
            <p>
              Không có video nào{' '}
              {user.isAdmin && <Link to="/admin/video">thêm video.</Link>}
            </p>
          )}
        </Suspense>
      </div>
    </>
  )
}

export default Home

import { useState, useEffect } from 'react'
import { apiURL } from '../../context/constants'
import Header from '../main-layout/nav/Header'
import BlogDetail from '../new-post/BlogDetail'
import styles from './BlogSlug.module.scss'
import SideBar from '../main-layout/sidebar/SideBar'
import { useLocation } from 'react-router-dom'
import Footer from '../main-layout/footer/Footer'
import { Col } from 'react-bootstrap'

const BlogSlug = () => {
  const location = useLocation()

  const [blog, setBlog] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    ;(async () => {
      try {
        const res = await fetch(`${apiURL}${location.pathname}`)
        const data = await res.json()
        console.log(data)
        setBlog(data[0])
        document.title = `${data[0].titleDisplay} | by F8`
      } catch (error) {
        console.log(error.message)
      }
    })()

    return () => controller?.abort()
  }, [location.pathname])

  return (
    <>
      <Header />
      <div className={styles.sidebarWrap}>
        <Col xs={0} sm={0} md={1} lg={1} xl={1}>
          <SideBar isBlog={true} />
        </Col>
      </div>
      {blog && <BlogDetail blog={blog} />}
      <Footer />
    </>
  )
}

export default BlogSlug

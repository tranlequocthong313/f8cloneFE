import { useState, useEffect } from 'react'
import { apiURL } from '../../context/constants'
import Header from '../main-layout/nav/Header'
import styles from './BlogSlug.module.scss'
import SideBar from '../main-layout/sidebar/SideBar'
import { useLocation } from 'react-router-dom'
import Footer from '../main-layout/footer/Footer'
import BlogDetail from '../new-post/BlogDetail'
import Loading from '../utils/loading/Loading'
import consoleLog from '../utils/console-log/consoleLog'

const BlogSlug = () => {
  const location = useLocation()

  const [blog, setBlog] = useState(null)
  const [blogHighlight, setBlogHighlight] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      setLoading(true)

      const url = `${apiURL}${location.pathname}`
      const data = await getBlogBySlug(url)

      if (data) {
        setBlog(data.blogSlug)
        setBlogHighlight(data.blogHighlight)
        document.title = `${data.blogSlug.titleDisplay} | by F8`
        setLoading(false)
      }
    })()
  }, [location.pathname])

  const getBlogBySlug = async (url) => {
    try {
      return (await fetch(url)).json()
    } catch (error) {
      consoleLog(error.message)
    }
  }

  return loading ? (
    <Loading />
  ) : (
    <>
      <Header />
      <div className={styles.sidebarWrap}>
        <SideBar isHide={true} />
      </div>
      {blog && <BlogDetail blog={blog} blogHighlight={blogHighlight} />}
      <Footer />
    </>
  )
}

export default BlogSlug

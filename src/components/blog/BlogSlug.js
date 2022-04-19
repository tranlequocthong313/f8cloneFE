import { useState, useEffect } from 'react'
import { apiURL } from '../../context/constants'
import Header from '../main-layout/nav/Header'
import BlogDetail from '../new-post/BlogDetail'
import styles from './BlogSlug.module.scss'
import SideBar from '../main-layout/sidebar/SideBar'
import { useLocation } from 'react-router-dom'
import Footer from '../main-layout/footer/Footer'

const BlogSlug = () => {
  const location = useLocation()

  const [blog, setBlog] = useState(null)
  const [blogHighlight, setBlogHighlight] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    ;(async () => {
      try {
        const res = await fetch(`${apiURL}${location.pathname}`)
        const data = await res.json()

        setBlog(data.blogSlug)
        setBlogHighlight(data.blogHighlight)

        document.title = `${data.blogSlug.titleDisplay} | by F8`
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
        <SideBar isHide={true} />
      </div>
      {blog && <BlogDetail blog={blog} blogHighlight={blogHighlight} />}
      <Footer />
    </>
  )
}

export default BlogSlug

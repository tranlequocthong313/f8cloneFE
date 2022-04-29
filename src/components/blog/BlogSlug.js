import { useState, useEffect, lazy, Suspense } from 'react'
import { apiURL } from '../../context/constants'
import Header from '../main-layout/nav/Header'
import styles from './BlogSlug.module.scss'
import SideBar from '../main-layout/sidebar/SideBar'
import { useLocation } from 'react-router-dom'
import Footer from '../main-layout/footer/Footer'
import BlogDetail from '../new-post/BlogDetail'

const BlogSlug = () => {
  const location = useLocation()

  const [blog, setBlog] = useState(null)
  const [blogHighlight, setBlogHighlight] = useState(null)

  useEffect(() => {
    ;(async () => {
      const url = `${apiURL}${location.pathname}`
      const data = await getBlogBySlug(url)

      console.log(data)

      setBlog(data.blogSlug)
      setBlogHighlight(data.blogHighlight)

      document.title = `${data.blogSlug.titleDisplay} | by F8`
    })()
  }, [location.pathname])

  const getBlogBySlug = async (url) => {
    try {
      return (await fetch(url)).json()
    } catch (error) {
      console.log(error.message)
    }
  }

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

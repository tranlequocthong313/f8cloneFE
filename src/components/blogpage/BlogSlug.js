import { useState, useEffect } from 'react'
import { apiURL } from '../../context/constants'
import Header from '../main-layout/nav/Header'
import BlogDetail from '../newBlog/BlogDetail'
import styles from './BlogSlug.module.scss'
import SideBar from '../main-layout/sidebar/SideBar'
import { useLocation } from 'react-router-dom'
import Footer from '../main-layout/footer/Footer'

const BlogSlug = () => {
  const location = useLocation()

  const [scrollY, setScrollY] = useState(0)
  const [blog, setBlog] = useState(null)

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      setScrollY(scrollY)
    }

    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
  }, [])

  return (
    <>
      <Header scrollY={scrollY} />
      <div className={styles.sidebarWrap}>
        <SideBar isBlog={true} />
      </div>
      {blog && <BlogDetail blog={blog} />}
      <Footer />
    </>
  )
}

export default BlogSlug

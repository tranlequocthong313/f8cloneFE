import { useState, useEffect } from 'react'
import { apiURL } from '../../context/constants'
import Header from '../main-layout/nav/Header'
import BlogDetail from '../newBlog/BlogDetail'
import styles from './BlogSlug.module.scss'
import SideBar from '../main-layout/sidebar/SideBar'
import { useLocation } from 'react-router-dom'

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
    const fetchData = async () => {
      try {
        const res = await fetch(`${apiURL}${location.pathname}`)
        const data = await res.json()
        console.log(data)

        setBlog(data)
      } catch (error) {
        console.log(error.message)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <Header scrollY={scrollY} />
      <div className={styles.sidebarWrap}>
        <SideBar />
      </div>
      {blog && <BlogDetail blog={blog} />}
    </>
  )
}

export default BlogSlug

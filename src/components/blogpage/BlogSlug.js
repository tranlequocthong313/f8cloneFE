import React, { useState, useEffect } from 'react'
import { apiURL } from '../../context/constants'
import Header from '../main-layout/nav/Header'
import BlogDetail from '../newBlog/BlogDetail'
import styles from './BlogSlug.module.scss'
import SideBar from '../main-layout/sidebar/SideBar'
import { useLocation } from 'react-router-dom'

const BlogSlug = () => {
  const location = useLocation()

  const [scrollY, setScrollY] = useState(0)
  const [blog, SetBlog] = useState(null)

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      setScrollY(scrollY)
    }

    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:5000${location.pathname}`)
      const data = await res.json()
      console.log(data)

      SetBlog(data)
    } catch (error) {
      console.log(error.message)
    }
  }

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

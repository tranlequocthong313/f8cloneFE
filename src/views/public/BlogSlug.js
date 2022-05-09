import { useState, useEffect } from 'react'
import { apiURL } from '../../context/constants'
import { useLocation } from 'react-router-dom'
import BlogDetail from '../../components/new-post/BlogDetail'
import SubLoading from '../../utils/loading/SubLoading'
import consoleLog from '../../utils/console-log/consoleLog'

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
    <SubLoading />
  ) : (
    blog && <BlogDetail blog={blog} blogHighlight={blogHighlight} />
  )
}

export default BlogSlug

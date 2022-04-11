import React from 'react'
import BlogItem from './BlogItem'
import ScrollHorizontal from '../../utils/scroll/ScrollHorizontal'
import MainCardAdd from '../../utils/card/MainCardAdd'
import { useSelector } from 'react-redux'

const BlogList = (props) => {
  const user = useSelector((state) => state.user)

  return (
    <ScrollHorizontal path={'blog'}>
      {props.blogs.map((blog) => (
        <BlogItem key={blog._id} blog={blog} />
      ))}
      {user.isAdmin && (
        <MainCardAdd path={'/admin/blog'}>Thêm blog</MainCardAdd>
      )}
    </ScrollHorizontal>
  )
}

export default BlogList

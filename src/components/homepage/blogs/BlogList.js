import React from 'react'
import BlogItem from './BlogItem'
import ScrollHorizontal from '../../utils/scroll/ScrollHorizontal'

const BlogList = props => {
  return (
    <ScrollHorizontal path={'blog'}>
      {props.blogs.map(blog => (
        <BlogItem key={blog.blogId} blog={blog} />
      ))}
    </ScrollHorizontal>
  )
}

export default BlogList

import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import MainCard from '../../../utils/card/MainCard'
import styles from './BlogItem.module.scss'
import MainButton from '../../../utils/button/MainButton'
import f8Logo from '../../../asset/images/f8_icon.png'

const BlogItem = ({ blog }) => {
  return (
    <MainCard>
      <Link to={`blog/${blog._id}`}>
        <section
          title={blog.title}
          style={{
            backgroundImage: blog.image
              ? `url(${blog.image})`
              : `url(${f8Logo})`,
          }}
        >
          <MainButton className={styles.button}>Xem bài viết</MainButton>
        </section>
      </Link>
      <h4 className={styles.title}>
        <Link to={`blog/${blog._id}`}>{blog.titleDisplay}</Link>
      </h4>
      <div className={styles.author}>
        <Link to={`blog/${blog._id}`}>
          <Image src={blog.postedBy.photoURL} />
        </Link>
        <Link to={`/${blog.postedBy.slug}`}>{blog.postedBy.fullName}</Link>
        <Link to={`blog/${blog._id}`}>
          <span className={styles.dot}>.</span>
          <span>{blog.readingTime} phút đọc</span>
        </Link>
      </div>
    </MainCard>
  )
}

export default BlogItem

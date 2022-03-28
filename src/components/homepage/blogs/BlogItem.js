import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import MainCard from '../../utils/card/MainCard'
import styles from './BlogItem.module.scss'
import CardButton from '../../utils/card/CardButton'
import noPhotoUser from '../../../asset/nobody_m.256x256.jpg'

const BlogItem = ({ blog }) => {
  return (
    <MainCard>
      <Link to={`blog/${blog.slug}`}>
        <section
          title={blog.title}
          style={{
            backgroundImage: blog.image
              ? `url(${blog.image})`
              : `url(https://accounts.fullstack.edu.vn/assets/icon/f8_icon.png)`,
          }}
        >
          <CardButton>Xem bài viết</CardButton>
        </section>
      </Link>
      <h3 className={styles.title}>
        <Link to={`blog/${blog.slug}`}>{blog.title}</Link>
      </h3>
      <div className={styles.author}>
        <Link to={`blog/${blog.slug}`}>
          <Image
            src={!blog.postedBy.photoURL ? noPhotoUser : blog.postedBy.photoURL}
          />
        </Link>
        <Link to={`blog/${blog.slug}`}>
          {blog.postedBy.fullName}
          <span className={styles.dot}>.</span>
          <span>{blog.readingTime} phút đọc</span>
        </Link>
      </div>
    </MainCard>
  )
}

export default BlogItem

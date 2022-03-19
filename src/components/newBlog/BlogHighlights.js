import React from 'react'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styles from './BlogHighlights.module.scss'

const BlogHighlights = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Bài viết nổi bật khác</h2>
      <div className={styles.post}>
        <div className={styles.author}>
          Đăng bởi <strong>Sơn Đặng</strong>
          <span className={styles.dot}>.</span>
          <span className={styles.createdAt}>6 tháng trước</span>
        </div>
        <Link to="/">
          <h3 className={styles.title}>
            Tổng hợp các sản phẩm của học viên tại F8 👏👏
          </h3>
        </Link>
        <Link to="/">
          <Image
            src="https://files.fullstack.edu.vn/f8-prod/blog_posts/65/6139fe28a9844.png"
            className={styles.thumb}
          />
        </Link>
        <p>
          Bài viết này nhằm tổng hợp lại các dự án mà học viên F8 đã hoàn thành
          và chia sẻ trên nhóm Học lập trình web F8. Các dự án dưới đây được
          mình ngẫu nhiên lựa chọn để đăng chứ không mang tính xếp hạng các bạn
          nhé.
        </p>
      </div>
      <div className={styles.post}>
        <div className={styles.author}>
          Đăng bởi <strong>Sơn Đặng</strong>
          <span className={styles.dot}>.</span>
          <span className={styles.createdAt}>6 tháng trước</span>
        </div>
        <Link to="/">
          <h3 className={styles.title}>
            Tổng hợp các sản phẩm của học viên tại F8 👏👏
          </h3>
        </Link>
        <Link to="/">
          <Image
            src="https://files.fullstack.edu.vn/f8-prod/blog_posts/65/6139fe28a9844.png"
            className={styles.thumb}
          />
        </Link>
        <p>
          Bài viết này nhằm tổng hợp lại các dự án mà học viên F8 đã hoàn thành
          và chia sẻ trên nhóm Học lập trình web F8. Các dự án dưới đây được
          mình ngẫu nhiên lựa chọn để đăng chứ không mang tính xếp hạng các bạn
          nhé.
        </p>
      </div>
      <div className={styles.post}>
        <div className={styles.author}>
          Đăng bởi <strong>Sơn Đặng</strong>
          <span className={styles.dot}>.</span>
          <span className={styles.createdAt}>6 tháng trước</span>
        </div>
        <Link to="/">
          <h3 className={styles.title}>
            Tổng hợp các sản phẩm của học viên tại F8 👏👏
          </h3>
        </Link>
        <Link to="/">
          <Image
            src="https://files.fullstack.edu.vn/f8-prod/blog_posts/65/6139fe28a9844.png"
            className={styles.thumb}
          />
        </Link>
        <p>
          Bài viết này nhằm tổng hợp lại các dự án mà học viên F8 đã hoàn thành
          và chia sẻ trên nhóm Học lập trình web F8. Các dự án dưới đây được
          mình ngẫu nhiên lựa chọn để đăng chứ không mang tính xếp hạng các bạn
          nhé.
        </p>
      </div>
    </div>
  )
}

export default BlogHighlights

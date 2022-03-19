import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Row, Col, Image } from 'react-bootstrap'
import styles from './BlogDetail.module.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import Reaction from './Reaction'
import { Link } from 'react-router-dom'
import BlogSameAuthor from './BlogSameAuthor'
import BlogHighlights from './BlogHighlights'
import Topics from '../blogpage/Topics'

const BlogDetail = ({ data }) => {
  return (
    <Row className={styles.wrapper}>
      <Col xl={2} className={styles.colLeft}>
        <div className={styles.aside}>
          <h4 className={styles.fullName}>Long Nguyen</h4>
          <p className={styles.userTitle}></p>
          <hr />
          <Reaction />
        </div>
      </Col>
      <Col md={12} lg={12} xl={6}>
        <h1 className={styles.heading}>{data.title}</h1>
        <div className={styles.header}>
          <div className={styles.user}>
            <Image
              src="https://lh3.googleusercontent.com/a-/AOh14Ghw8jjd_WRgi93wNdv8HaQS1OYXHP6oSTwNzpRfqA=s400"
              className={styles.avatar}
            />
            <div className={styles.info}>
              <p className={styles.name}>Long Nguyen</p>
              <p className={styles.time}>
                một tháng trước <span className={styles.dot}>.</span>
                17 phút đọc
              </p>
            </div>
          </div>
          <div className={styles.actions}>
            <div className={styles.bookmark}>
              <i className="bi bi-bookmark"></i>
            </div>
            <div className={styles.option}>
              <i className="bi bi-three-dots"></i>
            </div>
          </div>
        </div>
        <ReactMarkdown children={data.content} />
        <Reaction />
        <div className={styles.tags}>
          {data.tags.map(tag => (
            <Link to="/" key={tag}>
              {tag}
            </Link>
          ))}
        </div>
        <BlogSameAuthor />
        <BlogHighlights />
        <Topics />
      </Col>
    </Row>
  )
}

export default BlogDetail

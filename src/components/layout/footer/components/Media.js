import React from 'react'
import { Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './Media.module.scss'

const Media = () => {
  return (
    <Col sm={12} md={6} lg={6}>
      <ul className={styles.mediaWrapper}>
        <li className={styles.itemIcon}>
          <a
            href="https://www.youtube.com/c/F8VNOfficial"
            target="_blank"
            rel="noreferrer"
            title="F8 trên Youtube"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="youtube-square"
              className={`${styles.mediaIcons} svg-inline--fa fa-youtube-square fa-w-14 Footer_icon__2fpab Footer_iconYoutube__zRiq6`}
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="#ea4335"
                d="M186.8 202.1l95.2 54.1-95.2 54.1V202.1zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-42 176.3s0-59.6-7.6-88.2c-4.2-15.8-16.5-28.2-32.2-32.4C337.9 128 224 128 224 128s-113.9 0-142.2 7.7c-15.7 4.2-28 16.6-32.2 32.4-7.6 28.5-7.6 88.2-7.6 88.2s0 59.6 7.6 88.2c4.2 15.8 16.5 27.7 32.2 31.9C110.1 384 224 384 224 384s113.9 0 142.2-7.7c15.7-4.2 28-16.1 32.2-31.9 7.6-28.5 7.6-88.1 7.6-88.1z"
              ></path>
            </svg>
          </a>
        </li>

        <li className={styles.itemIcon}>
          <a
            href="https://www.facebook.com/groups/f8official/"
            target="_blank"
            rel="noreferrer"
            title="F8 trên Facebook"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="facebook-square"
              className={`${styles.mediaIcons} svg-inline--fa fa-facebook-square fa-w-14 Footer_icon__2fpab Footer_iconFacebook__3V8SK`}
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="#4267b2"
                d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"
              ></path>
            </svg>
          </a>
        </li>

        <li className={styles.itemIcon}>
          <a
            href="https://www.tiktok.com/@f8official"
            target="_blank"
            rel="noreferrer"
            title="F8 trên Youtube"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="tiktok"
              className={`${styles.mediaIcons} svg-inline--fa fa-tiktok`}
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="#fff"
                d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.25V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.62 74.62 0 1 0 52.23 71.18V0l88 0a121.2 121.2 0 0 0 1.86 22.17h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.14z"
              ></path>
            </svg>
          </a>
        </li>
      </ul>
    </Col>
  )
}

export default Media

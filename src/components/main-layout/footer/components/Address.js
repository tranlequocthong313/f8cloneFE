import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Address.module.scss'
import f8logo from '../../../../asset/images/f8_icon.png'
import dmcalogo from '../../../../asset/images/dmca.png'

const Address = () => {
  return (
    <div className={styles.wrapperList}>
      <div className={styles.containerList}>
        <div className={styles.header}>
          <Link to="/">
            <img className={styles.logo} src={f8logo} alt="F8" />
          </Link>
          <h2 className={styles.subTitle}>Học Lập Trình Để Đi Làm</h2>
        </div>
        <ul className={styles.list}>
          <li className={styles.item}>
            Email:{' '}
            <a href="mailto:contact@fullstack.edu.vn">
              contact@fullstack.edu.vn
            </a>
          </li>
          <li className={styles.item}>
            Địa chỉ: Nhà D9, lô A10, Nam Trung Yên, Trung Hòa, Cầu Giấy, Hà Nội
          </li>
          <li className={styles.item}>
            <a
              href="https://www.dmca.com/Protection/Status.aspx?id=1b325c69-aeb7-4e32-8784-a0009613323a&amp;refurl=https%3a%2f%2ffullstack.edu.vn%2f&amp;rlo=true"
              target="_blank"
              rel="noreferrer"
              title="DMCA Protected"
            >
              <img src={dmcalogo} alt="DMCA" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Address

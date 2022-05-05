import React from 'react'
import styles from './Manager.module.scss'

const Manager = () => {
  return (
    <div className={styles.wrapperList}>
      <div className={styles.containerList}>
        <h2 className={styles.title}>Đơn vị chủ quản</h2>
        <ul className={styles.list}>
          <li className={styles.item}>
            Người đại diện: Đặng Ngọc Sơn - Giám Đốc
          </li>
          <li className={styles.item}>Mã số doanh nghiệp: 0108721536</li>
          <li className={styles.item}>Ngày thành lập: 03/05/2019</li>
          <li className={styles.item}>
            Nơi cấp: Sở kế hoạch và đầu tư TP Hà Nội
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Manager

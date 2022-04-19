import React from 'react'
import styles from './ProfileActivity.module.scss'
import { Link } from 'react-router-dom'
import timeSince from '../utils/timeSince/timeSince'

const ProfileActivity = ({ user }) => {
  return (
    <>
      <div className={styles.wrapper}>
        <h4 className={styles.title}>Giới thiệu</h4>
        {user.bio && (
          <div className={styles.bio}>
            <span>{user.bio}</span>
          </div>
        )}
        <div className={styles.joinHistory}>
          <i className={`fa-solid fa-user-group ${styles.groupIcon}`}></i>
          <span>
            Thành viên của <strong>F8 (Học lập trình để đi làm) </strong>
            từ {timeSince(user.createdAt)}
          </span>
        </div>
      </div>
      <div className={styles.wrapper}>
        <h4 className={styles.title}>Hoạt động gần đây</h4>

        {!user.activity && (
          <p className={styles.noResult}>Chưa có hoạt động gần đây</p>
        )}

        {user.activity &&
          {
            //   <div className={styles.activityWrapper}>
            //   <img
            //     alt=""
            //     className={styles.avatar}
            //     src={
            //       'https://files.fullstack.edu.vn/f8-prod/user_avatars/1/623d4b2d95cec.png'
            //     }
            //   />
            //   <div className={styles.mainActivity}>
            //     <div className={styles.content}>
            //       <Link to="/" className={styles.author}>
            //         <span>Sơn Đặng</span>
            //       </Link>
            //       <div className={styles.reaction}>
            //         <div
            //           style={{
            //             padding: 5,
            //             position: 'relative',
            //             background: 'red',
            //           }}
            //         ></div>
            //       </div>
            //       <span> đã bày tỏ cảm xúc về bình luận của </span>
            //       <Link to="/" className={styles.author}>
            //         <span>Đạt Nguyễn: </span>
            //       </Link>
            //       <Link to="/" className={styles.message}>
            //         "đầu tiên em xin cảm ơn anh trước, thực sự khoảng thời gian em
            //         học xong khóa thì cũng gần xong năm 3 nhưng giờ em mới biết
            //         margin , padding như nào là được với nhiều cách xử lý khác nữa .
            //         em cảm ơn anh rất nhiều!!!"
            //       </Link>
            //     </div>
            //   </div>
            // </div>
          }}
      </div>
    </>
  )
}

export default ProfileActivity

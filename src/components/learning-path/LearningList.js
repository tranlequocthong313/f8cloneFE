import React from 'react'
import styles from './LearningList.module.scss'
import SecondaryCard from '../utils/card/SecondaryCard'
import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import CircularProgressBar from '../../components/utils/circular-progress-bar/CircularProgressBar'
import thumb1 from '../../asset/images/61a0439062b82.png'
import thumb2 from '../../asset/images/61a0439cc779b.png'
import skillImage1 from '../../asset/images/6200b81f52d83.png'
import skillImage2 from '../../asset/images/6200aecea81de.png'
import skillImage3 from '../../asset/images/6200afe1240bb.png'
import skillImage4 from '../../asset/images/6200b809e5c13.png'
import skillImage5 from '../../asset/images/6200ad9d8a2d8.png'
import skillImage6 from '../../asset/images/6200af9262b30.png'
import skillImage7 from '../../asset/images/6200afb926038.png'

const LearningList = () => {
  return (
    <div className={styles.content}>
      <div className={styles.wrapper}>
        <SecondaryCard forPage={'learningPath'}>
          <div className={styles.body}>
            <div className={styles.info}>
              <h2 className={styles.title}>
                <Link to="/">Front-end</Link>
              </h2>
              <p>
                Lập trình viên Front-end là người xây dựng ra giao diện
                websites. Trong phần này F8 sẽ chia sẻ cho bạn lộ trình để trở
                thành lập trình viên Front-end nhé.
              </p>
            </div>
            <div className={styles.thumbWrap}>
              <div className={styles.thumbRound}>
                <Link to="/" className={styles.thumb}>
                  <Image src={thumb1} />
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.cta}>
            <CircularProgressBar
              logo={skillImage1}
              tooltip={'Kiến Thức Nhập Môn IT'}
            />
            <CircularProgressBar
              logo={skillImage2}
              tooltip={'HTML, CSS từ Zero tới Hero'}
            />
            <CircularProgressBar
              logo={skillImage3}
              tooltip={'Responsive Với Grid System'}
            />
            <CircularProgressBar
              logo={skillImage4}
              tooltip={'HTML, CSS Tools & Tricks'}
            />
            <CircularProgressBar
              logo={skillImage5}
              tooltip={'Javascript Cơ Bản'}
            />
            <CircularProgressBar
              logo={skillImage5}
              tooltip={'Javascript Nâng Cao'}
            />
            <CircularProgressBar
              logo={skillImage6}
              tooltip={'Xây Dựng Website với ReactJS'}
            />
          </div>
          <Link to="/" className={styles.btn}>
            Xem chi tiết
          </Link>
        </SecondaryCard>
      </div>
      <div className={styles.wrapper}>
        <SecondaryCard forPage={'learningPath'}>
          <div className={styles.body}>
            <div className={styles.info}>
              <h2 className={styles.title}>
                <Link to="/">Back-end</Link>
              </h2>
              <p>
                Trái với Front-end thì lập trình viên Back-end là người làm việc
                với dữ liệu, công việc thường nặng tính logic hơn. Chúng ta sẽ
                cùng tìm hiểu thêm về lộ trình học Back-end nhé.
              </p>
            </div>
            <div className={styles.thumbWrap}>
              <div className={styles.thumbRound}>
                <Link to="/" className={styles.thumb}>
                  <Image src={thumb2} />
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.cta}>
            <CircularProgressBar
              logo={skillImage1}
              tooltip={'Kiến Thức Nhập Môn IT'}
            />
            <CircularProgressBar
              logo={skillImage2}
              tooltip={'HTML, CSS từ Zero tới Hero'}
            />
            <CircularProgressBar
              logo={skillImage5}
              tooltip={'Javascript Cơ Bản'}
            />
            <CircularProgressBar
              logo={skillImage5}
              tooltip={'Javascript Nâng Cao'}
            />
            <CircularProgressBar
              logo={skillImage7}
              tooltip={'Node & ExpressJS'}
            />
          </div>
          <Link to="/" className={styles.btn}>
            Xem chi tiết
          </Link>
        </SecondaryCard>
      </div>
    </div>
  )
}

export default LearningList

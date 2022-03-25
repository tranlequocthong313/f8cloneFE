import React from 'react'
import { Carousel, Image } from 'react-bootstrap'
import banner1 from '../../../asset/Banner_01_2.png'
import banner2 from '../../../asset/Banner_03_youtube.png'
import banner3 from '../../../asset/Banner_04_2.png'
import banner4 from '../../../asset/Banner_web_ReactJS.png'
import styles from './Slide.module.scss'
import '../../../sass/_carousel.scss'

const Slide = () => {
  return (
    <Carousel>
      <Carousel.Item
        interval={3000}
        className={styles.slider}
        style={{
          background:
            'linear-gradient(to right, rgb(254, 33, 94), rgb(255, 148, 2))',
        }}
      >
        <div className={styles.sliderItem}>
          <div className={styles.sliderLeft}>
            <h2 className={styles.heading}>
              <a
                rel="noreferrer noopener noreferrer"
                target="_blank"
                href="https://www.youtube.com/channel/UCNSCWwgW-rwmoE3Yc4WmJhw"
              >
                F8 trên Youtube
              </a>
            </h2>
            <p className={styles.description}>
              F8 được nhắc tới ở mọi nơi, ở đâu có cơ hội việc làm cho nghề IT
              và có những con người yêu thích lập trình F8 sẽ ở đó.
            </p>
            <div>
              <a
                className={styles.button}
                rel="noreferrer noopener noreferrer"
                target="_blank"
                href="https://www.youtube.com/channel/UCNSCWwgW-rwmoE3Yc4WmJhw"
              >
                Truy cập kênh
              </a>
            </div>
          </div>

          <div className={styles.sliderRight}>
            <a
              rel="noreferrer noopener noreferrer"
              target="_blank"
              href="https://www.youtube.com/channel/UCNSCWwgW-rwmoE3Yc4WmJhw"
            >
              <Image className="w-60" src={banner2} alt="First slide" />
            </a>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item
        interval={3000}
        className={styles.slider}
        style={{
          background:
            'linear-gradient(to right, rgb(118, 18, 255), rgb(5, 178, 255))',
        }}
      >
        <div className={styles.sliderItem}>
          <div className={styles.sliderLeft}>
            <h2 className={styles.heading}>
              <a
                rel="noreferrer noopener noreferrer"
                target="_blank"
                href="https://fullstack.edu.vn/blog/tong-hop-cac-san-pham-cua-hoc-vien-tai-f8.html"
              >
                Thành Quả của Học Viên
              </a>
            </h2>
            <p className={styles.description}>
              Để đạt được kết quả tốt trong mọi việc ta cần xác định mục tiêu rõ
              ràng cho việc đó. Học lập trình cũng không là ngoại lệ.
            </p>
            <div>
              <a
                className={styles.button}
                rel="noreferrer noopener noreferrer"
                target="_blank"
                href="https://fullstack.edu.vn/blog/tong-hop-cac-san-pham-cua-hoc-vien-tai-f8.html"
              >
                Xem thành quả
              </a>
            </div>
          </div>

          <div className={styles.sliderRight}>
            <a
              rel="noreferrer noopener noreferrer"
              target="_blank"
              href="https://fullstack.edu.vn/blog/tong-hop-cac-san-pham-cua-hoc-vien-tai-f8.html"
            >
              <Image className="w-60" src={banner1} alt="Second slide" />
            </a>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item
        interval={3000}
        className={styles.slider}
        style={{
          background:
            'linear-gradient(to right, rgb(0, 126, 254), rgb(6, 195, 254))',
        }}
      >
        <div className={styles.sliderItem}>
          <div className={styles.sliderLeft}>
            <h2 className={styles.heading}>
              <a
                rel="noreferrer noopener noreferrer"
                target="_blank"
                href="https://www.facebook.com/groups/649972919142215"
              >
                F8 trên Facebook
              </a>
            </h2>
            <p className={styles.description}>
              F8 được nhắc tới ở mọi nơi, ở đâu có cơ hội việc làm cho nghề IT
              và có những con người yêu thích lập trình F8 sẽ ở đó.
            </p>
            <div>
              <a
                className={styles.button}
                rel="noreferrer noopener noreferrer"
                target="_blank"
                href="https://www.facebook.com/groups/649972919142215"
              >
                Truy cập nhóm
              </a>
            </div>
          </div>

          <div className={styles.sliderRight}>
            <a
              rel="noreferrer noopener noreferrer"
              target="_blank"
              href="https://www.facebook.com/groups/649972919142215"
            >
              <Image className="w-60" src={banner3} alt="Third slide" />
            </a>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item
        interval={3000}
        className={styles.slider}
        style={{
          background:
            'linear-gradient(to right, rgb(40, 119, 250), rgb(103, 23, 205))',
        }}
      >
        <div className={styles.sliderItem}>
          <div className={styles.sliderLeft}>
            <h2 className={styles.heading}>
              <a
                rel="noreferrer noopener noreferrer"
                target="_blank"
                href="https://fullstack.edu.vn/courses/reactjs?ref=banner"
              >
                Học ReactJS Miễn Phí!
              </a>
            </h2>
            <p className={styles.description}>
              Khóa học ReactJS từ cơ bản tới nâng cao. Kết quả của khóa học này
              là bạn có thể làm hầu hết các dự án thường gặp với ReactJS.
            </p>
            <div>
              <a
                className={styles.button}
                rel="noreferrer noopener noreferrer"
                target="_blank"
                href="https://fullstack.edu.vn/courses/reactjs?ref=banner"
              >
                Đăng ký ngay
              </a>
            </div>
          </div>

          <div className={styles.sliderRight}>
            <a
              rel="noreferrer noopener noreferrer"
              target="_blank"
              href="https://fullstack.edu.vn/courses/reactjs?ref=banner"
            >
              <Image className="w-60" src={banner4} alt="Third slide" />
            </a>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  )
}

export default Slide

import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styles from './About.module.scss'
import banner1 from '../../asset/images/f8-og-image.jpg'
import banner2 from '../../asset/images/about-1.c8179beb513c0a025314.png'
import banner3 from '../../asset/images/about-2.9172a49089c8c29156f7.png'
import banner4 from '../../asset/images/about-3.61ca6adf22cc550c0c03.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from '../../components/main-layout/nav/Header'
import Footer from '../../components/main-layout/footer/Footer'
import CareerList from '../../components/career/CareerList'
import { apiURL } from '../../context/constants'

const About = () => {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    const controller = new AbortController()

    ;(async () => {
      try {
        const res = await fetch(`${apiURL}/help/get-job`, {
          signal: controller.signal,
        })

        const data = await res.json()

        setJobs(data)
      } catch (error) {
        console.log(error)
      }
    })()

    return () => controller?.abort()
  }, [])

  return (
    <>
      <Header />
      <Container style={{ maxWidth: '100vw', padding: 0 }}>
        <div className={`${styles.wrapper} ${styles.textContent}`}>
          <Container style={{ padding: 0, margin: '0 auto' }}>
            <Row className={styles.root} style={{ marginTop: 66 }}>
              <Col md={12} xl={6} style={{ padding: 0 }}>
                <img
                  alt="Giới thiệu về F8"
                  src={banner1}
                  className={styles.firstImage}
                />
              </Col>
              <Col md={12} xl={6} style={{ padding: 0 }}>
                <div className={styles.introText}>
                  <h4 className={styles.heading}>BẠN CÓ BIẾT?</h4>
                  <p>
                    Ngoài kia có rất nhiều bạn làm sai nghề, tư duy an phận và
                    bị chôn chân với một công việc không đủ vui, không đủ sống,
                    các bạn ấy gặp hết khủng hoảng tuổi này tới tuổi kia.
                  </p>
                  <p>
                    Tuổi 22 đang ngỡ ngàng không biết mình nên làm nghề gì. Tuổi
                    28 thì bàng hoàng không biết lương như mình thì lập gia đình
                    và nuôi dạy con cái làm sao. Tuổi 40 nuối tiếc thanh xuân
                    của mình liệu có phải đã phí hoài không nhỉ...
                  </p>
                </div>
              </Col>
              <Col xs={12} md={12} lg={12} xl={12} style={{ padding: 0 }}>
                <div className={styles.introTextSecond}>
                  <p>
                    Mọi chuyện sẽ rất khác nếu họ được định hướng công việc phù
                    hợp, biết cách đặt cho mình một mục tiêu rõ ràng và có đầy
                    đủ kĩ năng cần thiết để phát triển sự nghiệp.
                  </p>
                  <p>
                    F8 tin rằng con người Việt Nam không hề thua kém gì so với
                    con người ở bất cứ nơi đâu. Con rồng cháu tiên hoàn toàn có
                    thể trở thành công dân toàn cầu để sánh vai cùng các cường
                    quốc năm châu.
                  </p>
                  <p>
                    F8 mong muốn trở thành một tổ chức góp phần tạo nên sự thay
                    đổi đó, và việc tạo ra cộng đồng học lập trình mới chỉ là
                    điểm bắt đầu. Chúng tôi đang nỗ lực tạo ra các khóa học có
                    nội dung chất lượng vượt trội, giúp học viên sau khi hoàn
                    thành khóa học có thể trở thành những lập trình viên luôn
                    được nhiều công ty săn đón.s
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Container style={{ padding: 0, margin: '0 auto' }}>
          <Row className={styles.subRoot}>
            <Col xs={12} md={12} lg={12} xl={12} style={{ padding: 0 }}>
              <div className={`${styles.goal} ${styles.textContent}`}>
                <h3 className={styles.heading}>Tầm nhìn</h3>
                <p>
                  Trở thành công ty công nghệ giáo dục có vị thế vững vàng trên
                  thị trường, với các sản phẩm hỗ trợ học lập trình chất lượng,
                  thông minh và hiệu quả. F8 sẽ nổi tiếng bởi chất lượng sản
                  phẩm vượt trội và được cộng đồng tin tưởng chứ không phải vì
                  tiếp thị tốt.
                </p>
                <h3 className={styles.heading}>GIÁ TRỊ CỐT LÕI</h3>
                <p>
                  <strong>Sự tử tế:</strong>
                  Tử tế trong chính người F8 với nhau và tử tế với học viên là
                  kim chỉ nam phấn đấu. Đã làm sản phẩm là phải chất lượng và
                  chứng minh được hiệu quả, bất kể là sản phẩm miễn phí hay giá
                  rẻ. Làm ra phải thấy muốn để người thân mình dùng.
                </p>
                <p>
                  <strong>Tư duy số:</strong>
                  Sản phẩm làm ra không phải là để vừa lòng đội ngũ trong công
                  ty. Sản phẩm làm ra với mục tiêu cao nhất là người học thấy dễ
                  học, được truyền cảm hứng tự học, học tới bài học cuối cùng và
                  người học có thể tự tay làm ra những dự án bằng kiến thức đã
                  học.
                </p>
                <p>
                  <strong>Luôn đổi mới và không ngừng học:</strong>
                  Học từ chính đối thủ, học từ những công ty công nghệ giáo dục
                  tốt trên thế giới và luôn luôn lắng nghe mọi góp ý từ phía học
                  viên.
                </p>
                <p>
                  <strong>Tư duy bền vững:</strong>
                  Có hai thứ đáng để đầu tư giúp mang lại thành quả tài chính
                  tốt nhất trong dài hạn của một công ty đó là nhân viên và
                  khách hàng.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
        <div className={styles.saleWhat}>
          <Container style={{ padding: 0, margin: '0 auto' }}>
            <Row>
              <Col xs={12} md={12} lg={12} xl={12} style={{ padding: 0 }}>
                <div className={styles.content}>
                  <h3 className={styles.heading}>Bạn nhận được gì từ F8?</h3>
                  <div className={`${styles.grid} ${styles.textContent}`}>
                    <div className={styles.gridItem}>
                      <h4 className={styles.subHeading}>1. Sự thành thạo</h4>
                      Các bài học đi đôi với thực hành, làm bài kiểm tra ngay
                      trên trang web và bạn luôn có sản phẩm thực tế sau mỗi
                      khóa học.
                    </div>
                    <div className={styles.gridItem}>
                      <h4 className={styles.subHeading}>2. Tính tự học</h4>
                      Một con người chỉ thực sự trưởng thành trong sự nghiệp nếu
                      họ biết cách tự thu nạp kiến thức mới cho chính mình.
                    </div>
                    <div className={styles.gridItem}>
                      <h4 className={styles.subHeading}>
                        3. Tiết kiệm thời gian
                      </h4>
                      Thay vì chật vật vài năm thì chỉ cần 4-6 tháng để có thể
                      bắt đầu công việc đầu tiên với vị trí Intern tại công ty
                      IT.
                    </div>
                    <div className={styles.gridItem}>
                      <h4 className={styles.subHeading}>
                        4. Làm điều quan trọng
                      </h4>
                      Chỉ học và làm những điều quan trọng để đạt được mục tiêu
                      đi làm được trong thời gian ngắn nhất.
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Container style={{ padding: 0, margin: '0 auto' }}>
          <Row className={styles.subRoot}>
            <Col xs={12} md={12} lg={12} xl={12} style={{ padding: 0 }}>
              <div className={`${styles.strategy} ${styles.textContent}`}>
                <h3 className={styles.heading}>Chiến lược phát triển</h3>
                <h4 className={styles.subHeading}>
                  1. Coi trọng đào tạo và phát triển nhân tài
                </h4>
                <p>
                  F8 tin rằng sản phẩm tuyệt vời chỉ có thể tạo ra bởi những con
                  người tài năng. Công ty muốn tăng trưởng nhanh bền vững phải
                  có những nhân sự xuất sắc có tâm, có tài. Vì vậy, F8 không
                  ngừng tìm kiếm và phát triển những cá nhân tài năng cùng xây
                  dựng bộ máy. Nếu bạn muốn được làm cùng với những người giỏi
                  giang khác? Bạn muốn được chủ động quyết định trong công việc
                  của mình? Và bạn muốn được tương thưởng xứng đáng? Hãy về với
                  F8 😍
                </p>
                <div className={styles.textHorizontalWithImg}>
                  <div className={styles.textBlock}>
                    <h4 className={styles.subHeading}>
                      2. Sản phẩm làm ra là phải chất lượng, là phải bán được
                    </h4>
                    <p>
                      F8 làm ra những sản phẩm phục vụ thị trường lớn, chất
                      lượng và hiệu quả thực sự, đáp ứng nhu cầu cấp thiết của
                      học viên. Mỗi khóa học, mỗi bài giảng của F8 không phải
                      được làm ra bởi chỉ một người. Mà đó là tổng hoà chuyên
                      môn của người dạy, sales, marketing, lập trình viên, đạo
                      diễn hình ảnh và âm thanh… Khúc nào cũng phải cố
                      benchmarking, tự tin đứng cạnh các sản phẩm của thế giới.
                      Tức là làm một cách thông minh và xâu chuỗi nhiều loại
                      hiểu biết khác nhau.
                    </p>
                  </div>
                  <img
                    alt="Sản phẩm đã làm ra là phải chất lượng, làm ra là bán được"
                    src={banner2}
                    className={styles.img}
                  />
                </div>
                <div
                  className={`${styles.textHorizontalWithImg} ${styles.reverse}`}
                >
                  <div className={styles.textBlock}>
                    <h4 className={styles.subHeading}>
                      3. Tập trung vào khách hàng
                    </h4>
                    <p>
                      Khi học lập trình phần đông học viên dễ bị mất định hướng,
                      dễ nản khi gặp khó khăn mà không ai giúp đỡ, nhiều khi
                      thấy làm giống hệt video rồi mà không chạy... Tại F8,
                      chúng tôi thấu hiểu những khó khăn của các bạn, chúng tôi
                      nỗ lực tạo ra giáo trình và hệ thống bài tập, hệ thống hỗ
                      trợ các bạn tối đa trong quá trình học tập.
                    </p>
                  </div>
                  <img
                    alt="Tập trung vào khách hàng"
                    src={banner3}
                    className={styles.img}
                  />
                </div>
                <p>
                  F8 tin rằng trong mỗi chúng ta luôn tồn tại một "đứa trẻ", để
                  đứa trẻ đó học tốt một kiến thức mới thì sản phẩm không thể
                  chỉ thành công về mặt học thuật, mà phải tạo được thật nhiều
                  cảm xúc. F8 thiết kế hành trình cảm xúc đó bằng hình ảnh, âm
                  thanh, bằng các nội dung xu hướng, bằng cách ghi nhận sự nỗ
                  lực của học viên và luôn tạo cảm hứng học tập.
                </p>
                <div className={styles.textHorizontalWithImg}>
                  <div className={styles.textBlock}>
                    <h4 className={styles.subHeading}>
                      4. Bán hàng và chăm sóc khách hàng bền vững
                    </h4>
                    <p>
                      Việc bán hàng sẽ trở nên rất dễ dàng khi khách hàng sử
                      dụng hiệu quả và truyền tai nhau về sản phẩm. Thành công
                      về mặt doanh số không quan trọng bằng việc người học đánh
                      giá cao sản phẩm sau đó tiếp tục sử dụng, thậm chí còn
                      giới thiệu cho người thân và bạn bè. F8 là một trong những
                      công ty giáo dục, có lẽ là duy nhất đầu tư rất nhiều ngân
                      sách vào việc chăm sóc khách hàng, thay vì bỏ tiền đi đánh
                      bóng tên tuổi. F8 sẽ tìm mọi cách để dần đạt được con số
                      99% khách hàng hài lòng.
                    </p>
                    <p>
                      <em>
                        1% còn lại là những con người của F8, chúng tôi không
                        cho phép bản thân mình cảm thấy hài lòng hoàn toàn về
                        sản phẩm. Đó chính là động lực để chúng tôi liên tục cải
                        thiện, liên tục phát triển và tạo ra các sản phẩm hỗ trợ
                        học tập chất lượng cho cộng đồng.
                      </em>
                    </p>
                  </div>
                  <img
                    alt="Bán hàng và chăm sóc khách hàng bền vững"
                    src={banner4}
                    className={styles.img}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <div className={`${styles.environment} ${styles.textContent}`}>
          <Container style={{ padding: 0, margin: '0 auto' }}>
            <Row className={styles.root}>
              <Col xs={12} md={12} lg={12} xl={12} style={{ padding: 0 }}>
                <h3 className={styles.heading}>Môi trường làm việc</h3>
                <p>
                  Môi trường làm việc lành mạnh. Không toxic, không gossip,
                  trong công việc thử thách hết mình nhưng ngoài công việc không
                  bè phái ganh đua hay tấn công gì nhau.
                </p>
                <p>
                  Quan điểm làm việc của F8 là dân chủ, sếp có thể sai nhưng tổ
                  chức phải đúng. Sai thì nhận và sửa. Nhân viên thoải mái nói
                  lên chính kiến của mình. Trên dưới lắng nghe và cởi mở với góc
                  nhìn của nhau, quyết tâm vì mục tiêu chung.
                </p>
                <p>
                  Tỷ lệ nghỉ việc tại các bộ phận chuyên môn cao dưới 5%, nhưng
                  đối với F8 đúng người đúng việc sẽ quan trọng hơn. Các bạn
                  được thử thách với công việc mới khi đã làm tốt chuyên môn cũ
                  và công ty luôn sẵn sàng đầu tư cho nhân viên đi học thêm các
                  kỹ năng cần thiết cho công việc. Quan điểm của F8, nhân viên
                  là người bạn đồng hành cùng sự phát triển của công ty, luôn
                  sẵn sàng giúp nhân viên có cuộc sống cân bằng và phát triển
                  chuyên môn tối đa.
                </p>
                <div className={styles.quote}>
                  <i
                    className={`${styles.iconLeft} fa-solid fa-quote-left`}
                  ></i>
                  Quan điểm của F8 chúng mình là không phải bạn đi xin việc và
                  công ty cũng không đi xin ứng viên tài năng. F8 tôn trọng thời
                  gian và sự quan tâm của các bạn tới chúng mình. Nếu có điều gì
                  không hài lòng về quy trình tuyển dụng của công ty, hãy góp ý
                  nhẹ vào{' '}
                  <a href="mailto:contact@fullstack.edu.vn">
                    contact@fullstack.edu.vn
                  </a>{' '}
                  nhé. F8 cảm ơn bạn đã quan tâm và rất mong chờ gặp bạn tại F8
                  😍
                  <i
                    className={`${styles.iconRight} fa-solid fa-quote-right`}
                  ></i>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Container style={{ padding: 0, margin: '0 auto' }}>
          <Row className={styles.subRoot}>
            <Col xs={12} md={12} lg={12} xl={12} style={{ padding: 0 }}>
              <div className={`${styles.recruitment} ${styles.textContent}`}>
                <h3 className={styles.heading}>
                  Vị trí dành cho các bạn đam mê làm giáo dục
                </h3>
                <p>
                  F8 tin rằng mỗi người đều có những tiềm năng vô hạn để trở nên
                  giỏi giang. Vấn đề là họ không áp dụng đúng phương pháp để
                  việc học hiệu quả hơn. Vì vậy F8 mong muốn giúp cho những
                  người gặp khó khăn trong việc học hành nói chung và học lập
                  trình nói riêng được tiếp cận các phương pháp, kinh nghiệm học
                  lập trình thông minh để trở nên giỏi thực sự.
                </p>
                <p>
                  Bạn muốn đồng hành với F8 để cùng nhau thực hiện những điều
                  trên chứ?
                </p>

                <CareerList jobs={jobs} xl={6} />

                <button className={styles.viewMoreJobs}>
                  <div>
                    <span>Tìm hiểu thêm</span>
                  </div>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
      <Footer />
    </>
  )
}

export default About

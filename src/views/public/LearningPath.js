import React, { Suspense } from 'react'
import '../../sass/_withSidebarContent.scss'
import ctaImage from '../../asset/images/fb-group-cards@2x.png'
import Suggestion from '../../components/utils/suggestion/Suggestion'
import '../../sass/_container.scss'
import { Col, Row } from 'react-bootstrap'
import LearningList from '../../components/learning-path/LearningList'
import SideBar from '../../components/main-layout/sidebar/SideBar'
import Header from '../../components/main-layout/nav/Header'

const Footer = React.lazy(() =>
  import('../../components/main-layout/footer/Footer')
)

const LearningPath = () => {
  return (
    <>
      <Header />
      <Row>
        <Col xs={0} sm={0} md={1} lg={1} xl={1}>
          <SideBar />
        </Col>
        <Col xs={12} sm={12} md={12} lg={11} xl={11}>
          <div className="withSidebarContent">
            <div className="container">
              <div className="containerTop">
                <h1>Lộ trình học</h1>
                <p>
                  Để bắt đầu một cách thuận lợi, bạn nên tập trung vào một lộ
                  trình học. Ví dụ: Để đi làm với vị trí “Lập trình viên
                  Front-end” bạn nên tập trung vào lộ trình “Front-end”.
                </p>
              </div>
              <LearningList />
              <Suggestion
                title={'Tham gia cộng đồng học viên F8 trên Facebook'}
                description={
                  'Hàng nghìn người khác đang học lộ trình giống như bạn. Hãy tham gia hỏi đáp, chia sẻ và hỗ trợ nhau trong quá trình học nhé.'
                }
                button={'Tham gia nhóm'}
                image={ctaImage}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </>
  )
}

export default LearningPath

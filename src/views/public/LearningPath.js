import React, { useEffect, useState } from 'react'
import '../../sass/_withSidebarContent.scss'
import ctaImage from '../../asset/images/fb-group-cards@2x.png'
import Suggestion from '../../utils/suggestion/Suggestion'
import { Row } from 'react-bootstrap'
import LearningList from '../../components/learning-path/LearningList'
import styles from './LearningPath.module.scss'
import SubLoading from '../../utils/loading/SubLoading'

const Footer = React.lazy(() => import('../../components/layout/footer/Footer'))

const LearningPath = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    setTimeout(() => setLoading(false), 500)
  }, [])

  useEffect(
    () =>
      (document.title =
        'Lộ trình học lập trình cho người mới tại F8 | Tự học lập trình từ đầu ở nhà'),
    []
  )

  return loading ? (
    <SubLoading />
  ) : (
    <Row className={styles.wrapper}>
      <div className={styles.containerTop}>
        <h2>Lộ trình học</h2>
        <p>
          Để bắt đầu một cách thuận lợi, bạn nên tập trung vào một lộ trình học.
          Ví dụ: Để đi làm với vị trí “Lập trình viên Front-end” bạn nên tập
          trung vào lộ trình “Front-end”.
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
        path={'https://www.facebook.com/groups/f8official'}
        linkOutside={true}
      />
    </Row>
  )
}

export default LearningPath

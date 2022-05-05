import React, { Suspense, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import styles from './Careers.module.scss'
import CareerList from '../../components/career/CareerList'
import Header from '../../components/layout/nav/Header'
import SideBar from '../../components/layout/sidebar/SideBar'
import { apiURL } from '../../context/constants'
import consoleLog from '../../components/utils/console-log/consoleLog'
import SubLoading from '../../components/utils/loading/SubLoading'

const Footer = React.lazy(() => import('../../components/layout/footer/Footer'))

const Careers = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(
    () =>
      (document.title =
        'Tuyển dụng các vị trí làm việc tại F8 | Cơ hội việc làm IT | Đào tạo và phát triển nhân tài'),
    []
  )

  useEffect(() => {
    ;(async () => {
      setLoading(true)

      const url = `${apiURL}/help/get-job`
      const data = await getJob(url)

      if (data) {
        setJobs(data)
        setLoading(false)
      }
    })()
  }, [])

  const getJob = async (url) => {
    try {
      return (await fetch(url)).json()
    } catch (error) {
      consoleLog(error.message)
    }
  }

  return loading ? (
    <SubLoading />
  ) : (
    <Row className={styles.wrapper}>
      <div className={styles.containerTop}>
        <h2>Cơ hội việc làm</h2>
        <p>
          F8 tin rằng mỗi người đều có những tiềm năng vô hạn để trở nên giỏi
          giang. Vấn đề là họ không áp dụng đúng phương pháp để việc học hiệu
          quả hơn. Vì vậy F8 mong muốn giúp cho những người gặp khó khăn trong
          việc học hành nói chung và học lập trình nói riêng được tiếp cận các
          phương pháp, kinh nghiệm học lập trình thông minh để trở nên giỏi thực
          sự.
        </p>
      </div>
      <div className={styles.containerBody}>
        <h2>2 việc làm đang mở tại F8</h2>
        <CareerList xl={8} jobs={jobs} />
      </div>
    </Row>
  )
}

export default Careers

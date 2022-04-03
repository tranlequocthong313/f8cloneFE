import React, { Suspense, useState } from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Header from '../../components/main-layout/nav/Header'
import SideBar from '../../components/main-layout/sidebar/SideBar'
import styles from './Admin.module.scss'
import CreateVideo from '../../components/home/videos/CreateVideo'

const Footer = React.lazy(() =>
  import('../../components/main-layout/footer/Footer')
)

const Admin = () => {
  const location = useLocation()
  const user = useSelector(state => state.user)

  const [tabs, setTabs] = useState('courses')

  return (
    <>
      <Header />
      <Row>
        <Col xs={0} sm={0} md={1} lg={1} xl={1}>
          <SideBar />
        </Col>
        <Col xs={12} sm={12} md={12} lg={11} xl={11}>
          <div className="withSidebarContent">
            <ul className={styles.tabs}>
              <li
                className={
                  tabs === 'courses'
                    ? `${styles.tab} ${styles.active}`
                    : styles.tab
                }
                onClick={() => setTabs('courses')}
              >
                Khóa học
              </li>
              <li
                className={
                  tabs === 'blogs'
                    ? `${styles.tab} ${styles.active}`
                    : styles.tab
                }
                onClick={() => setTabs('blogs')}
              >
                Bài viết
              </li>
              <li
                className={
                  tabs === 'videos'
                    ? `${styles.tab} ${styles.active}`
                    : styles.tab
                }
                onClick={() => setTabs('videos')}
              >
                Video
              </li>
            </ul>
            {location.pathname === '/admin' && user.isAdmin && <CreateVideo />}
          </div>
        </Col>
      </Row>
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </>
  )
}

export default Admin

{
  /* <Table striped bordered hover variant="light">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td colSpan={2}>Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table> */
}

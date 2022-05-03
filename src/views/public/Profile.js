import React, { Suspense, useEffect, useState } from 'react'
import styles from './Profile.module.scss'
import Header from '../../components/main-layout/nav/Header'
import SideBar from '../../components/main-layout/sidebar/SideBar'
import { Col, Container, Row } from 'react-bootstrap'
import ProfileCourses from '../../components/profile/ProfileCourses'
import ProfileActivity from '../../components/profile/ProfileActivity'
import { apiURL } from '../../context/constants'
import { useLocation } from 'react-router-dom'
import bannerProfileImage from '../../asset/images/cover-profile.3fb9fed576da4b28386a.png'

const Footer = React.lazy(() =>
  import('../../components/main-layout/footer/Footer')
)

const Profile = () => {
  const location = useLocation()

  const [user, setUser] = useState(null)

  useEffect(() => {
    ;(async () => {
      const url = `${apiURL}/me/${location.pathname}`
      const data = await getProfile(url)

      setUser(data)
    })()
  }, [location.pathname])

  const getProfile = async (url) => {
    try {
      return await fetch(url)
    } catch (error) {
      consoleLog(error.message)
    }
  }

  return (
    <>
      <Header className={styles.header} isProfile={true} />
      <div className={styles.sidebarWrap}>
        <SideBar isHide={true} />
      </div>
      <Container className={styles.wrapper}>
        <Row style={{ padding: 0 }}>
          <div
            className={styles.banner}
            style={{
              backgroundImage: `url(${bannerProfileImage})`,
            }}
          >
            <div className={styles.user}>
              <div className={styles.avatar}>
                <img alt="ảnh đại diện" src={user ? user.photoURL : ''} />
              </div>
              <h3 className={styles.fullName}>{user ? user.fullName : ''}</h3>
            </div>
          </div>
          <Container className={styles.container}>
            <Row style={{ marginTop: 0, padding: 0 }}>
              <Col sm={12} md={12} lg={5} xl={5}>
                {user && <ProfileActivity user={user} />}
              </Col>
              <Col sm={12} md={12} lg={7} xl={7}>
                {user && <ProfileCourses user={user} />}
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </>
  )
}

export default Profile

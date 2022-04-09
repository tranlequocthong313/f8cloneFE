import React, { memo, Suspense } from 'react'
import { Navbar, Container } from 'react-bootstrap'
import Logo from './components/Logo'
import Search from './components/Search'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './Header.module.scss'
import MobileNav from './components/MobileNav'
import '../../../sass/_custom.scss'
import { useSelector } from 'react-redux'
import PublishButton from '../../new-post/PublishButton'
import { Link } from 'react-router-dom'
import User from './components/User'
import MyCourse from './components/MyCourse'
import Notification from './components/Notification'

const Login = React.lazy(() => import('./components/Login'))

const Header = ({ currentPage, blogDataHandler, setShowModal, isValid }) => {
  const user = useSelector((state) => state.user)

  return (
    <Navbar className={styles.navHeader}>
      <Container fluid style={{ padding: 0 }}>
        <MobileNav photoURL={user.photoURL} />
        <Logo />
        <Search currentPage={currentPage} />

        <div className={styles.userAction}>
          {currentPage === 'new-blog' && (
            <PublishButton
              blogDataHandler={blogDataHandler}
              setShowModal={setShowModal}
              isValid={isValid}
            />
          )}
          <Link to="/search" className={styles.searchMobileWrapper}>
            <div className={styles.searchMobileIcon}></div>
          </Link>

          <Suspense fallback={<User />}>
            {user.isLoggedIn && (
              <>
                <MyCourse />
                <Notification />
                <User
                  currentPage={currentPage}
                  photoURL={user.photoURL}
                  displayName={user.displayName}
                  email={user.email}
                />
              </>
            )}
            {!user.isLoggedIn && <Login />}
          </Suspense>
        </div>
      </Container>
    </Navbar>
  )
}

export default memo(Header)

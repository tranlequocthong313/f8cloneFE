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

const Login = React.lazy(() => import('./components/Login'))

const Header = ({
  currentPage,
  blogDataHandler,
  setShowModal,
  isValid,
  scrollY,
}) => {
  const user = useSelector(state => state.user)

  return (
    <Navbar
      className={
        scrollY ? `${styles.navHeader} ${styles.moveOut}` : styles.navHeader
      }
    >
      <Container fluid>
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
              <User
                currentPage={currentPage}
                photoURL={user.photoURL}
                displayName={user.displayName}
                email={user.email}
              />
            )}
            {!user.isLoggedIn && <Login />}
          </Suspense>
        </div>
      </Container>
    </Navbar>
  )
}

export default memo(Header)

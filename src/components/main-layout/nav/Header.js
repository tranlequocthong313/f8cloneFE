import React, { memo, Suspense } from 'react'
import { Navbar, Container } from 'react-bootstrap'
import Logo from './components/Logo'
import Search from './components/Search'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './Header.module.scss'
import MobileNav from './components/MobileNav'
import '../../../sass/_custom.scss'
import { useSelector } from 'react-redux'
import NewPost from '../../newBlog/NewPost'
import { Link } from 'react-router-dom'
import User from './components/User'

const Header = ({
  currentPage,
  blogDataHandler,
  setShowModal,
  isValid,
  scrollY,
}) => {
  const user = useSelector(state => state.user)
  const Login = React.lazy(() => import('./components/Login'))

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
            <NewPost
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

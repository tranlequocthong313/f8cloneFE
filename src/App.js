import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { setAuth } from './actions/userAction'
import { apiURL } from './context/constants'
import Loading from './utils/loading/Loading'
import consoleLog from './utils/console-log/consoleLog'
import { publicRoutes, privateRoutes, adminRoutes, authRoutes } from './routes'
import { Routes, Route, useLocation } from 'react-router-dom'
import NotFound from './views/public/NotFound'
import DefaultLayout from './components/layout/default-layout/DefaultLayout'

function App() {
  const dispatch = useDispatch()
  const location = useLocation()
  const user = useSelector((state) => state.user)

  const [loading, setLoading] = useState(true)

  useEffect(() => window.scrollTo(0, 0), [location.pathname])

  useEffect(() => {
    ;(async () => {
      setLoading(true)

      const token = Cookies.get('token')
      if (!token) return setLoading(false)

      const url = `${apiURL}/auth/check-user`
      const data = await getUser(url, token)

      if (data.success) dispatch(setAuth({ ...data.user, accessToken: token }))

      setLoading(false)
    })()
  }, [dispatch])

  const getUser = async (url, token) => {
    try {
      return (
        await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      ).json()
    } catch (error) {
      consoleLog(error.message)
    }
  }

  useEffect(() => {
    console.log(
      '%cHello! 🙋',
      'font-size: 16px; font-weight: 600; color: #32c6a1'
    )
    console.log(
      '%cF8 front-end was built with Javascript, React, Redux, SASS, CSS module, webpack, and lots of love. \n \nF8 back-end was built with Node, ExpressJS, MongoDB, and lots of love. \n  \n👉 Want to work with us? Check out https://fullstack.edu.vn/careers/',
      'font-size: 14px; font-weight: 500; color: #32c6a1'
    )
  }, [])

  const handleRoute = (routes) => {
    return routes.map((route, index) => {
      const Page = route.component
      let Layout = DefaultLayout

      if (route.layout) {
        Layout = route.layout
      } else if (route.layout === null) {
        Layout = Fragment
      }

      return (
        <Route
          key={index}
          path={route.path}
          element={
            <Layout>
              <Page />
            </Layout>
          }
        />
      )
    })
  }

  return loading ? (
    <Loading />
  ) : (
    <Routes>
      {handleRoute(publicRoutes)}
      {user.isLoggedIn && handleRoute(privateRoutes)}
      {user.isLoggedIn && user.isAdmin && handleRoute(adminRoutes)}
      {!user.isLoggedIn && handleRoute(authRoutes)}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App

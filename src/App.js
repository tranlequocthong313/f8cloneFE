import Blog from './views/Blog'
import Courses from './views/Courses'
import LearningPath from './views/LearningPath'
import Home from './views/Home'
import Contact from './views/Contact'
import Search from './views/Search'
import Privacy from './views/Privacy'
import About from './views/About'
import Careers from './views/Careers'
import Terms from './views/Terms'
import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CourseSlug from './components/coursepage/CourseSlug'
import { useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import { setAuth } from './actions/userAction'
import { apiURL } from './context/constants'
import BlogSlug from './components/blogpage/BlogSlug'
import Auth from './views/Auth'
import NotFound from './views/NotFound'
import Learning from './views/Learning'
import MyCourse from './views/MyCourse'
import NewBlog from './views/NewBlog'
import Settings from './views/Settings'
import BookmarkPost from './views/BookmarkPost'
import MyBlog from './views/MyBlog'

function App() {
  const dispatch = useDispatch()
  const location = useLocation()

  const user = useSelector(state => state.user)

  // Scroll to top when routing
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    const controller = new AbortController()

    ;(async () => {
      try {
        const token = Cookies.get('token')
        if (!token) return

        const res = await fetch(
          `${apiURL}/api/auth`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
          {
            signal: controller.signal,
          }
        )

        const data = await res.json()

        dispatch(
          setAuth({
            ...data.user,
            accessToken: token,
            admin: data.admin,
          })
        )
      } catch (error) {
        console.log(error)
      }
    })()

    return () => controller?.abort()
  }, [])

  useEffect(() => {
    if (location !== 'new-blog')
      document.title =
        'F8 - Học Lập Trình Để Đi Làm | F8 trên Youtube | F8 trên Facebook'
  }, [location])

  return (
    <Routes>
      <Route
        path="/login"
        element={!user.isLoggedIn ? <Auth /> : <NotFound />}
      />
      <Route
        path="/register"
        element={!user.isLoggedIn ? <Auth /> : <NotFound />}
      />
      <Route
        path="/learning/:slug"
        element={user.isLoggedIn ? <Learning /> : <Auth />}
      />
      <Route
        path="/my-course"
        element={user.isLoggedIn ? <MyCourse /> : <Auth />}
      />
      <Route
        path="/new-blog"
        element={user.isLoggedIn ? <NewBlog /> : <Auth />}
      />
      <Route
        path="/settings"
        element={user.isLoggedIn ? <Settings /> : <Auth />}
      />
      <Route
        path="/bookmark-post"
        element={user.isLoggedIn ? <BookmarkPost /> : <Auth />}
      />
      <Route
        path="/my-post"
        element={user.isLoggedIn ? <MyBlog /> : <Auth />}
      />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:slug" element={<CourseSlug />} />
      <Route path="/blog/:slug" element={<BlogSlug />} />
      <Route path="/learning-path" element={<LearningPath />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/search" element={<Search />} />
      <Route path="/contact-us" element={<Contact />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/about-us" element={<About />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App

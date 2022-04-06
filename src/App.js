import Blog from './views/public/Blog'
import Courses from './views/public/Courses'
import LearningPath from './views/public/LearningPath'
import Home from './views/public/Home'
import Contact from './views/public/Contact'
import Search from './views/public/Search'
import Privacy from './views/public/Privacy'
import About from './views/public/About'
import Careers from './views/public/Careers'
import Terms from './views/public/Terms'
import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CourseSlug from './components/course/CourseSlug'
import { useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import { setAuth } from './actions/userAction'
import { apiURL } from './context/constants'
import BlogSlug from './components/blog/BlogSlug'
import Auth from './views/public/Auth'
import NotFound from './views/public/NotFound'
import Learning from './views/private/Learning'
import MyCourse from './views/private/MyCourse'
import NewPost from './views/private/NewPost'
import Settings from './views/private/Settings'
import BookmarkPost from './views/private/BookmarkPost'
import MyBlog from './views/private/MyBlog'
import Admin from './views/admin/Admin'

function App() {
  const dispatch = useDispatch()
  const location = useLocation()

  const user = useSelector((state) => state.user)

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
          },
        )

        const data = await res.json()

        dispatch(
          setAuth({
            ...data.user,
            accessToken: token,
          }),
        )
      } catch (error) {
        console.log(error)
      }
    })()

    return () => controller?.abort()
  }, [])

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
        element={user.isLoggedIn ? <NewPost /> : <Auth />}
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
      <Route
        path="/admin"
        element={user.isLoggedIn && user.isAdmin ? <Admin /> : <NotFound />}
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

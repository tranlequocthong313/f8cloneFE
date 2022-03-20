import Auth from './views/Auth'
import Blog from './views/Blog'
import Courses from './views/Courses'
import LearningPath from './views/LearningPath'
import NewBlog from './views/NewBlog'
import Settings from './views/Settings'
import Home from './views/Home'
import Contact from './views/Contact'
import Search from './views/Search'
import Privacy from './views/Privacy'
import About from './views/About'
import Careers from './views/Careers'
import Terms from './views/Terms'
import MyCourse from './views/MyCourse'
import BookmarkPost from './views/BookmarkPost'
import Learning from './views/Learning'
import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from './firebase/config'
import { login } from './actions/userAction'
import CourseSlug from './components/coursepage/CourseSlug'
import { useLocation } from 'react-router-dom'
import NotFound from './views/NotFound'
import Cookies from 'js-cookie'
import { setAuth } from './actions/userAction'
import { apiURL } from './context/constants'
import BlogSlug from './components/blogpage/BlogSlug'

function App() {
  console.log('NODE_ENV: ', process.env.NODE_ENV)
  const dispatch = useDispatch()
  const location = useLocation()

  const user = useSelector(state => state.user)

  useEffect(() => {
    const getUserHandler = async () => {
      const token = Cookies.get('token')

      try {
        if (!token) return

        const res = await fetch(`${apiURL}/api/auth`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await res.json()
        const obj = {
          ...data.user,
          admin: data.admin,
        }
        console.log(obj)

        if (data.user) {
          dispatch(setAuth(obj))
        }
      } catch (error) {
        console.log(error)
      }
    }

    getUserHandler()
  }, [dispatch])

  useEffect(() => {
    const unregisterAuthObserver = onAuthStateChanged(auth, async user => {
      if (user) {
        dispatch(login(user))
      }
    })

    return () => {
      unregisterAuthObserver()
    }
  }, [])

  // Set title of browser again after using 'Write Blog Page'
  useEffect(() => {
    if (location !== 'new-blog') {
      document.title = 'Thong Ahuhu'
    }
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
        path="/learning"
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
        path="/me/bookmark/posts"
        element={user.isLoggedIn ? <BookmarkPost /> : <Auth />}
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

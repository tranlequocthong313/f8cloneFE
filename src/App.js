import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import { setAuth } from './actions/userAction'
import NewPost from './views/private/NewPost'
import Auth from './views/public/Auth'
import Home from './views/public/Home'
import NotFound from './views/public/NotFound'
import Learning from './views/private/Learning'
import MyCourse from './views/private/MyCourse'
import EditPost from './views/private/EditPost'
import BookmarkPost from './views/private/BookmarkPost'
import Settings from './views/private/Settings'
import MyBlog from './views/private/MyBlog'
import Admin from './views/admin/Admin'
import Courses from './views/public/Courses'
import CourseSlug from './components/course/CourseSlug'
import BlogSlug from './components/blog/BlogSlug'
import LearningPath from './views/public/LearningPath'
import Blog from './views/public/Blog'
import BlogTag from './views/public/BlogTag'
import Search from './views/public/Search'
import Contact from './views/public/Contact'
import Privacy from './views/public/Privacy'
import Terms from './views/public/Terms'
import Careers from './views/public/Careers'
import About from './views/public/About'

function App() {
  const dispatch = useDispatch()
  const location = useLocation()
  const user = useSelector((state) => state.user)

  useEffect(() => window.scrollTo(0, 0), [location.pathname])

  useEffect(() => {
    ;(async () => {
      const userData = Cookies.get('userData')
      if (!userData) return

      dispatch(setAuth(JSON.parse(userData)))
    })()
  }, [dispatch])

  useEffect(() => {
    console.log(
      '%cHello! 🙋',
      'font-size: 16px; font-weight: 600; color: #32c6a1'
    )
    console.log(
      '%cF8 front-end was built with Javascript, React, Redux, SASS, CSS module, webpack, and lots of love. \n \nF8 back-end was built with PHP, Laravel, Node, ExpressJS, MySQL, MongoDB, Redis, and lots of love. \n  \n👉 Want to work with us? Check out https://fullstack.edu.vn/careers/',
      'font-size: 14px; font-weight: 500; color: #32c6a1'
    )
  }, [])

  let routes
  if (user.isLoggedIn && user.isAdmin) {
    routes = (
      <>
        <Switch>
          <Route path="/admin/course" exact>
            <Admin />
          </Route>
          <Route path="/admin/blog" exact>
            <Admin />
          </Route>
          <Route path="/admin/video" exact>
            <Admin />
          </Route>
          <Route path="/new-post" exact>
            <NewPost />
          </Route>
          <Route path="/login" exact>
            <NotFound />
          </Route>
          <Route path="/register" exact>
            <NotFound />
          </Route>
          <Route path="/learning/:slug" exact>
            <Learning />
          </Route>
          <Route path="/my-course" exact>
            <MyCourse />
          </Route>
          <Route path="/new-post" exact>
            <NewPost />
          </Route>
          <Route path="/new-post/:id" exact>
            <NewPost />
          </Route>
          <Route path="/edit-post/:id">
            <EditPost />
          </Route>
          <Route path="/settings" exact>
            <Settings />
          </Route>
          <Route path="/bookmark-post" exact>
            <BookmarkPost />
          </Route>
          <Route path="/my-post/published" exact>
            <MyBlog />
          </Route>
          <Route path="/courses" exact>
            <Courses />
          </Route>
          <Route path="/courses/:slug" exact>
            <CourseSlug />
          </Route>
          <Route path="/blog/:id" exact>
            <BlogSlug />
          </Route>
          <Route path="/learning-path" exact>
            <LearningPath />
          </Route>
          <Route path="/blog">
            <Blog />
          </Route>
          <Route path="/blog/tag/:tag" exact>
            <BlogTag />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/Search/course" exact>
            <Search />
          </Route>
          <Route path="/search/blog" exact>
            <Search />
          </Route>
          <Route path="/search/video" exact>
            <Search />
          </Route>
          <Route path="/contact-us" exact>
            <Contact />
          </Route>
          <Route path="/privacy" exact>
            <Privacy />
          </Route>
          <Route path="/terms" exact>
            <Terms />
          </Route>
          <Route path="/careers" exact>
            <Careers />
          </Route>
          <Route path="/about-us" exact>
            <About />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="*" exact>
            <NotFound />
          </Route>
        </Switch>
      </>
    )
  } else if (user.isLoggedIn) {
    routes = (
      <>
        <Switch>
          <Route path="/new-post" exact>
            <NewPost />
          </Route>
          <Route path="/login" exact>
            <NotFound />
          </Route>
          <Route path="/register" exact>
            <NotFound />
          </Route>
          <Route path="/learning/:slug" exact>
            <Learning />
          </Route>
          <Route path="/my-course" exact>
            <MyCourse />
          </Route>
          <Route path="/new-post" exact>
            <NewPost />
          </Route>
          <Route path="/new-post/:id" exact>
            <NewPost />
          </Route>
          <Route path="/edit-post/:id">
            <EditPost />
          </Route>
          <Route path="/settings" exact>
            <Settings />
          </Route>
          <Route path="/bookmark-post" exact>
            <BookmarkPost />
          </Route>
          <Route path="/my-post/published" exact>
            <MyBlog />
          </Route>
          <Route path="/courses" exact>
            <Courses />
          </Route>
          <Route path="/courses/:slug" exact>
            <CourseSlug />
          </Route>
          <Route path="/blog/:id" exact>
            <BlogSlug />
          </Route>
          <Route path="/learning-path" exact>
            <LearningPath />
          </Route>
          <Route path="/blog">
            <Blog />
          </Route>
          <Route path="/blog/tag/:tag" exact>
            <BlogTag />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/Search/course" exact>
            <Search />
          </Route>
          <Route path="/search/blog" exact>
            <Search />
          </Route>
          <Route path="/search/video" exact>
            <Search />
          </Route>
          <Route path="/contact-us" exact>
            <Contact />
          </Route>
          <Route path="/privacy" exact>
            <Privacy />
          </Route>
          <Route path="/terms" exact>
            <Terms />
          </Route>
          <Route path="/careers" exact>
            <Careers />
          </Route>
          <Route path="/about-us" exact>
            <About />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="*" exact>
            <NotFound />
          </Route>
        </Switch>
      </>
    )
  } else {
    routes = (
      <>
        <Switch>
          <Route path="/login" exact>
            <Auth />
          </Route>
          <Route path="/register" exact>
            <Auth />
          </Route>
          <Route path="/courses" exact>
            <Courses />
          </Route>
          <Route path="/courses/:slug" exact>
            <CourseSlug />
          </Route>
          <Route path="/blog/:id" exact>
            <BlogSlug />
          </Route>
          <Route path="/learning-path" exact>
            <LearningPath />
          </Route>
          <Route path="/blog">
            <Blog />
          </Route>
          <Route path="/blog/tag/:tag" exact>
            <BlogTag />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/search/course" exact>
            <Search />
          </Route>
          <Route path="/search/blog" exact>
            <Search />
          </Route>
          <Route path="/search/video" exact>
            <Search />
          </Route>
          <Route path="/contact-us" exact>
            <Contact />
          </Route>
          <Route path="/privacy" exact>
            <Privacy />
          </Route>
          <Route path="/terms" exact>
            <Terms />
          </Route>
          <Route path="/careers" exact>
            <Careers />
          </Route>
          <Route path="/about-us" exact>
            <About />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="*" exact>
            <NotFound />
          </Route>
          <Redirect to="/login" />
        </Switch>
      </>
    )
  }

  return routes
}

export default App

import Blog from '../../../views/public/Blog'
import Courses from '../../../views/public/Courses'
import LearningPath from '../../../views/public/LearningPath'
import Home from '../../../views/public/Home'
import Contact from '../../../views/public/Contact'
import Search from '../../../views/public/Search'
import Privacy from '../../../views/public/Privacy'
import About from '../../../views/public/About'
import Careers from '../../../views/public/Careers'
import Terms from '../../../views/public/Terms'
import { Route, Redirect, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CourseSlug from '../../../components/course/CourseSlug'
import BlogSlug from '../../../components/blog/BlogSlug'
import Auth from '../../../views/public/Auth'
import NotFound from '../../../views/public/NotFound'
import Learning from '../../../views/private/Learning'
import MyCourse from '../../../views/private/MyCourse'
import NewPost from '../../../views/private/NewPost'
import Settings from '../../../views/private/Settings'
import BookmarkPost from '../../../views/private/BookmarkPost'
import MyBlog from '../../../views/private/MyBlog'
import Admin from '../../../views/admin/Admin'
import EditPost from '../../../views/private/EditPost'
import BlogTag from '../../../views/public/BlogTag'
import Profile from '../../../views/public/Profile'
import { BrowserRouter as Router } from 'react-router-dom'

const MainRouter = ({ token }) => {
  const user = useSelector((state) => state.user)

  const routes = () => {
    let routes
    if (user.isLoggedIn) {
      routes = (
        <>
          <Switch>
            <Route path="/login" exact>
              <Auth />
            </Route>
            <Route path="/register" exact>
              <Auth />
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
            <Route path="/edit-post/:slug">
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
            <Route path="/admin/course" exact>
              <Admin />
            </Route>
            <Route path="/admin/blog" exact>
              <Admin />
            </Route>
            <Route path="/admin/video" exact>
              <Admin />
            </Route>
            <Redirect to="/auth" />
          </Switch>
        </>
      )
    } else {
      routes = (
        <>
          <Switch>
            <Route path="/courses" exact>
              <Courses />
            </Route>
            <Route path="/courses/:slug" exact>
              <CourseSlug />
            </Route>
            <Route path="/blog/:slug" exact>
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
            <Route path="/:userSlug" exact>
              <Profile />
            </Route>
            <Route path="*" exact>
              <NotFound />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </>
      )
    }
    return routes
  }

  return routes()
}

export default MainRouter

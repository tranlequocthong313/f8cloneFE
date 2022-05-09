import NewPost from '../views/private/NewPost'
import Auth from '../views/public/Auth'
import Home from '../views/public/Home'
import Lesson from '../views/private/Lesson'
import MyCourse from '../views/private/MyCourse'
import EditPost from '../views/private/EditPost'
import BookmarkPost from '../views/private/BookmarkPost'
import Settings from '../views/private/Settings'
import MyBlog from '../views/private/MyBlog'
import Admin from '../views/console/Admin'
import AdminCreateCourse from '../views/console/AdminCreateCourse'
import AdminEditCourse from '../views/console/AdminEditCourse'
import Courses from '../views/public/Courses'
import LearningPath from '../views/public/LearningPath'
import Blog from '../views/public/Blog'
import BlogTag from '../views/public/BlogTag'
import Search from '../views/public/Search'
import Contact from '../views/public/Contact'
import Privacy from '../views/public/Privacy'
import Terms from '../views/public/Terms'
import Careers from '../views/public/Careers'
import About from '../views/public/About'
import AdminLesson from '../views/console/AdminLesson'
import BlogSlug from '../views/public/BlogSlug'
import CourseSlug from '../views/public/CourseSlug'
import HideSidebar from '../components/layout/hide-sidebar/HideSidebar'
import HeaderOnly from '../components/layout/header-only/HeaderOnly'

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/learning-path', component: LearningPath },
  { path: '/courses', component: Courses },
  { path: '/courses/:courseId', component: CourseSlug },
  { path: '/blog', component: Blog },
  { path: '/blog/:id', component: BlogSlug, layout: HideSidebar },
  { path: '/blog/tag/:tag', component: BlogTag },
  { path: '/search', component: Search },
  { path: '/search/blog', component: Search },
  { path: '/search/video', component: Search },
  { path: '/search/course', component: Search },
  { path: '/terms', component: Terms },
  { path: '/careers', component: Careers },
  { path: '/privacy', component: Privacy },
  { path: '/about-us', component: About, layout: null },
  { path: '/contact-us', component: Contact },
]

const privateRoutes = [
  { path: '/settings', component: Settings, layout: HeaderOnly },
  { path: '/my-course', component: MyCourse },
  { path: '/my-post/published', component: MyBlog },
  { path: '/new-post/', component: NewPost, layout: HeaderOnly },
  { path: '/edit-post/:id', component: EditPost, layout: null },
  { path: '/bookmark-post', component: BookmarkPost },
  { path: '/lesson/:courseId', component: Lesson, layout: null },
]

const adminRoutes = [
  { path: '/admin/blog', component: Admin, layout: HeaderOnly },
  { path: '/admin/video', component: Admin, layout: HeaderOnly },
  { path: '/admin/course', component: Admin, layout: HeaderOnly },
  {
    path: '/admin/create-course',
    component: AdminCreateCourse,
    layout: HeaderOnly,
  },
  {
    path: '/admin/lessons/:courseId',
    component: AdminLesson,
    layout: null,
  },
  {
    path: '/admin/edit-course/:courseId',
    component: AdminEditCourse,
    layout: HeaderOnly,
  },
]

const authRoutes = [
  { path: '/login', component: Auth, layout: null },
  { path: '/register', component: Auth, layout: null },
]

export { publicRoutes, privateRoutes, adminRoutes, authRoutes }

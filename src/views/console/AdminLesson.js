import { useEffect, useState } from 'react'
import styles from './AdminLesson.module.scss'
import LessonTrack from '../../components/lesson/LessonTrack'
import AdminHeader from '../../components/admin/header/AdminHeader'
import AdminTrack from '../../components/admin/track/AdminTrack'
import { apiURL } from '../../context/constants'
import { useLocation } from 'react-router-dom'
import consoleLog from '../../components/utils/console-log/consoleLog'
import Loading from '../../components/utils/loading/Loading'
import Tabs from '../../components/utils/tabs/Tabs'
import AdminLessonConsole from '../../components/admin/console/AdminLessonConsole'
import { Col, Row } from 'react-bootstrap'

const AdminLesson = () => {
  const location = useLocation()
  const courseId = location.pathname.split('/admin/lessons/')[1]

  const [courseTitle, setCourseTitle] = useState('')
  const [episodes, setEpisodes] = useState([
    {
      _id: Math.random(),
      title: 'Khái niệm kỹ thuật cần biết',
      lessons: [
        {
          _id: Math.random(),
          learned: true,
          videoId: 'M62l1xA5Eu8',
          title: 'Domain là gì? Tên miền là gì?',
          time: '10:34',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: 'M62l1xA5Eu8',
          title: 'Domain là gì? Tên miền là gì?',
          time: '10:34',
        },
      ],
    },
    {
      _id: Math.random(),
      title: 'Môi trường, con người IT',
      lessons: [
        {
          _id: Math.random(),
          learned: false,
          videoId: 'CyZ_O7v62h4',
          title:
            'Học IT cần tố chất gì? Góc nhìn khác từ chuyên gia định hướng giáo dục',
          time: '24:10',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: 'YH-E4Y3EaT4',
          title: 'Sinh viên IT đi thực tập tại doanh nghiệp cần biết những gì?',
          time: '34:51',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: '2sg1yNl1WvE',
          title:
            'Chọn ngành IT có sai lầm? Những trải nghiệm thực tế sau 2 tháng làm việc tại doanh nghiệp?',
          time: '47:12',
        },
      ],
    },
    {
      _id: Math.random(),
      title: 'Môi trường, con người IT',
      lessons: [
        {
          _id: Math.random(),
          learned: false,
          videoId: 'CyZ_O7v62h4',
          title:
            'Học IT cần tố chất gì? Góc nhìn khác từ chuyên gia định hướng giáo dục',
          time: '24:10',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: 'YH-E4Y3EaT4',
          title: 'Sinh viên IT đi thực tập tại doanh nghiệp cần biết những gì?',
          time: '34:51',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: '2sg1yNl1WvE',
          title:
            'Chọn ngành IT có sai lầm? Những trải nghiệm thực tế sau 2 tháng làm việc tại doanh nghiệp?',
          time: '47:12',
        },
      ],
    },
    {
      _id: Math.random(),
      title: 'Môi trường, con người IT',
      lessons: [
        {
          _id: Math.random(),
          learned: false,
          videoId: 'CyZ_O7v62h4',
          title:
            'Học IT cần tố chất gì? Góc nhìn khác từ chuyên gia định hướng giáo dục',
          time: '24:10',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: 'YH-E4Y3EaT4',
          title: 'Sinh viên IT đi thực tập tại doanh nghiệp cần biết những gì?',
          time: '34:51',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: '2sg1yNl1WvE',
          title:
            'Chọn ngành IT có sai lầm? Những trải nghiệm thực tế sau 2 tháng làm việc tại doanh nghiệp?',
          time: '47:12',
        },
      ],
    },
    {
      _id: Math.random(),
      title: 'Môi trường, con người IT',
      lessons: [
        {
          _id: Math.random(),
          learned: false,
          videoId: 'CyZ_O7v62h4',
          title:
            'Học IT cần tố chất gì? Góc nhìn khác từ chuyên gia định hướng giáo dục',
          time: '24:10',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: 'YH-E4Y3EaT4',
          title: 'Sinh viên IT đi thực tập tại doanh nghiệp cần biết những gì?',
          time: '34:51',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: '2sg1yNl1WvE',
          title:
            'Chọn ngành IT có sai lầm? Những trải nghiệm thực tế sau 2 tháng làm việc tại doanh nghiệp?',
          time: '47:12',
        },
      ],
    },
    {
      _id: Math.random(),
      title: 'Môi trường, con người IT',
      lessons: [
        {
          _id: Math.random(),
          learned: false,
          videoId: 'CyZ_O7v62h4',
          title:
            'Học IT cần tố chất gì? Góc nhìn khác từ chuyên gia định hướng giáo dục',
          time: '24:10',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: 'YH-E4Y3EaT4',
          title: 'Sinh viên IT đi thực tập tại doanh nghiệp cần biết những gì?',
          time: '34:51',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: '2sg1yNl1WvE',
          title:
            'Chọn ngành IT có sai lầm? Những trải nghiệm thực tế sau 2 tháng làm việc tại doanh nghiệp?',
          time: '47:12',
        },
      ],
    },
    {
      _id: Math.random(),
      title: 'Môi trường, con người IT',
      lessons: [
        {
          _id: Math.random(),
          learned: false,
          videoId: 'CyZ_O7v62h4',
          title:
            'Học IT cần tố chất gì? Góc nhìn khác từ chuyên gia định hướng giáo dục',
          time: '24:10',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: 'YH-E4Y3EaT4',
          title: 'Sinh viên IT đi thực tập tại doanh nghiệp cần biết những gì?',
          time: '34:51',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: '2sg1yNl1WvE',
          title:
            'Chọn ngành IT có sai lầm? Những trải nghiệm thực tế sau 2 tháng làm việc tại doanh nghiệp?',
          time: '47:12',
        },
      ],
    },
    {
      _id: Math.random(),
      title: 'Môi trường, con người IT',
      lessons: [
        {
          _id: Math.random(),
          learned: false,
          videoId: 'CyZ_O7v62h4',
          title:
            'Học IT cần tố chất gì? Góc nhìn khác từ chuyên gia định hướng giáo dục',
          time: '24:10',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: 'YH-E4Y3EaT4',
          title: 'Sinh viên IT đi thực tập tại doanh nghiệp cần biết những gì?',
          time: '34:51',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: '2sg1yNl1WvE',
          title:
            'Chọn ngành IT có sai lầm? Những trải nghiệm thực tế sau 2 tháng làm việc tại doanh nghiệp?',
          time: '47:12',
        },
      ],
    },
    {
      _id: Math.random(),
      title: 'Môi trường, con người IT',
      lessons: [
        {
          _id: Math.random(),
          learned: false,
          videoId: 'CyZ_O7v62h4',
          title:
            'Học IT cần tố chất gì? Góc nhìn khác từ chuyên gia định hướng giáo dục',
          time: '24:10',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: 'YH-E4Y3EaT4',
          title: 'Sinh viên IT đi thực tập tại doanh nghiệp cần biết những gì?',
          time: '34:51',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: '2sg1yNl1WvE',
          title:
            'Chọn ngành IT có sai lầm? Những trải nghiệm thực tế sau 2 tháng làm việc tại doanh nghiệp?',
          time: '47:12',
        },
      ],
    },
    {
      _id: Math.random(),
      title: 'Môi trường, con người IT',
      lessons: [
        {
          _id: Math.random(),
          learned: false,
          videoId: 'CyZ_O7v62h4',
          title:
            'Học IT cần tố chất gì? Góc nhìn khác từ chuyên gia định hướng giáo dục',
          time: '24:10',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: 'YH-E4Y3EaT4',
          title: 'Sinh viên IT đi thực tập tại doanh nghiệp cần biết những gì?',
          time: '34:51',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: '2sg1yNl1WvE',
          title:
            'Chọn ngành IT có sai lầm? Những trải nghiệm thực tế sau 2 tháng làm việc tại doanh nghiệp?',
          time: '47:12',
        },
      ],
    },
    {
      _id: Math.random(),
      title: 'Môi trường, con người IT',
      lessons: [
        {
          _id: Math.random(),
          learned: false,
          videoId: 'CyZ_O7v62h4',
          title:
            'Học IT cần tố chất gì? Góc nhìn khác từ chuyên gia định hướng giáo dục',
          time: '24:10',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: 'YH-E4Y3EaT4',
          title: 'Sinh viên IT đi thực tập tại doanh nghiệp cần biết những gì?',
          time: '34:51',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: '2sg1yNl1WvE',
          title:
            'Chọn ngành IT có sai lầm? Những trải nghiệm thực tế sau 2 tháng làm việc tại doanh nghiệp?',
          time: '47:12',
        },
      ],
    },
    {
      _id: Math.random(),
      title: 'Môi trường, con người IT',
      lessons: [
        {
          _id: Math.random(),
          learned: false,
          videoId: 'CyZ_O7v62h4',
          title:
            'Học IT cần tố chất gì? Góc nhìn khác từ chuyên gia định hướng giáo dục',
          time: '24:10',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: 'YH-E4Y3EaT4',
          title: 'Sinh viên IT đi thực tập tại doanh nghiệp cần biết những gì?',
          time: '34:51',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: '2sg1yNl1WvE',
          title:
            'Chọn ngành IT có sai lầm? Những trải nghiệm thực tế sau 2 tháng làm việc tại doanh nghiệp?',
          time: '47:12',
        },
      ],
    },
    {
      _id: Math.random(),
      title: 'Môi trường, con người IT',
      lessons: [
        {
          _id: Math.random(),
          learned: false,
          videoId: 'CyZ_O7v62h4',
          title:
            'Học IT cần tố chất gì? Góc nhìn khác từ chuyên gia định hướng giáo dục',
          time: '24:10',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: 'YH-E4Y3EaT4',
          title: 'Sinh viên IT đi thực tập tại doanh nghiệp cần biết những gì?',
          time: '34:51',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: '2sg1yNl1WvE',
          title:
            'Chọn ngành IT có sai lầm? Những trải nghiệm thực tế sau 2 tháng làm việc tại doanh nghiệp?',
          time: '47:12',
        },
      ],
    },
    {
      _id: Math.random(),
      title: 'Môi trường, con người IT',
      lessons: [
        {
          _id: Math.random(),
          learned: false,
          videoId: 'CyZ_O7v62h4',
          title:
            'Học IT cần tố chất gì? Góc nhìn khác từ chuyên gia định hướng giáo dục',
          time: '24:10',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: 'YH-E4Y3EaT4',
          title: 'Sinh viên IT đi thực tập tại doanh nghiệp cần biết những gì?',
          time: '34:51',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: '2sg1yNl1WvE',
          title:
            'Chọn ngành IT có sai lầm? Những trải nghiệm thực tế sau 2 tháng làm việc tại doanh nghiệp?',
          time: '47:12',
        },
      ],
    },
    {
      _id: Math.random(),
      title: 'Môi trường, con người IT',
      lessons: [
        {
          _id: Math.random(),
          learned: false,
          videoId: 'CyZ_O7v62h4',
          title:
            'Học IT cần tố chất gì? Góc nhìn khác từ chuyên gia định hướng giáo dục',
          time: '24:10',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: 'YH-E4Y3EaT4',
          title: 'Sinh viên IT đi thực tập tại doanh nghiệp cần biết những gì?',
          time: '34:51',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: '2sg1yNl1WvE',
          title:
            'Chọn ngành IT có sai lầm? Những trải nghiệm thực tế sau 2 tháng làm việc tại doanh nghiệp?',
          time: '47:12',
        },
      ],
    },
    {
      _id: Math.random(),
      title: 'Môi trường, con người IT',
      lessons: [
        {
          _id: Math.random(),
          learned: false,
          videoId: 'CyZ_O7v62h4',
          title:
            'Học IT cần tố chất gì? Góc nhìn khác từ chuyên gia định hướng giáo dục',
          time: '24:10',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: 'YH-E4Y3EaT4',
          title: 'Sinh viên IT đi thực tập tại doanh nghiệp cần biết những gì?',
          time: '34:51',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: '2sg1yNl1WvE',
          title:
            'Chọn ngành IT có sai lầm? Những trải nghiệm thực tế sau 2 tháng làm việc tại doanh nghiệp?',
          time: '47:12',
        },
      ],
    },
    {
      _id: Math.random(),
      title: 'Môi trường, con người IT',
      lessons: [
        {
          _id: Math.random(),
          learned: false,
          videoId: 'CyZ_O7v62h4',
          title:
            'Học IT cần tố chất gì? Góc nhìn khác từ chuyên gia định hướng giáo dục',
          time: '24:10',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: 'YH-E4Y3EaT4',
          title: 'Sinh viên IT đi thực tập tại doanh nghiệp cần biết những gì?',
          time: '34:51',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: '2sg1yNl1WvE',
          title:
            'Chọn ngành IT có sai lầm? Những trải nghiệm thực tế sau 2 tháng làm việc tại doanh nghiệp?',
          time: '47:12',
        },
      ],
    },
    {
      _id: Math.random(),
      title: 'Môi trường, con người IT',
      lessons: [
        {
          _id: Math.random(),
          learned: false,
          videoId: 'CyZ_O7v62h4',
          title:
            'Học IT cần tố chất gì? Góc nhìn khác từ chuyên gia định hướng giáo dục',
          time: '24:10',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: 'YH-E4Y3EaT4',
          title: 'Sinh viên IT đi thực tập tại doanh nghiệp cần biết những gì?',
          time: '34:51',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: '2sg1yNl1WvE',
          title:
            'Chọn ngành IT có sai lầm? Những trải nghiệm thực tế sau 2 tháng làm việc tại doanh nghiệp?',
          time: '47:12',
        },
      ],
    },
    {
      _id: Math.random(),
      title: 'Môi trường, con người IT',
      lessons: [
        {
          _id: Math.random(),
          learned: false,
          videoId: 'CyZ_O7v62h4',
          title:
            'Học IT cần tố chất gì? Góc nhìn khác từ chuyên gia định hướng giáo dục',
          time: '24:10',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: 'YH-E4Y3EaT4',
          title: 'Sinh viên IT đi thực tập tại doanh nghiệp cần biết những gì?',
          time: '34:51',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: '2sg1yNl1WvE',
          title:
            'Chọn ngành IT có sai lầm? Những trải nghiệm thực tế sau 2 tháng làm việc tại doanh nghiệp?',
          time: '47:12',
        },
      ],
    },
    {
      _id: Math.random(),
      title: 'Môi trường, con người IT',
      lessons: [
        {
          _id: Math.random(),
          learned: false,
          videoId: 'CyZ_O7v62h4',
          title:
            'Học IT cần tố chất gì? Góc nhìn khác từ chuyên gia định hướng giáo dục',
          time: '24:10',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: 'YH-E4Y3EaT4',
          title: 'Sinh viên IT đi thực tập tại doanh nghiệp cần biết những gì?',
          time: '34:51',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: '2sg1yNl1WvE',
          title:
            'Chọn ngành IT có sai lầm? Những trải nghiệm thực tế sau 2 tháng làm việc tại doanh nghiệp?',
          time: '47:12',
        },
      ],
    },
    {
      _id: Math.random(),
      title: 'Môi trường, con người IT',
      lessons: [
        {
          _id: Math.random(),
          learned: false,
          videoId: 'CyZ_O7v62h4',
          title:
            'Học IT cần tố chất gì? Góc nhìn khác từ chuyên gia định hướng giáo dục',
          time: '24:10',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: 'YH-E4Y3EaT4',
          title: 'Sinh viên IT đi thực tập tại doanh nghiệp cần biết những gì?',
          time: '34:51',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: '2sg1yNl1WvE',
          title:
            'Chọn ngành IT có sai lầm? Những trải nghiệm thực tế sau 2 tháng làm việc tại doanh nghiệp?',
          time: '47:12',
        },
      ],
    },
    {
      _id: Math.random(),
      title: 'Môi trường, con người IT',
      lessons: [
        {
          _id: Math.random(),
          learned: false,
          videoId: 'CyZ_O7v62h4',
          title:
            'Học IT cần tố chất gì? Góc nhìn khác từ chuyên gia định hướng giáo dục',
          time: '24:10',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: 'YH-E4Y3EaT4',
          title: 'Sinh viên IT đi thực tập tại doanh nghiệp cần biết những gì?',
          time: '34:51',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: '2sg1yNl1WvE',
          title:
            'Chọn ngành IT có sai lầm? Những trải nghiệm thực tế sau 2 tháng làm việc tại doanh nghiệp?',
          time: '47:12',
        },
      ],
    },
    {
      _id: Math.random(),
      title: 'Môi trường, con người IT',
      lessons: [
        {
          _id: Math.random(),
          learned: false,
          videoId: 'CyZ_O7v62h4',
          title:
            'Học IT cần tố chất gì? Góc nhìn khác từ chuyên gia định hướng giáo dục',
          time: '24:10',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: 'YH-E4Y3EaT4',
          title: 'Sinh viên IT đi thực tập tại doanh nghiệp cần biết những gì?',
          time: '34:51',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: '2sg1yNl1WvE',
          title:
            'Chọn ngành IT có sai lầm? Những trải nghiệm thực tế sau 2 tháng làm việc tại doanh nghiệp?',
          time: '47:12',
        },
      ],
    },
    {
      _id: Math.random(),
      title: 'Môi trường, con người IT',
      lessons: [
        {
          _id: Math.random(),
          learned: false,
          videoId: 'CyZ_O7v62h4',
          title:
            'Học IT cần tố chất gì? Góc nhìn khác từ chuyên gia định hướng giáo dục',
          time: '24:10',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: 'YH-E4Y3EaT4',
          title: 'Sinh viên IT đi thực tập tại doanh nghiệp cần biết những gì?',
          time: '34:51',
        },
        {
          _id: Math.random(),
          learned: false,
          videoId: '2sg1yNl1WvE',
          title:
            'Chọn ngành IT có sai lầm? Những trải nghiệm thực tế sau 2 tháng làm việc tại doanh nghiệp?',
          time: '47:12',
        },
      ],
    },
  ])
  const [loading, setLoading] = useState(true)

  useEffect(() => (document.title = 'Thiết kế bài học'), [])

  useEffect(() => {
    ;(async () => {
      setLoading(true)

      const url = `${apiURL}/courses/${courseId}/lessons`
      const data = await getCourseById(url)

      if (data) {
        setCourseTitle(data.title)
        // setEpisodes(data.episodes)
        setLoading(false)
      }
    })()
  }, [courseId])

  const getCourseById = async (url) => {
    try {
      return (await fetch(url)).json()
    } catch (error) {
      consoleLog(error.message)
    }
  }

  return loading ? (
    <Loading />
  ) : (
    <>
      <AdminHeader />
      <Row style={{ marginTop: 50, flex: '1 1' }}>
        <Col xl={2}>
          <AdminTrack episodes={episodes} heading={courseTitle} />
        </Col>
        <Col xl={10}>
          <AdminLessonConsole />
        </Col>
      </Row>
    </>
  )
}

export default AdminLesson

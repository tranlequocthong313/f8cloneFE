import { useState, useEffect } from 'react'
import { apiURL } from '../../context/constants'
import CourseList from '../../components/home/courses/CourseList'
import Cookies from 'js-cookie'
import SubLoading from '../../utils/loading/SubLoading'
import consoleLog from '../../utils/console-log/consoleLog'

const MyCourse = () => {
  const [myCourse, setMyCourse] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      setLoading(true)

      const token = Cookies.get('token')
      if (!token) return

      const url = `${apiURL}/me/courses`
      const data = await getCourse(url, token)

      if (data) {
        setMyCourse(data.coursesEnrolled)
        setLoading(false)
      }
    })()
  }, [])

  const getCourse = async (url, token) => {
    try {
      return (
        await fetch(url, {
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
    document.title = 'Thiết lập về tôi tại F8'
  }, [])
  return loading ? (
    <SubLoading />
  ) : (
    <div className="container">
      <div className="containerTop">
        <h2>Khóa học của tôi</h2>
      </div>
      <CourseList courses={myCourse} />
    </div>
  )
}

export default MyCourse

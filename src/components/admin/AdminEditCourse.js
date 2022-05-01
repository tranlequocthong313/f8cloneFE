import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { apiURL } from '../../context/constants'
import MainModal from '../utils/main-modal/MainModal'
import removeActions from '../utils/remove-accents/removeActions'
import Tippy from '../utils/tippy/Tippy'
import styles from './AdminEditCourse.module.scss'

const AdminEditCourse = ({
  showModal,
  courseId,
  setShowModal,
  setCourseData,
  courseForEdit,
}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [videoId, setVideoId] = useState('')
  const [level, setLevel] = useState('')
  const [goalTags, setGoalTags] = useState([])
  const [goalTag, setGoalTag] = useState('')
  const [invalidGoalTag, setInvalidGoalTag] = useState(null)
  const [requireTag, setRequireTag] = useState('')
  const [requireTags, setRequireTags] = useState([])
  const [invalidRequireTag, setInvalidRequireTag] = useState(null)
  const [role, setRole] = useState('')

  useEffect(() => {
    setTitle(courseForEdit.title)
    setDescription(courseForEdit.description)
    setDescription(courseForEdit.description)
    setVideoId(courseForEdit.videoId)
    setRole(courseForEdit.role)
    setLevel(courseForEdit.level)
    setGoalTags(courseForEdit.goals)
    setRequireTags(courseForEdit.requirement)
  }, [courseForEdit])

  const addGoalTag = (e) => {
    const isEnterPressed = e.keyCode === 13
    if (isEnterPressed) {
      const isExistTagAlready = goalTags.includes(goalTag)
      if (isExistTagAlready) return setInvalidGoalTag('Bạn đã thêm thẻ này')

      setInvalidGoalTag(null)
      setGoalTags((prev) => [...prev, goalTag.trim()])
      setGoalTag('')
    }
  }
  const removeGoalTag = (tag) =>
    setGoalTags((prev) => prev.filter((item) => item !== tag))

  const addRequireTag = (e) => {
    const isEnterPressed = e.keyCode === 13
    if (isEnterPressed) {
      const isExistTagAlready = requireTags.includes(requireTag)
      if (isExistTagAlready) return setInvalidRequireTag('Bạn đã thêm thẻ này')

      setInvalidRequireTag(null)
      setRequireTags((prev) => [...prev, requireTag.trim()])
      setRequireTag('')
    }
  }
  const removeRequireTag = (tag) =>
    setRequireTags((prev) => prev.filter((item) => item !== tag))

  const editCourse = async () => {
    const { accessToken } = JSON.parse(Cookies.get('userData'))
    if (!accessToken) return

    const url = `${apiURL}/courses/edit/${courseId}`
    const data = await putEditCourse(url, accessToken)

    console.log(data)
    setCourseData(data)
  }

  const putEditCourse = async (url, token) => {
    try {
      return (
        await fetch(url, {
          method: 'PUT',
          body: JSON.stringify({
            title,
            description,
            videoId,
            image: `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`,
            search: removeActions(title),
            level,
            role,
            goals: goalTags,
            requirement: requireTags,
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      ).json()
    } catch (error) {
      console.log(error.message)
    } finally {
      setTitle('')
      setDescription('')
      setVideoId('')
      setLevel('')
      setRole('')
      setGoalTags([])
      setRequireTags([])
    }
  }

  return (
    <MainModal show={showModal} onHide={setShowModal} centered={true}>
      <div className={styles.wrapper}>
        <h5>Sửa khóa học</h5>
        <Form className={styles.formWrapper}>
          <Form.Group>
            <Form.Control
              className={styles.formInput}
              placeholder="Tiêu đề khóa học"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              row={4}
              className={styles.formInput}
              placeholder="Mô tả khóa học"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              className={styles.formInput}
              placeholder="Video giới thiêu khóa học"
              value={videoId}
              onChange={(e) => setVideoId(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="d-flex">
            <Form.Check
              type={'radio'}
              label={'cơ bản'}
              checked={level === 'cơ bản'}
              className={styles.formBoxItem}
              onChange={() => {
                setLevel('cơ bản')
              }}
            />
            <Form.Check
              type={'radio'}
              label={'trung bình'}
              checked={level === 'trung bình'}
              className={styles.formBoxItem}
              onChange={() => {
                setLevel('trung bình')
              }}
            />
            <Form.Check
              type={'radio'}
              label={'nâng cao'}
              checked={level === 'nâng cao'}
              className={styles.formBoxItem}
              onChange={() => {
                setLevel('nâng cao')
              }}
            />
          </Form.Group>
          <Form.Group className="d-flex">
            <Form.Check
              type={'radio'}
              label={'Front-end'}
              checked={role === 'Front-end'}
              className={styles.formBoxItem}
              onChange={() => {
                setRole('Front-end')
              }}
            />
            <Form.Check
              type={'radio'}
              label={'Back-end'}
              checked={role === 'Back-end'}
              className={styles.formBoxItem}
              onChange={() => {
                setRole('Back-end')
              }}
            />
            <Form.Check
              type={'radio'}
              label={'Fullstack'}
              checked={role === 'Fullstack'}
              className={styles.formBoxItem}
              onChange={() => {
                setRole('Fullstack')
              }}
            />
          </Form.Group>
          <Form.Group
            className={
              invalidGoalTag !== null
                ? `${styles.invalid} ${styles.tagWrapper}`
                : styles.tagWrapper
            }
          >
            {goalTags &&
              goalTags.map((tag) => (
                <div key={tag} tabIndex={1} className={styles.tagCard}>
                  <span>{tag}</span>
                  <div
                    className={styles.removeTagButton}
                    onClick={() => removeGoalTag(tag)}
                  >
                    x
                  </div>
                </div>
              ))}
            <Form.Control
              placeholder="Những mục tiêu đạt được sau khóa học"
              onKeyDown={addGoalTag}
              value={goalTag}
              onChange={(e) => setGoalTag(e.target.value)}
            />
          </Form.Group>
          {invalidGoalTag !== null && (
            <div className={styles.invalidText}>{invalidGoalTag}</div>
          )}
          <Form.Group
            className={
              invalidRequireTag !== null
                ? `${styles.invalid} ${styles.tagWrapper}`
                : styles.tagWrapper
            }
          >
            {requireTags &&
              requireTags.map((tag) => (
                <div key={tag} tabIndex={1} className={styles.tagCard}>
                  <span>{tag}</span>
                  <div
                    className={styles.removeTagButton}
                    onClick={() => removeRequireTag(tag)}
                  >
                    x
                  </div>
                </div>
              ))}
            <Form.Control
              placeholder="Yêu cầu của khóa học (*)"
              onKeyDown={addRequireTag}
              value={requireTag}
              onChange={(e) => setRequireTag(e.target.value)}
            />
          </Form.Group>
          {invalidRequireTag !== null && (
            <div className={styles.invalidText}>{invalidRequireTag}</div>
          )}
          <div className={styles.formSubmit}>
            <div
              className={styles.createButton}
              onClick={() => {
                editCourse()
                setShowModal()
              }}
            >
              Sửa khóa học
            </div>
            <div onClick={setShowModal} className={styles.cancelButton}>
              Hủy
            </div>
          </div>
        </Form>
      </div>
    </MainModal>
  )
}

export default AdminEditCourse

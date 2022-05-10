import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import Cookies from 'js-cookie'
import { useContext, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { apiURL } from '../../context/constants'
import { ModalContext } from '../../context/ModalContext'
import { storage } from '../../firebase/config'
import consoleLog from '../../utils/console-log/consoleLog'
import { removeActions } from '../../utils/format/index'
import styles from './AdminEditCourse.module.scss'
import { useLocation } from 'react-router-dom'
import SubLoading from '../../utils/loading/SubLoading'

const AdminEditCourse = () => {
  const location = useLocation()
  const { onShowError } = useContext(ModalContext)

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
  const [preview, setPreview] = useState(null)
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(true)

  const courseId = location.pathname.split('/admin/edit-course/')[1]

  useEffect(() => {
    ;(async () => {
      setLoading(true)

      const url = `${apiURL}/courses/${courseId}`
      const data = await getCourse(url)

      if (data) {
        setTitle(data.title)
        setDescription(data.description)
        setDescription(data.description)
        setVideoId(data.videoId)
        setRole(data.role)
        setLevel(data.level)
        setGoalTags(data.goals)
        setRequireTags(data.requirement)
        setLoading(false)
      }
    })()
  }, [courseId])

  const getCourse = async (url) => {
    try {
      return (await fetch(url)).json()
    } catch (error) {
      consoleLog(error.message)
    }
  }

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

  const editCourse = async (imageURL) => {
    const url = `${apiURL}/courses/edit/${courseId}`
    await putEditCourse(url, imageURL)
  }

  const putEditCourse = async (url, imageURL) => {
    const token = Cookies.get('token')
    if (!token) return

    try {
      return (
        await fetch(url, {
          method: 'PUT',
          body: JSON.stringify({
            title,
            description,
            videoId,
            image: imageURL
              ? imageURL
              : `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`,
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
      consoleLog(error.message)
      onShowError()
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

  useEffect(() => {
    return () => preview && URL.revokeObjectURL(preview)
  }, [preview])

  const chooseImage = (e) => {
    const image = URL.createObjectURL(e.target.files[0])
    setPreview(image)
    setImage(e.target.files[0])
  }

  const uploadImageToStorage = () => {
    if (!image) return editCourse()

    const storageRef = ref(storage, `uploads/${image.name}`)
    const uploadTask = uploadBytesResumable(storageRef, image)
    uploadTask.on(
      'state_changed',
      () => {},
      (err) => consoleLog(err),
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref)

          editCourse(url)
        } catch (error) {
          consoleLog(error.message)
        }
      }
    )
  }

  return loading ? (
    <SubLoading />
  ) : (
    <>
      <div className={styles.wrapper}>
        <h4>Sửa khóa học</h4>
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
          <Form.Group>
            <Form.Control
              className={styles.formInput}
              onChange={chooseImage}
              type="file"
              accept="image/*"
            />
          </Form.Group>
          <Form.Group className="d-flex">
            <Form.Label>Trình độ: </Form.Label>
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
            <Form.Label>Vai trò: </Form.Label>
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
              placeholder="Yêu cầu của khóa học (tùy chọn)"
              onKeyDown={addRequireTag}
              value={requireTag}
              onChange={(e) => setRequireTag(e.target.value)}
            />
          </Form.Group>
          {invalidRequireTag !== null && (
            <div className={styles.invalidText}>{invalidRequireTag}</div>
          )}
          <div className={styles.formSubmit}>
            <div className={styles.createButton} onClick={uploadImageToStorage}>
              Sửa khóa học
            </div>
          </div>
        </Form>
      </div>
    </>
  )
}

export default AdminEditCourse

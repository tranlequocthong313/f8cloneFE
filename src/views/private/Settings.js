import React, { useState, Suspense, useEffect } from 'react'
import styles from './Settings.module.scss'
import { Container, Row, Col } from 'react-bootstrap'
import Header from '../../components/main-layout/nav/Header'
import { useSelector } from 'react-redux'
import FieldInput from '../../components/utils/field-input/FieldInput'
import Cookies from 'js-cookie'
import { apiURL } from '../../context/constants'
import { useDispatch } from 'react-redux'
import { settings } from '../../actions/userAction'
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage'
import { storage } from '../../firebase/config'
import removeActions from '../../components/utils/remove-accents/removeActions'
import consoleLog from '../../components/utils/console-log/consoleLog'

const Footer = React.lazy(() =>
  import('../../components/main-layout/footer/Footer')
)

const Settings = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const [settingMode, setSettingMode] = useState([])
  const [fullName, setFullName] = useState(user.displayName)
  const [bio, setBio] = useState(user.bio ? user.bio : '')
  const [image, setImage] = useState({
    preview: null,
    avatar: null,
  })
  const [social, setSocial] = useState({
    fb: user.socials.fb ? user.socials.fb : '',
    youtube: user.socials.youtube ? user.socials.youtube : '',
    linkedin: user.socials.linkedin ? user.socials.linkedin : '',
    instagram: user.socials.instagram ? user.socials.instagram : '',
    twitter: user.socials.twitter ? user.socials.twitter : '',
  })

  useEffect(() => (document.title = 'Thiết lập về tôi tại F8'), [])

  const settingModeChosen = (option) => settingMode.includes(option)

  const handleSettingMode = (option) =>
    settingModeChosen(option)
      ? setSettingMode((prev) => prev.filter((item) => item !== option))
      : setSettingMode((prev) => [...prev, option])

  useEffect(() => () => image.preview && URL.revokeObjectURL(image), [image])

  const getNewAvatar = (e) => {
    const image = URL.createObjectURL(e.target.files[0])
    setImage((prev) => {
      return {
        ...prev,
        preview: image,
        avatar: e.target.files[0],
      }
    })
  }

  const changeName = async () => {
    const token = Cookies.get('token')
    if (!token) return

    const url = `${apiURL}/help/setting/fullName`
    const data = await patchFullName(url, token)

    setFullName(data.fullName)
    dispatch(
      settings({
        fullName: data.fullName,
        photoURL: user.photoURL,
      })
    )
  }

  const patchFullName = async (url, token) => {
    try {
      return (
        await fetch(url, {
          method: 'PATCH',
          body: JSON.stringify({ fullName }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      ).json()
    } catch (error) {
      consoleLog(error.message)
    } finally {
      handleSettingMode('name')
    }
  }

  const changeAvatar = () => {
    const token = Cookies.get('token')
    if (!token) return

    if (image.avatar) {
      const storageRef = ref(storage, `uploads/${image.avatar.name}`)
      const uploadTask = uploadBytesResumable(storageRef, image.avatar)

      uploadTask.on(
        'state_changed',
        () => {},
        (err) => console.log(err),
        async () => {
          const photoURL = await getDownloadURL(uploadTask.snapshot.ref)
          const url = `${apiURL}/help/setting/avatar`
          const data = await patchAvatar(url, photoURL, token)
          console.log(data)
          dispatch(
            settings({
              fullName: user.displayName,
              photoURL: data.photoURL,
            })
          )
        }
      )
    }
  }

  const patchAvatar = async (url, photoURL, token) => {
    try {
      return (
        await fetch(url, {
          method: 'PATCH',
          body: JSON.stringify({ photoURL }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      ).json()
    } catch (error) {
      consoleLog(error.message)
    } finally {
      handleSettingMode('avatar')
    }
  }

  const bioChange = async () => {
    const token = Cookies.get('token')
    if (!token) return

    const url = `${apiURL}/help/setting/bio`
    const data = await patchBio(url, token)

    setBio(data.bio)
    dispatch(
      settings({
        fullName: user.displayName,
        photoURL: user.photoURL,
      })
    )
  }

  const patchBio = async (url, token) => {
    try {
      return (
        await fetch(url, {
          method: 'PATCH',
          body: JSON.stringify({ bio }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      ).json()
    } catch (error) {
      consoleLog(error.message)
    } finally {
      handleSettingMode('bio')
    }
  }

  const socialChange = async (socialName) => {
    const token = Cookies.get('token')
    if (!token) return

    const url = `${apiURL}/help/setting/social`
    const data = await patchSocial(url, socialName, token)

    setSocial((prev) => {
      return {
        ...prev,
        fb: data.socials.fb ? data.socials.fb : '',
        youtube: data.socials.youtube ? data.socials.youtube : '',
        linkedin: data.socials.linkedin ? data.socials.linkedin : '',
        instagram: data.socials.instagram ? data.socials.instagram : '',
        twitter: data.socials.twitter ? data.socials.twitter : '',
      }
    })
  }

  const patchSocial = async (url, socialName, token) => {
    try {
      return (
        await fetch(url, {
          method: 'PATCH',
          body: JSON.stringify(social),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      ).json()
    } catch (error) {
      consoleLog(error.message)
    } finally {
      handleSettingMode(socialName)
    }
  }

  return (
    <>
      <Header />
      <Container className={styles.settings}>
        <Row style={{ marginTop: 48 }}>
          <Col sm={12} md={12} lg={9} xl={9}>
            <div className={styles.wrapper}>
              <h3 className={styles.heading}>Cài đặt</h3>
              <div className={styles.container}>
                <div className={styles.userInfo}>
                  <h3>Thông tin cá nhân</h3>
                </div>
                <FieldInput
                  title={'Họ tên'}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  description={
                    'Tên của bạn xuất hiện trên trang cá nhân và bên cạnh các bình luận của bạn.'
                  }
                  placeholder={'Thêm tên của bạn'}
                  maxLength={50}
                  disabled={!settingModeChosen('name')}
                  onShow={() => handleSettingMode('name')}
                  isEditMode={settingModeChosen('name')}
                  onSave={changeName}
                />
                <FieldInput
                  title={'Bio'}
                  onChange={(e) => setBio(e.target.value)}
                  value={bio}
                  description={
                    'Bio hiển thị trên trang cá nhân và trong các bài viết (blog) của bạn.'
                  }
                  placeholder={'Thêm giới thiệu'}
                  maxLength={150}
                  disabled={!settingModeChosen('bio')}
                  onShow={() => handleSettingMode('bio')}
                  isEditMode={settingModeChosen('bio')}
                  onSave={bioChange}
                />
                <FieldInput
                  title={'Avatar'}
                  description={
                    'Nên là ảnh vuông, chấp nhận các tệp: JPG, PNG hoặc GIF.'
                  }
                  photoURL={user.photoURL}
                  preview={image.preview}
                  isImage={true}
                  onFileChange={getNewAvatar}
                  onShow={() => handleSettingMode('avatar')}
                  isEditMode={settingModeChosen('avatar')}
                  onSave={changeAvatar}
                />
                <FieldInput
                  title={'Email'}
                  value={user.email ? user.email : ''}
                  placeholder={'Eg. hoclaptrinh@f8.edu.vn'}
                  isEdit={false}
                  disabled={true}
                />
                <FieldInput
                  title={'User Name'}
                  value={`${removeActions(
                    user.displayName.toLowerCase().replace(/\s/g, '')
                  )}`}
                  placeholder={'Thêm user name'}
                  isEdit={false}
                  disabled={true}
                  description={`URL: https://fullstack.edu.vn/@${removeActions(
                    user.displayName.toLowerCase().replace(/\s/g, '')
                  )}`}
                />
                <FieldInput
                  title={'Số điện thoại'}
                  value={user.phoneNumber}
                  placeholder={'Thêm số điện thoại'}
                  isEdit={false}
                  disabled={true}
                  description={'Điện thoại kết nối với F8.'}
                />
              </div>

              <div className={styles.container}>
                <div className={styles.userInfo}>
                  <h3>Mạng xã hội</h3>
                </div>
                <FieldInput
                  title={'Facebook'}
                  maxLength={150}
                  onChange={(e) =>
                    setSocial((prev) => {
                      return {
                        ...prev,
                        fb: e.target.value,
                      }
                    })
                  }
                  placeholder={'Eg. https://www.facebook.com/hoclaptrinhf8'}
                  disabled={!settingModeChosen('fb')}
                  onShow={() => handleSettingMode('fb')}
                  isEditMode={settingModeChosen('fb')}
                  onSave={() => socialChange('fb')}
                  value={social.fb}
                />
                <FieldInput
                  title={'Youtube'}
                  placeholder={'Eg. https://www.youtube.com/c/F8VNOfficial'}
                  maxLength={150}
                  onChange={(e) =>
                    setSocial((prev) => {
                      return {
                        ...prev,
                        youtube: e.target.value,
                      }
                    })
                  }
                  disabled={!settingModeChosen('youtube')}
                  onShow={() => handleSettingMode('youtube')}
                  isEditMode={settingModeChosen('youtube')}
                  onSave={() => socialChange('youtube')}
                  value={social.youtube}
                />
                <FieldInput
                  title={'Linkedin'}
                  placeholder={'Eg. https://www.linkedin.com/in/hoclaptrinhf8/'}
                  maxLength={150}
                  onChange={(e) =>
                    setSocial((prev) => {
                      return {
                        ...prev,
                        linkedin: e.target.value,
                      }
                    })
                  }
                  disabled={!settingModeChosen('linkedin')}
                  onShow={() => handleSettingMode('linkedin')}
                  isEditMode={settingModeChosen('linkedin')}
                  onSave={() => socialChange('linkedin')}
                  value={social.linkedin}
                />
                <FieldInput
                  title={'Instagram'}
                  placeholder={'Eg. https://www.instagram.com/hoclaptrinhf8/'}
                  maxLength={150}
                  onChange={(e) =>
                    setSocial((prev) => {
                      return {
                        ...prev,
                        instagram: e.target.value,
                      }
                    })
                  }
                  disabled={!settingModeChosen('instagram')}
                  onShow={() => handleSettingMode('instagram')}
                  isEditMode={settingModeChosen('instagram')}
                  onSave={() => socialChange('instagram')}
                  value={social.instagram}
                />
                <FieldInput
                  title={'Twitter'}
                  placeholder={'Eg. https://twitter.com/hoclaptrinhf8'}
                  maxLength={150}
                  onChange={(e) =>
                    setSocial((prev) => {
                      return {
                        ...prev,
                        twitter: e.target.value,
                      }
                    })
                  }
                  disabled={!settingModeChosen('twitter')}
                  onShow={() => handleSettingMode('twitter')}
                  isEditMode={settingModeChosen('twitter')}
                  onSave={() => socialChange('twitter')}
                  value={social.twitter}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </>
  )
}

export default Settings

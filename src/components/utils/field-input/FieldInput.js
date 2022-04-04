import React from 'react'
import styles from './FieldInput.module.scss'
import noPhotoURL from '../../../asset/images/nobody_m.256x256.jpg'

const FieldInput = ({
  title,
  value,
  onChange,
  description,
  placeholder,
  maxLength,
  disabled,
  isEdit = true,
  isImage = false,
  photoURL,
  isEditMode = false,
  onSave,
  onShow,
  onFileChange,
  preview,
}) => {
  return (
    <div className={styles.container}>
      {!isImage && (
        <div className={styles.inputContent}>
          <h3 className={styles.label}>{title}</h3>
          <form className={styles.editForm}>
            <input
              maxLength={maxLength}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              disabled={disabled}
            />
          </form>
          <div className={styles.description}>
            <p>{description}</p>
          </div>
        </div>
      )}

      {isImage && (
        <div className={styles.photoContainer}>
          <h3 className={styles.label}>{title}</h3>
          <div className={styles.photoContent}>
            <div className={styles.description}>{description}</div>
            <form className={styles.photoForm}>
              <div className={styles.avatar} onClick={onShow}>
                <img
                  src={preview ? preview : photoURL ? photoURL : noPhotoURL}
                  alt=""
                />
              </div>
              <label htmlFor="avatar">
                <div
                  className={
                    isEditMode
                      ? `${styles.chooseAvatar} ${styles.active}`
                      : styles.chooseAvatar
                  }
                >
                  <i className="fa-solid fa-camera"></i>
                </div>
                <div className={styles.pickAvatar}>
                  <input
                    type="file"
                    accept="image/*"
                    id="avatar"
                    onChange={onFileChange}
                  />
                </div>
              </label>
            </form>
          </div>
        </div>
      )}

      {isEdit && (
        <>
          {!isEditMode && (
            <div className={styles.editButton}>
              <button onClick={onShow}>Chỉnh sửa</button>
            </div>
          )}
          {isEditMode && (
            <div className={`${styles.editButton} ${styles.editMode}`}>
              <button onClick={onSave} className={styles.saveButton}>
                Lưu
              </button>
              <button onClick={onShow}>Hủy</button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default FieldInput

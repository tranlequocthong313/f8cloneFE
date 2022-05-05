import React from 'react'
import { NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styles from './NewBlogButton.module.scss'
import Tippy from '../../../utils/tippy/Tippy'

const NewBlogButton = () => {
  return (
    <Tippy
      button={<i className={`${styles.newBlogIcon} fa-regular fa-plus`}></i>}
      className={styles.wrapper}
    >
      <Link to="/new-post">
        <i className="fa-solid fa-pen"></i>
        <span>Viết blog</span>
      </Link>
    </Tippy>
  )
}

export default NewBlogButton

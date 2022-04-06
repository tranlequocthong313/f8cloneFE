import React from 'react'
import { Dropdown } from 'react-bootstrap'
import styles from './Tippy.module.scss'

const Tippy = ({ button, children, className }) => {
  const CustomToggle = React.forwardRef(({ onClick }, ref) => (
    <div
      onClick={(e) => {
        e.preventDefault()
        onClick(e)
      }}
    >
      {button}
    </div>
  ))

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} />

      <Dropdown.Menu className={`${styles.tippy} ${className}`}>
        {children}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default Tippy

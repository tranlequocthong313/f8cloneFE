import React, { useState, useEffect } from 'react'
import { Offcanvas } from 'react-bootstrap'
import styles from './VerticalModal.module.scss'
import '../../../sass/_offCanvas.scss'

const VerticalModal = ({
  button,
  buttonStyle,
  className,
  hideOnComputer,
  placement,
  header,
  closeButton,
  children,
}) => {
  const [show, setShow] = useState(false)

  const handleShow = () => setShow((prev) => !prev)

  useEffect(() => {
    const resize = () => {
      const isWidthGreaterThanOrEqual1024px = window.innerWidth >= 1024
      if (isWidthGreaterThanOrEqual1024px) return setShow(false)
    }
    hideOnComputer && window.addEventListener('resize', resize)

    return () => window.removeEventListener('resize', resize)
  }, [hideOnComputer])

  return (
    <>
      <div onClick={handleShow} className={buttonStyle}>
        {button}
      </div>

      <Offcanvas
        show={show}
        onHide={handleShow}
        className={`${styles.wrapper} ${className}`}
        placement={placement}
        name={placement}
      >
        <Offcanvas.Header closeButton={closeButton}>
          <Offcanvas.Title>{header}</Offcanvas.Title>
        </Offcanvas.Header>
        {children}
      </Offcanvas>
    </>
  )
}

export default VerticalModal

import React from 'react'
import { Link } from 'react-router-dom'
import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap'
import styles from './CircularProgressBar.module.scss'

const CircularProgressBar = ({ logo, numberPercent, tooltip, className }) => {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {tooltip}
    </Tooltip>
  )

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {logo && (
        <OverlayTrigger
          placement="top"
          delay={{ show: 50, hide: 100 }}
          overlay={renderTooltip}
        >
          <Image src={logo} />
        </OverlayTrigger>
      )}
      {numberPercent && <div className={styles.percent}>{numberPercent}</div>}
    </div>
  )
}

export default CircularProgressBar

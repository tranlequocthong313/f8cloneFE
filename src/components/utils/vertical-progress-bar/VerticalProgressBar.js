import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import styles from './VerticalProgressBar.module.scss'

const VerticalProgressBar = ({ tooltip }) => {
  const renderTooltip = props => (
    <Tooltip id="button-tooltip" {...props}>
      {tooltip}
    </Tooltip>
  )

  return (
    <>
      <OverlayTrigger
        placement="bottom"
        delay={{ show: 50, hide: 50 }}
        overlay={renderTooltip}
      >
        <div className={styles.wrapper}></div>
      </OverlayTrigger>
    </>
  )
}

export default VerticalProgressBar

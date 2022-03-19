import React, { forwardRef } from 'react'
import styles from './ContentEditable.module.scss'

const ContentEditable = (
  { value, onKeyPress, onPaste, text, className },
  ref
) => {
  return (
    <div
      suppressContentEditableWarning={true}
      contentEditable
      spellCheck={false}
      data-empty-text={text}
      className={`${styles.contentEditable} ${className}`}
      onKeyPress={onKeyPress}
      onPaste={onPaste}
      ref={ref}
    >
      {value}
    </div>
  )
}

export default forwardRef(ContentEditable)

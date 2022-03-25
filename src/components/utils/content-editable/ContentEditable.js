import React, { forwardRef } from 'react'
import styles from './ContentEditable.module.scss'
import { maxlengthContentEditable } from 'maxlength-contenteditable'

const ContentEditable = (
  { value, onInput, text, className, maxLength },
  ref
) => {
  maxlengthContentEditable()

  return (
    <div
      suppressContentEditableWarning={true}
      contentEditable={true}
      spellCheck={false}
      data-empty-text={text}
      className={`${styles.contentEditable} ${className}`}
      onInput={onInput}
      ref={ref}
      data-max-length={maxLength}
    >
      {value}
    </div>
  )
}

export default forwardRef(ContentEditable)

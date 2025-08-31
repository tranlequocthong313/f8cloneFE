import React, { forwardRef } from 'react'
import styles from './ContentEditable.module.scss'
import { maxlengthContentEditable } from 'maxlength-contenteditable'

const ContentEditable = (
  { onInput, text, className, maxLength, showCode, children },
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
      tabIndex={'0'}
      ref={ref}
      data-max-length={maxLength}
    >
      {children}
      {showCode && (
        <pre>
          <br />
        </pre>
      )}
    </div>
  )
}

export default forwardRef(ContentEditable)

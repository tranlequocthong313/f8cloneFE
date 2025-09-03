import React, { forwardRef, useEffect, useRef } from 'react';
import styles from './ContentEditable.module.scss';
import { maxlengthContentEditable } from 'maxlength-contenteditable';

const ContentEditable = (
    { onInput, text, className, maxLength, showCode, children, onSubmit },
    ref
) => {
    const innerRef = useRef(null);
    const mergedRef = ref || innerRef;

    useEffect(() => {
        maxlengthContentEditable();
    }, []);

    useEffect(() => {
        if (mergedRef && mergedRef.current) {
            mergedRef.current.focus();
        }
    }, [mergedRef]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (onSubmit) {
                onSubmit(e);
            }
            if (mergedRef && mergedRef.current) {
                mergedRef.current.blur(); 
            }
        }
    };

    return (
        <div
            suppressContentEditableWarning={true}
            contentEditable={true}
            spellCheck={false}
            data-empty-text={text}
            className={`${styles.contentEditable} ${className} ${
                showCode ? styles.showCode : ''
            }`}
            onInput={onInput}
            onKeyDown={handleKeyDown}
            tabIndex='0'
            ref={mergedRef}
            data-max-length={maxLength}
        >
            {children}
        </div>
    );
};

export default forwardRef(ContentEditable);

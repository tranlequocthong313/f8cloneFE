import { useRef, useEffect } from 'react';
import styles from './CommentInputSecondary.module.scss';
import noPhotoURL from '../../../asset/images/nobody_m.256x256.jpg';
import ContentEditable from '../content-editable/ContentEditable';
import { useSelector } from 'react-redux';

const CommentInputSecondary = ({
    showCode,
    showInput,
    buttonText,
    prefixContent,
    editComment,
    replyComment,
    onInput,
    commentInput,
    setShowCodeEditReply,
}) => {
    const user = useSelector((state) => state.user);
    const contentEditableRef = useRef();

    useEffect(() => {
        const isEmptyCommentInput = commentInput.length === 0;
        if (isEmptyCommentInput) contentEditableRef.current.innerText = '';
    }, [commentInput]);

    return (
        <div className={styles.replyComment}>
            <div className={styles.comment}>
                <img src={user.photoURL} alt='' />
                <ContentEditable
                    text={'Bình luận công khai...'}
                    onInput={onInput}
                    maxLength={'3000'}
                    className={styles.commentInput}
                    ref={contentEditableRef}
                    showCode={showCode}
                >
                    <>
                        <span
                            className={
                                buttonText !== 'Sửa'
                                    ? styles.replyUserName
                                    : styles.editComment
                            }
                        >
                            {prefixContent}
                        </span>
                        <span>&nbsp;</span>
                    </>
                </ContentEditable>
                {!showCode && (
                    <div
                        className={styles.commentCode}
                        onClick={setShowCodeEditReply}
                    >
                        <i className='fa-solid fa-code'></i>
                        <span>Chèn code</span>
                    </div>
                )}

                <div className={styles.submitWrapper}>
                    <button
                        className={styles.cancel}
                        onClick={() => {
                            showInput();
                            setShowCodeEditReply();
                        }}
                    >
                        Hủy
                    </button>
                    <button
                        className={
                            commentInput && commentInput.length >= 1
                                ? `${styles.submit} ${styles.active}`
                                : styles.submit
                        }
                        onClick={
                            buttonText === 'Sửa' ? editComment : replyComment
                        }
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommentInputSecondary;

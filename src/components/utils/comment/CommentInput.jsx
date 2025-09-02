import { useState, useRef, useEffect } from 'react';
import styles from './CommentInput.module.scss';
import noPhotoURL from '../../../asset/images/nobody_m.256x256.jpg';
import ContentEditable from '../content-editable/ContentEditable';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { apiURL } from '../../../context/constants';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';

const socket = io.connect(apiURL);

const CommentInput = ({ entity }) => {
    const contentEditableRef = useRef();
    const navigate = useNavigate();

    const user = useSelector((state) => state.user);

    const [showSubmit, setShowSubmit] = useState(false);
    const [showCode, setShowCode] = useState(false);
    const [commentInput, setCommentInput] = useState('');

    useEffect(() => {
        const isEmptyCommentInput = commentInput.length === 0;
        if (isEmptyCommentInput) contentEditableRef.current.innerText = '';
    }, [commentInput]);

    const submitComment = async () => {
        try {
            const token = Cookies.get('token');
            if (!token) return navigate('/login');

            await fetch(`${apiURL}/comments`, {
                method: 'POST',
                body: JSON.stringify({
                    ...entity,
                    content: commentInput,
                    isCode: showCode ? true : false,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.log(error.message);
        }

        setCommentInput('');
        setShowSubmit(false);
        setShowCode(false);
    };

    return (
        <div className={styles.comment}>
            <img src={user?.photoURL} alt='' />
            <div onClick={() => setShowSubmit(true)}>
                <ContentEditable
                    text={'Viết bình luận của bạn...'}
                    onInput={(e) => setCommentInput(e.target.innerText)}
                    maxLength={'3000'}
                    className={styles.commentInput}
                    ref={contentEditableRef}
                    showCode={showCode}
                />
            </div>
            {showSubmit && (
                <>
                    {!showCode && (
                        <div
                            className={styles.commentCode}
                            onClick={() => setShowCode(true)}
                        >
                            <i className='fa-solid fa-code'></i>
                            <span>Chèn code</span>
                        </div>
                    )}
                    <div className={styles.submitWrapper}>
                        <button
                            className={styles.cancel}
                            onClick={() => {
                                setShowSubmit(false);
                                setShowCode(false);
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
                            onClick={submitComment}
                        >
                            Bình luận
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CommentInput;

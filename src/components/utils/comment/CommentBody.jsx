import { useEffect, useState } from 'react';
import CommentReaction from './CommentReaction';
import { apiURL, EMOJI_MAP } from '../../../context/constants';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { reportComment } from '../report/report';
import CommentInputSecondary from './CommentInputSecondary';
import timeSince from '../timeSince/timeSince';
import CommentReactionCounter from './CommentReactionCounter';
import styles from './CommentBody.module.scss';
import Tippy, { TippyItem } from '../tippy/Tippy';
import { Link } from 'react-router-dom';
import { copyToClipboard } from '../../../helpers/text';

const STRING_LENGTH_EXTEND = 350; // Content length > 350 => show extend

const CommentBody = ({
    comments,
    setComments,
    repliedComments,
    setRepliedComments,
    reportStatusHandler,
    showModal,
    entity,
    style,
}) => {
    const [showEditInputById, setShowEditInputById] = useState([]);
    const [showReplyInputById, setShowReplyInputById] = useState([]);
    const [showCodeEditInputById, setShowCodeEditInputById] = useState([]);
    const [showCodeReplyInputById, setShowCodeReplyInputById] = useState([]);
    const [editCommentText, setEditCommentText] = useState('');
    const [replyCommentText, setReplyCommentText] = useState('');
    const [copyCommentHasCodeById, setCopyCommentHasCodeById] = useState([]);
    const [
        showExtendButtonOnLongCommentWithId,
        setShowExtendButtonOnLongCommentWithId,
    ] = useState([]);
    const [showReplyCommentsById, setShowReplyCommentsById] = useState([]);
    const [hoverCommentReaction, setHoverCommentReaction] = useState(null);

    const user = useSelector((state) => state.user);

    const updateComment = (comment) => {
        if (!comment) return comment;
        setComments((prev) => {
            return prev.map((c) => {
                if (c._id === comment._id) {
                    return comment;
                }
                return c;
            });
        });
    };

    const reactCommentHandler = async (emoji, commentId) => {
        try {
            const token = Cookies.get('token');
            if (!token) return;

            await fetch(`${apiURL}/comments/${commentId}/react`, {
                method: 'PUT',
                body: JSON.stringify({ emoji }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    const replyCommentHandler = async (parentCommentId, commentId) => {
        try {
            const token = Cookies.get('token');
            if (!token) return;

            const res = await fetch(`${apiURL}/comments`, {
                method: 'POST',
                body: JSON.stringify({
                    ...entity,
                    parentComment: parentCommentId,
                    content: replyCommentText,
                    isCode: showCodeReplyInputById.includes(commentId),
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            await res.json();
            getReplyComment(parentCommentId);
        } catch (error) {
            console.log(error.message);
        }
    };

    const getReplyComment = async (commentId) => {
        try {
            const token = Cookies.get('token');
            if (!token) return;

            const res = await fetch(`${apiURL}/comments/${commentId}`);

            const data = await res.json();
            setRepliedComments((prev) => ({
                ...prev,
                [commentId]: data.comments,
            }));
            setShowReplyCommentsById((prev) => [...prev, commentId]);
        } catch (error) {
            console.log(error.message);
        }
    };

    const deleteComment = async (commentId) => {
        try {
            const token = Cookies.get('token');
            if (!token) return;

            await fetch(`${apiURL}/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    const editCommentHandler = async (commentId) => {
        try {
            const token = Cookies.get('token');
            if (!token) return;

            const res = await fetch(`${apiURL}/comments/${commentId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    content: editCommentText,
                    isCode: showCodeEditInputById.includes(commentId),
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            updateComment(data.comment);
        } catch (error) {
            console.log(error.message);
        }

        setEditCommentText('');
        setShowEditInputById((prev) =>
            prev.filter((item) => item !== commentId)
        );
        setShowCodeEditInputById((prev) =>
            prev.filter((item) => item !== commentId)
        );
    };

    const showInputHandler = (commentId, option) => {
        const isReply = showReplyInputById.includes(commentId);
        const isEdit = showEditInputById.includes(commentId);

        if (option === 'reply' && !isReply && !isEdit) {
            setShowReplyInputById((prev) => [...prev, commentId]);
        } else if (option === 'reply' && !isReply && isEdit) {
            setShowReplyInputById((prev) => [...prev, commentId]);
            setShowEditInputById((prev) =>
                prev.filter((item) => item !== commentId)
            );
        } else if (option === 'reply' && isReply) {
            setShowReplyInputById((prev) =>
                prev.filter((item) => item !== commentId)
            );
        } else if (option === 'edit' && !isEdit && isReply) {
            setShowEditInputById((prev) => [...prev, commentId]);
            setShowReplyInputById((prev) =>
                prev.filter((item) => item !== commentId)
            );
        } else if (option === 'edit' && !isEdit && !isReply) {
            return setShowEditInputById((prev) => [...prev, commentId]);
        }
        setShowEditInputById((prev) =>
            prev.filter((item) => item !== commentId)
        );
    };

    const showCodeEditReplyHandler = (commentId, option, showCode) => {
        const isReply = showCodeReplyInputById.includes(commentId);
        const isEdit = showCodeEditInputById.includes(commentId);

        if (option === 'reply' && !isReply && !isEdit && showCode) {
            setShowCodeReplyInputById((prev) => [...prev, commentId]);
        } else if (option === 'reply' && !isReply && isEdit) {
            setShowCodeReplyInputById((prev) => [...prev, commentId]);
            setShowCodeEditInputById((prev) =>
                prev.filter((item) => item !== commentId)
            );
        } else if (option === 'reply' && isReply) {
            setShowCodeReplyInputById((prev) =>
                prev.filter((item) => item !== commentId)
            );
        } else if (option === 'edit' && !isEdit && isReply) {
            setShowCodeEditInputById((prev) => [...prev, commentId]);
            setShowCodeReplyInputById((prev) =>
                prev.filter((item) => item !== commentId)
            );
        } else if (option === 'edit' && !isEdit && !isReply) {
            setShowCodeEditInputById((prev) => [...prev, commentId]);
        } else {
            setShowCodeEditInputById((prev) =>
                prev.filter((item) => item !== commentId)
            );
        }
    };

    const copyHandler = (commentId, commentContent) => {
        copyToClipboard(commentContent);
        setCopyCommentHasCodeById((prev) => {
            return [...prev, commentId];
        });
        const timer = setTimeout(() => {
            setCopyCommentHasCodeById([]);
            clearTimeout(timer);
        }, 5000);
    };

    const extendHandler = (commentId) =>
        showExtendButtonOnLongCommentWithId.includes(commentId)
            ? setShowExtendButtonOnLongCommentWithId((prev) =>
                  prev.filter((item) => item !== commentId)
              )
            : setShowExtendButtonOnLongCommentWithId((prev) => [
                  ...prev,
                  commentId,
              ]);

    const styleCommentContent = (commentId, commentContent) => {
        if (commentContent.length < STRING_LENGTH_EXTEND) {
            return styles.commentContent;
        } else if (
            commentContent.length > STRING_LENGTH_EXTEND &&
            showExtendButtonOnLongCommentWithId.includes(commentId)
        ) {
            return styles.commentContent;
        }
        return `${styles.commentContent} ${styles.extend}`;
    };

    const getCurrentUserReactForComment = (comment) => {
        const react = comment?.reacts?.find(
            (r) => r.reactedBy === user._id
        )?.emoji;
        if (!react) {
            return null;
        }
        return EMOJI_MAP[react];
    };

    let hideTimeout;

    return (
        <>
            {comments?.map((comment) => (
                <div key={comment._id} style={style}>
                    <div className={styles.commentList}>
                        <Link
                            to={`/${comment.postedBy.slug}`}
                            className={styles.avatar}
                        >
                            <img src={comment.postedBy.photoURL} alt='' />
                        </Link>
                        <div className={styles.commentBody}>
                            <div
                                className={styleCommentContent(
                                    comment._id,
                                    comment.content
                                )}
                            >
                                <div>
                                    <Link to={`/${comment.postedBy.slug}`}>
                                        <h5>{comment.postedBy.fullName}</h5>
                                    </Link>
                                    {!comment.isCode && (
                                        <span>{comment.content}</span>
                                    )}
                                    {comment.isCode && (
                                        <pre tabIndex={0}>
                                            <div
                                                className={styles.copyWrapper}
                                                onClick={() =>
                                                    copyHandler(
                                                        comment._id,
                                                        comment.content
                                                    )
                                                }
                                            >
                                                <button
                                                    className={
                                                        styles.copyButton
                                                    }
                                                >
                                                    {!copyCommentHasCodeById.includes(
                                                        comment._id
                                                    )
                                                        ? 'Copy'
                                                        : 'Copied!'}
                                                </button>
                                            </div>
                                            {comment.content}
                                        </pre>
                                    )}
                                    {comment.content.length >
                                        STRING_LENGTH_EXTEND && (
                                        <div
                                            className={styles.extendButton}
                                            onClick={() =>
                                                extendHandler(comment._id)
                                            }
                                        >
                                            <strong>
                                                {!showExtendButtonOnLongCommentWithId.includes(
                                                    comment._id
                                                )
                                                    ? 'Mở rộng'
                                                    : 'Thu nhỏ'}
                                            </strong>
                                            <i
                                                className={
                                                    !showExtendButtonOnLongCommentWithId.includes(
                                                        comment._id
                                                    )
                                                        ? 'fa-regular fa-chevron-down'
                                                        : 'fa-regular fa-chevron-up'
                                                }
                                            ></i>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className={styles.commentAction}>
                                <div className={styles.action}>
                                    {user.isLoggedIn && (
                                        <>
                                            <div
                                                className={`
                                                        ${
                                                            styles.reactionButton
                                                        } 
                                                        ${
                                                            getCurrentUserReactForComment(
                                                                comment
                                                            )
                                                                ? styles.active
                                                                : null
                                                        }
                                                    `}
                                                style={{
                                                    color:
                                                        getCurrentUserReactForComment(
                                                            comment
                                                        )?.color || '#e87a5a',
                                                }}
                                                onClick={() => {
                                                    if (
                                                        getCurrentUserReactForComment(
                                                            comment
                                                        )
                                                    ) {
                                                        reactCommentHandler(
                                                            comment?.reacts?.find(
                                                                (r) =>
                                                                    r.reactedBy ===
                                                                    user._id
                                                            ).emoji,
                                                            comment._id
                                                        );
                                                    } else {
                                                        reactCommentHandler(
                                                            'like',
                                                            comment._id
                                                        );
                                                    }
                                                    clearTimeout(hideTimeout);
                                                    setHoverCommentReaction(
                                                        null
                                                    );
                                                }}
                                                onMouseOver={() => {
                                                    clearTimeout(hideTimeout);
                                                    setHoverCommentReaction(
                                                        comment
                                                    );
                                                }}
                                                onMouseOut={() => {
                                                    hideTimeout = setTimeout(
                                                        () => {
                                                            setHoverCommentReaction(
                                                                null
                                                            );
                                                        },
                                                        1500
                                                    );
                                                }}
                                            >
                                                {hoverCommentReaction?._id ===
                                                    comment._id && (
                                                    <div
                                                        className={
                                                            styles.reaction
                                                        }
                                                    >
                                                        <CommentReaction
                                                            reactComment={(
                                                                emoji,
                                                                commentId
                                                            ) => {
                                                                reactCommentHandler(
                                                                    emoji,
                                                                    commentId
                                                                );
                                                                clearTimeout(
                                                                    hideTimeout
                                                                );
                                                                setHoverCommentReaction(
                                                                    null
                                                                );
                                                            }}
                                                            commentId={
                                                                comment._id
                                                            }
                                                        />
                                                    </div>
                                                )}
                                                {getCurrentUserReactForComment(
                                                    comment
                                                )
                                                    ? getCurrentUserReactForComment(
                                                          comment
                                                      ).title
                                                    : 'Thích'}
                                            </div>
                                            <span className={styles.dot}>
                                                .
                                            </span>
                                        </>
                                    )}
                                    {comment && comment.reacts.length > 0 && (
                                        <CommentReactionCounter
                                            showModal={showModal}
                                            reactData={comment.reacts}
                                        />
                                    )}
                                    {user.isLoggedIn && (
                                        <>
                                            <span
                                                className={
                                                    styles.reactionButton
                                                }
                                                onClick={() =>
                                                    showInputHandler(
                                                        comment._id,
                                                        'reply'
                                                    )
                                                }
                                            >
                                                Trả lời
                                            </span>
                                            <span className={styles.dot}>
                                                .
                                            </span>
                                        </>
                                    )}
                                    <span className={styles.createdAt}>
                                        {timeSince(comment.createdAt)}
                                    </span>

                                    {user.isLoggedIn && (
                                        <>
                                            <span className={styles.dot}>
                                                .
                                            </span>
                                            <Tippy
                                                button={
                                                    <i
                                                        className={`fa-solid fa-ellipsis ${styles.optionIcon}`}
                                                    ></i>
                                                }
                                                className={styles.optionWrapper}
                                            >
                                                {comment.postedBy._id ===
                                                    user.userId && (
                                                    <>
                                                        <TippyItem
                                                            className={
                                                                styles.optionItem
                                                            }
                                                            onClick={() => {
                                                                showInputHandler(
                                                                    comment._id,
                                                                    'edit'
                                                                );
                                                            }}
                                                        >
                                                            <i className='fa-solid fa-pen'></i>
                                                            <span>
                                                                Sửa bình luận
                                                            </span>
                                                        </TippyItem>
                                                        <TippyItem
                                                            className={
                                                                styles.optionItem
                                                            }
                                                            onClick={() =>
                                                                deleteComment(
                                                                    comment._id
                                                                )
                                                            }
                                                        >
                                                            <i className='fa-solid fa-trash'></i>
                                                            <span>
                                                                Xóa bình luận
                                                            </span>
                                                        </TippyItem>
                                                    </>
                                                )}
                                                {comment.postedBy._id !==
                                                    user.userId && (
                                                    <TippyItem
                                                        className={
                                                            styles.optionItem
                                                        }
                                                        onClick={() =>
                                                            reportStatusHandler(
                                                                reportComment(
                                                                    comment._id
                                                                )
                                                            )
                                                        }
                                                    >
                                                        <i className='fa-solid fa-flag'></i>
                                                        <span>
                                                            Báo cáo bình luận
                                                        </span>
                                                    </TippyItem>
                                                )}
                                            </Tippy>
                                        </>
                                    )}
                                </div>
                            </div>

                            {showReplyInputById.includes(comment._id) &&
                                !showEditInputById.includes(comment._id) && (
                                    <CommentInputSecondary
                                        showCode={showCodeReplyInputById.includes(
                                            comment._id
                                        )}
                                        setShowCodeEditReply={(showCode) =>
                                            showCodeEditReplyHandler(
                                                comment._id,
                                                'reply',
                                                showCode
                                            )
                                        }
                                        replyComment={() => {
                                            replyCommentHandler(
                                                comment.parentComment ||
                                                    comment._id,
                                                comment._id
                                            );
                                            setShowReplyInputById((prev) =>
                                                prev.filter(
                                                    (item) =>
                                                        item !== comment._id
                                                )
                                            );
                                        }}
                                        showInput={() =>
                                            showInputHandler(
                                                comment._id,
                                                'reply'
                                            )
                                        }
                                        buttonText={'Trả lời'}
                                        onInput={(e) =>
                                            setReplyCommentText(
                                                e.target.innerText
                                            )
                                        }
                                        commentInput={replyCommentText}
                                    />
                                )}

                            {showEditInputById.includes(comment._id) &&
                                !showReplyInputById.includes(comment._id) && (
                                    <CommentInputSecondary
                                        showCode={showCodeEditInputById.includes(
                                            comment._id
                                        )}
                                        setShowCodeEditReply={(showCode) =>
                                            showCodeEditReplyHandler(
                                                comment._id,
                                                'edit',
                                                showCode
                                            )
                                        }
                                        showInput={() =>
                                            showInputHandler(
                                                comment._id,
                                                'edit'
                                            )
                                        }
                                        buttonText={'Sửa'}
                                        editComment={() =>
                                            editCommentHandler(comment._id)
                                        }
                                        onInput={(e) =>
                                            setEditCommentText(
                                                e.target.innerText
                                            )
                                        }
                                        commentInput={editCommentText}
                                    />
                                )}
                        </div>
                    </div>
                    {!!comment?.totalReplies && (
                        <>
                            <div className={styles.viewReplies}>
                                <span
                                    className={styles.repliesCount}
                                    onClick={() => {
                                        const commentId = comment._id;
                                        if (
                                            showReplyCommentsById.includes(
                                                commentId
                                            )
                                        ) {
                                            return setShowReplyCommentsById(
                                                (prev) =>
                                                    prev.filter(
                                                        (c) => c !== commentId
                                                    )
                                            );
                                        }
                                        getReplyComment(commentId);
                                    }}
                                >
                                    {!showReplyCommentsById.includes(
                                        comment._id
                                    ) ? (
                                        <>
                                            {`Xem ${comment.totalReplies} câu trả lời`}
                                            <i className='fa-solid fa-chevron-down'></i>
                                        </>
                                    ) : (
                                        <>
                                            {`Ẩn câu trả lời`}
                                            <i className='fa-solid fa-chevron-up'></i>
                                        </>
                                    )}
                                </span>
                            </div>

                            {showReplyCommentsById.includes(comment._id) && (
                                <CommentBody
                                    comments={repliedComments[comment._id]}
                                    setComments={() => {}}
                                    setRepliedComments={setRepliedComments}
                                    repliedComments={repliedComments}
                                    reportStatusHandler={reportStatusHandler}
                                    showModal={showModal}
                                    entity={entity}
                                    style={{ margin: '0 0 5px 49px' }}
                                />
                            )}
                        </>
                    )}
                </div>
            ))}
        </>
    );
};

export default CommentBody;

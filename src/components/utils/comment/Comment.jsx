import { useState, useRef, useEffect } from 'react';
import styles from './Comment.module.scss';
import CommentHeader from './CommentHeader';
import CommentInput from './CommentInput';
import CommentBody from './CommentBody';
import CommentModal from './CommentModal';
import { useSelector } from 'react-redux';
import MainToast from '../toast/MainToast';
import ScrollToTop from '../scroll/ScrollToTop';
import Cookies from 'js-cookie';
import { apiURL } from '../../../context/constants';
import io from 'socket.io-client';

const socket = io.connect(apiURL);

const Comment = ({ entity }) => {
    const user = useSelector((state) => state.user);
    const commentRef = useRef();

    const [showModal, setShowModal] = useState(false);
    const [reportStatus, setReportStatus] = useState({
        isSuccess: false,
        show: false,
    });
    const [visible, setVisible] = useState(false);
    const [comments, setComments] = useState([]);
    const [repliedComments, setRepliedComments] = useState(null);

    useEffect(() => {
        socket.on('edit-comment', (comment) => {
            if (!!comment.parentComment) {
                const parentCommentId = comment.parentComment;
                setRepliedComments((prev) => ({
                    ...prev,
                    [parentCommentId]: prev[parentCommentId].map((c) => {
                        if (c._id === comment._id) {
                            return comment;
                        }
                        return c;
                    }),
                }));
            } else {
                setComments((prev) => {
                    return prev.map((c) => {
                        if (c._id === comment._id) {
                            return {
                                ...c,
                                ...comment,
                            };
                        }
                        return c;
                    });
                });
            }
        });

        socket.on('post-comment', (comment) => {
            if (!!comment.parentComment) {
                const parentCommentId = comment.parentComment._id;
                setRepliedComments((prev) => ({
                    ...prev,
                    [parentCommentId]: [
                        ...(prev?.[parentCommentId] || []),
                        comment,
                    ],
                }));
                setComments((prev) => {
                    return prev.map((c) => {
                        if (c._id === parentCommentId) {
                            return {
                                ...c,
                                totalReplies: c.totalReplies
                                    ? c.totalReplies + 1
                                    : 1,
                            };
                        }
                        return c;
                    });
                });
            } else {
                setComments((prev) => {
                    return [comment, ...prev];
                });
            }
        });

        socket.on('delete-comment', ({ commentId, parentCommentId }) => {
            if (parentCommentId) {
                setRepliedComments((prev) => ({
                    ...prev,
                    [parentCommentId]: prev[parentCommentId].filter(
                        (c) => c._id !== commentId
                    ),
                }));
                setComments((prev) => {
                    return prev.map((c) => {
                        if (c._id === parentCommentId) {
                            return {
                                ...c,
                                totalReplies: c.totalReplies
                                    ? c.totalReplies - 1
                                    : c.totalReplies,
                            };
                        }
                        return c;
                    });
                });
            } else {
                setComments((prev) => {
                    return prev.filter((c) => c._id !== commentId);
                });
            }
        });
    }, []);

    useEffect(() => {
        if (!entity) return;

        const { type, entityId } = entity;

        const getComments = async () => {
            const token = Cookies.get('token');
            if (!token) return;

            try {
                const res = await fetch(
                    `${apiURL}/comments?type=${type}&entityId=${entityId}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await res.json();
                setComments(data.comments || []);
            } catch (error) {
                console.log('🚀 ~ getComments ~ error:', error);
            }
        };

        getComments();
    }, [entity]);

    const handleReportStatus = (status) =>
        status
            ? setReportStatus((prev) => {
                  return {
                      ...prev,
                      show: true,
                      isSuccess: true,
                  };
              })
            : setReportStatus((prev) => {
                  return {
                      ...prev,
                      show: true,
                      isSuccess: false,
                  };
              });

    const scrollToTop = () => {
        const SHOW_SCROLL_TO_TOP_OFFSET = 1000;

        commentRef.current.scrollTop >= SHOW_SCROLL_TO_TOP_OFFSET
            ? setVisible(true)
            : setVisible(false);
    };

    return (
        <>
            {showModal && (
                <CommentModal showModal={() => setShowModal(false)} />
            )}

            <div className={styles.container}>
                <div
                    className={styles.content}
                    ref={commentRef}
                    onScroll={scrollToTop}
                >
                    <CommentHeader comments={comments} />
                    {user.isLoggedIn && <CommentInput entity={entity} />}
                    <CommentBody
                        showModal={setShowModal}
                        reportStatusHandler={handleReportStatus}
                        entity={entity}
                        comments={comments}
                        setComments={setComments}
                        setRepliedComments={setRepliedComments}
                        repliedComments={repliedComments}
                    />
                </div>
                {visible && (
                    <ScrollToTop
                        onScroll={() =>
                            commentRef.current.scrollTo({
                                top: 0,
                                behavior: 'smooth',
                            })
                        }
                    />
                )}
            </div>
            <MainToast
                setStatus={() =>
                    setReportStatus({
                        show: false,
                    })
                }
                status={reportStatus}
                setCreateStatus={() =>
                    setReportStatus((prev) => {
                        return {
                            ...prev,
                            show: false,
                        };
                    })
                }
                successText={'Đã gửi báo cáo tới quản trị viên'}
                failText={'Gửi báo cáo không thành công'}
            />
        </>
    );
};

export default Comment;

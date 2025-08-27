import { useState } from 'react';
import CommentReaction from './CommentReaction';
import { apiURL } from '../../../context/constants';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { reportComment } from '../report/Report';
import CommentInputSecondary from './CommentInputSecondary';
import timeSince from '../../utils/timeSince/timeSince';
import CommentReactionCounter from './CommentReactionCounter';
import noPhotoURL from '../../../asset/images/nobody_m.256x256.jpg';
import styles from './CommentBody.module.scss';
import io from 'socket.io-client';
import Tippy from '../tippy/Tippy';
import { Link } from 'react-router-dom';

const socket = io.connect(apiURL);

const CommentBody = ({
  commentData,
  showModalHandler,
  setCommentData,
  reportStatusHandler,
  blogId,
}) => {
  const [showOption, setShowOption] = useState(null);
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
  const [showReplyContentById, setShowReplyContentById] = useState([]);
  const [replyCommentData, setReplyCommentData] = useState({
    replies: [],
    commentId: '',
  });
  const [hoverCommentReaction, setHoverCommentReaction] = useState(null)

  const user = useSelector((state) => state.user);

  const reactCommentHandler = async (emoji, commentId) => {
    try {
      const token = Cookies.get('token');
      if (!token) return;

      const res = await fetch(`${apiURL}/blog/comment/react`, {
        method: 'PUT',
        body: JSON.stringify({ emoji, commentId, blogId }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log(data);
      setCommentData(data.comments);
    } catch (error) {
      console.log(error.message);
    }
  };

  const replyCommentHandler = async (commentId) => {
    try {
      const token = Cookies.get('token');
      if (!token) return;

      const res = await fetch(`${apiURL}/blog/comment/reply`, {
        method: 'PUT',
        body: JSON.stringify({
          commentId,
          content: replyCommentText,
          isCode: showCodeReplyInputById.includes(commentId),
          blogId,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getReplyComment = async (commentId) => {
    try {
      const token = Cookies.get('token');
      if (!token) return;

      const res = await fetch(`${apiURL}/blog/comment/get-reply`, {
        method: 'POST',
        body: JSON.stringify({ commentId, blogId }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log(data.comments);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const token = Cookies.get('token');
      if (!token) return;

      const res = await fetch(`${apiURL}/blog/comment/delete`, {
        method: 'PUT',
        body: JSON.stringify({ commentId }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log(data);
      setCommentData(data.comments);
    } catch (error) {
      console.log(error.message);
    }
  };

  const editCommentHandler = async (commentId) => {
    try {
      const token = Cookies.get('token');
      if (!token) return;

      const res = await fetch(`${apiURL}/blog/comment/edit`, {
        method: 'PUT',
        body: JSON.stringify({
          commentId: commentId,
          content: editCommentText,
          isCode: showCodeEditInputById.includes(commentId),
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log(data);
      setCommentData(data.comments);
    } catch (error) {
      console.log(error.message);
    }

    setEditCommentText('');
    setShowEditInputById((prev) => prev.filter((item) => item !== commentId));
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
      setShowEditInputById((prev) => prev.filter((item) => item !== commentId));
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
    setShowEditInputById((prev) => prev.filter((item) => item !== commentId));
  };

  const showCodeEditReplyHandler = (commentId, option) => {
    const isReply = showCodeReplyInputById.includes(commentId);
    const isEdit = showCodeEditInputById.includes(commentId);

    if (option === 'reply' && !isReply && !isEdit) {
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
    navigator.clipboard.writeText(commentContent);
    setCopyCommentHasCodeById((prev) => {
      return [...prev, commentId];
    });
    const timer = setTimeout(() => {
      setCopyCommentHasCodeById([]);
      clearTimeout(timer);
    }, 5000);
  };

  const STRING_LENGTH_EXTEND = 350; // Content length > 350 => show extend

  const extendHandler = (commentId) =>
    showExtendButtonOnLongCommentWithId.includes(commentId)
      ? setShowExtendButtonOnLongCommentWithId((prev) =>
          prev.filter((item) => item !== commentId)
        )
      : setShowExtendButtonOnLongCommentWithId((prev) => [...prev, commentId]);

  const showOptionHandler = (commentId) =>
    showOption === commentId ? setShowOption(null) : setShowOption(commentId);

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

  let hideTimeout

  return (
    <>
      {commentData?.map((comment) => (
        <div key={comment._id}>
          <div className={styles.commentList}>
            <Link to={`/${comment.postedBy.slug}`} className={styles.avatar}>
              <img src={comment.postedBy.photoURL} alt="" />
            </Link>
            <div className={styles.commentBody}>
              <div
                className={styleCommentContent(comment._id, comment.content)}
              >
                <div>
                  <Link to={`/${comment.postedBy.slug}`}>
                    <h5>{comment.postedBy.fullName}</h5>
                  </Link>
                  {!comment.isCode && <span>{comment.content}</span>}
                  {comment.isCode && (
                    <pre tabIndex={0}>
                      <div
                        className={styles.copyWrapper}
                        onClick={() =>
                          copyHandler(comment._id, comment.content)
                        }
                      >
                        <button className={styles.copyButton}>
                          {!copyCommentHasCodeById.includes(comment._id)
                            ? 'Copy'
                            : 'Copied!'}
                        </button>
                      </div>
                      {comment.content}
                    </pre>
                  )}
                  {comment.content.length > STRING_LENGTH_EXTEND && (
                    <div
                      className={styles.extendButton}
                      onClick={() => extendHandler(comment._id)}
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
                        className={styles.reactionButton}
                        onClick={() => {
                          console.log('Onclick');
                          reactCommentHandler('Thích', comment._id);
                        }}
                        onMouseOver={() => {
                          clearTimeout(hideTimeout)
                          setHoverCommentReaction(comment)
                        }}
                        onMouseOut={() => {
                          hideTimeout = setTimeout(() => {
                            setHoverCommentReaction(null)
                          }, 1500)
                        }}
                      >
                        {hoverCommentReaction?._id === comment._id &&
                          <div className={styles.reaction}>
                            <CommentReaction
                              reactComment={reactCommentHandler}
                              commentId={comment._id}
                            />
                          </div>
                        }
                        Thích
                      </div>
                      <span className={styles.dot}>.</span>
                    </>
                  )}
                  {comment && comment.reacts.length > 0 && (
                    <CommentReactionCounter
                      showModalHandler={showModalHandler}
                      reactData={comment.reacts}
                    />
                  )}
                  {user.isLoggedIn && (
                    <>
                      <span
                        className={styles.reactionButton}
                        onClick={() => showInputHandler(comment._id, 'reply')}
                      >
                        Trả lời
                      </span>
                      <span className={styles.dot}>.</span>
                    </>
                  )}
                  <span className={styles.createdAt}>
                    {timeSince(comment.createdAt)}
                  </span>

                  {user.isLoggedIn && (
                    <>
                      <span className={styles.dot}>.</span>
                      <Tippy
                        button={
                          <i
                            className={`fa-solid fa-ellipsis ${styles.optionIcon}`}
                          ></i>
                        }
                        className={styles.optionWrapper}
                      >
                        {comment.postedBy._id === user.userId && (
                          <>
                            <div
                              className={styles.optionItem}
                              onClick={() => {
                                showInputHandler(comment._id, 'edit');
                              }}
                            >
                              <i className="fa-solid fa-pen"></i>
                              <span>Sửa bình luận</span>
                            </div>
                            <div
                              className={styles.optionItem}
                              onClick={() => deleteComment(comment._id)}
                            >
                              <i className="fa-solid fa-trash"></i>
                              <span>Xóa bình luận</span>
                            </div>
                          </>
                        )}
                        {comment.postedBy._id !== user.userId && (
                          <div
                            className={styles.optionItem}
                            onClick={() =>
                              reportStatusHandler(reportComment(comment._id))
                            }
                          >
                            <i className="fa-solid fa-flag"></i>
                            <span>Báo cáo bình luận</span>
                          </div>
                        )}
                      </Tippy>
                    </>
                  )}
                </div>
              </div>

              {showReplyInputById.includes(comment._id) &&
                !showEditInputById.includes(comment._id) && (
                  <CommentInputSecondary
                    userPhotoURL={user.photoURL}
                    showCode={showCodeReplyInputById.includes(comment._id)}
                    setShowCodeEditReply={() =>
                      showCodeEditReplyHandler(comment._id, 'reply')
                    }
                    replyCommentHandler={() => replyCommentHandler(comment._id)}
                    showInputHandler={() =>
                      showInputHandler(comment._id, 'reply')
                    }
                    buttonText={'Trả lời'}
                    firstString={comment.postedBy.fullName}
                    onInput={(e) => setReplyCommentText(e.target.innerText)}
                    commentInput={replyCommentText}
                  />
                )}

              {showEditInputById.includes(comment._id) &&
                !showReplyInputById.includes(comment._id) && (
                  <CommentInputSecondary
                    userPhotoURL={user.photoURL}
                    showCode={showCodeEditInputById.includes(comment._id)}
                    setShowCodeEditReply={() =>
                      showCodeEditReplyHandler(comment._id, 'edit')
                    }
                    showInputHandler={() =>
                      showInputHandler(comment._id, 'edit')
                    }
                    buttonText={'Sửa'}
                    firstString={comment.content}
                    editCommentHandler={() => editCommentHandler(comment._id)}
                    onInput={(e) => setEditCommentText(e.target.innerText)}
                    commentInput={editCommentText}
                  />
                )}
            </div>
          </div>
          {comment.replies.length > 0 && (
            <>
              <div className={styles.viewReplies}>
                <span
                  className={styles.repliesCount}
                  onClick={() => getReplyComment(comment._id)}
                >
                  {comment._id !== replyCommentData.commentId && (
                    <>
                      {`Xem ${comment.replies.length} câu trả lời`}
                      <i className="fa-solid fa-chevron-down"></i>
                    </>
                  )}
                  {comment._id === replyCommentData.commentId && (
                    <>
                      {`Ẩn câu trả lời`}
                      <i className="fa-solid fa-chevron-up"></i>
                    </>
                  )}
                </span>
              </div>

              {comment._id === replyCommentData.commentId &&
                replyCommentData.replies?.map((reply) => (
                  <div
                    className={`${styles.commentList} ${styles.replyCommentList}`}
                    key={reply._id}
                  >
                    <Link
                      to={`/${reply.postedBy.slug}`}
                      className={styles.avatar}
                    >
                      <img src={reply.postedBy.photoURL} alt="" />
                    </Link>
                    <div className={styles.commentBody}>
                      <div
                        className={styleCommentContent(
                          reply._id,
                          reply.content
                        )}
                      >
                        <div>
                          <Link to={`/${reply.postedBy.slug}`}>
                            <h5>{reply.postedBy.fullName}</h5>
                          </Link>
                          {!reply.isCode && <span>{reply.content}</span>}
                          {reply.isCode && (
                            <pre tabIndex="0">
                              <div
                                className={styles.copyWrapper}
                                onClick={() =>
                                  copyHandler(reply._id, reply.content)
                                }
                              >
                                <button className={styles.copyButton}>
                                  {!copyCommentHasCodeById.includes(reply._id)
                                    ? 'Copy'
                                    : 'Copied!'}
                                </button>
                              </div>
                              {reply.content}
                            </pre>
                          )}
                          {reply.content.length > STRING_LENGTH_EXTEND && (
                            <div
                              className={styles.extendButton}
                              onClick={() => extendHandler(reply._id)}
                            >
                              <strong>
                                {!showExtendButtonOnLongCommentWithId.includes(
                                  reply._id
                                )
                                  ? 'Mở rộng'
                                  : 'Thu nhỏ'}
                              </strong>
                              <i
                                className={
                                  !showExtendButtonOnLongCommentWithId.includes(
                                    reply._id
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
                          <span
                            className={styles.reactionButton}
                            onClick={() => {
                              reactCommentHandler('Thích', reply._id);
                            }}
                          >
                            <div className={styles.reaction}>
                              <CommentReaction
                                reactComment={reactCommentHandler}
                                commentId={reply._id}
                              />
                            </div>
                            Thích
                          </span>
                          {reply.reacts.length > 0 && (
                            <CommentReactionCounter
                              showModalHandler={showModalHandler}
                              reactData={reply.reacts}
                            />
                          )}
                          <span className={styles.dot}>.</span>
                          <span
                            className={styles.reactionButton}
                            onClick={() => showInputHandler(reply._id, 'reply')}
                          >
                            Trả lời
                          </span>
                          <span className={styles.dot}>.</span>
                          <span className={styles.createdAt}>
                            {timeSince(reply.createdAt)}
                          </span>
                          <span
                            className={styles.optionButton}
                            onClick={() => showOptionHandler(reply._id)}
                          >
                            <span className={styles.dot}>.</span>
                            <span className={styles.optionIcon}>
                              <i className="fa-solid fa-ellipsis"></i>
                            </span>
                            {showOption === reply._id && (
                              <div className={styles.optionWrapper}>
                                <ul className={styles.list}>
                                  {reply.postedBy._id === user.userId && (
                                    <>
                                      <li
                                        onClick={() => {
                                          showInputHandler(reply._id, 'edit');
                                        }}
                                      >
                                        <i className="fa-solid fa-pen"></i>
                                        <span>Sửa bình luận</span>
                                      </li>
                                      <li
                                        onClick={() => deleteComment(reply._id)}
                                      >
                                        <i className="fa-solid fa-trash"></i>x
                                        <span>Xóa bình luận</span>
                                      </li>
                                    </>
                                  )}
                                  {reply.postedBy._id !== user.userId && (
                                    <li
                                      onClick={() =>
                                        reportStatusHandler(
                                          reportComment(reply._id)
                                        )
                                      }
                                    >
                                      <i className="fa-solid fa-flag"></i>
                                      <span>Báo cáo bình luận</span>
                                    </li>
                                  )}
                                </ul>
                              </div>
                            )}
                          </span>
                        </div>
                      </div>

                      {showReplyInputById.includes(reply._id) &&
                        !showEditInputById.includes(reply._id) && (
                          <CommentInputSecondary
                            userPhotoURL={user.photoURL}
                            showCode={showCodeReplyInputById.includes(
                              reply._id
                            )}
                            setShowCodeEditReply={() =>
                              showCodeEditReplyHandler(reply._id, 'reply')
                            }
                            showInputHandler={() =>
                              showInputHandler(reply._id, 'reply')
                            }
                            buttonText={'Trả lời'}
                            firstString={reply.postedBy.fullName}
                          />
                        )}

                      {showEditInputById.includes(reply._id) &&
                        !showReplyInputById.includes(reply._id) && (
                          <CommentInputSecondary
                            userPhotoURL={user.photoURL}
                            showCode={showCodeEditInputById.includes(reply._id)}
                            setShowCodeEditReply={() =>
                              showCodeEditReplyHandler(reply._id, 'edit')
                            }
                            showInputHandler={() =>
                              showInputHandler(reply._id, 'edit')
                            }
                            buttonText={'Sửa'}
                            firstString={reply.content}
                            editCommentHandler={() =>
                              editCommentHandler(reply._id)
                            }
                            onInput={(e) =>
                              setEditCommentText(e.target.innerText)
                            }
                            editComment={editCommentText}
                          />
                        )}
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default CommentBody;

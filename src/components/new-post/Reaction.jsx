import React from 'react';
import VerticalModal from '../utils/vertical-modal/VerticalModal';

import styles from './Reaction.module.scss';
import CommentWrapper from '../utils/comment/CommentWrapper';

const Reaction = ({
    isLike,
    like,
    setShowComment,
    likeCount,
    blogId,
}) => {
    return (
        <div className={styles.reaction}>
            <div className={styles.reactButton} onClick={like}>
                <i
                    className={
                        isLike
                            ? `${styles.active} fa-solid fa-heart`
                            : 'fa-regular fa-heart'
                    }
                ></i>
                <span>{likeCount}</span>
            </div>

            <CommentWrapper
                button={
                    <div
                        className={styles.reactButton}
                        onClick={setShowComment}
                    >
                        <i className='fa-regular fa-comment'></i>
                        {/* <span>{commentData.length}</span> */}
                    </div>
                }
                entity={{
                    entityId: blogId,
                    type: 'blog',
                }}
            />
        </div>
    );
};

export default Reaction;

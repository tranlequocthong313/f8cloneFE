import React from 'react';

import styles from './Reaction.module.scss';

const Reaction = ({ isLike, like, setShowComment, likeCount, blog }) => {
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

            <div className={styles.reactButton} onClick={setShowComment}>
                <i className='fa-regular fa-comment'></i>
                <span>{blog?.totalComments}</span>
            </div>
        </div>
    );
};

export default Reaction;

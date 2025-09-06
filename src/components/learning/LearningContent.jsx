import React, { useContext, useEffect, useState } from 'react';
import styles from './LearningContent.module.scss';
import LearningVideo from './LearningVideo';
import CommentWrapper from '../utils/comment/CommentWrapper';
import { useSearchParams } from 'react-router-dom';
import { LearningContext } from '../../context/LearningContext';
import { convertSecondsToHMS, formatHHMMSS } from '../../helpers/time';
import LearningNote from './LearningNote';

const LearningContent = ({ isShowMenuTrack, learningLesson }) => {
    const [searchParams] = useSearchParams();

    const { currentTime } = useContext(LearningContext);

    const [isShowComment, setIsShowComment] = useState(false);

    useEffect(() => {
        if (!!searchParams.get('commentId')) {
            setIsShowComment(searchParams.get('commentId'));
        }
    }, [searchParams.get('commentId')]);

    const getUpdatedAt = () => {
        if (!learningLesson) return;

        const d = new Date(learningLesson.updatedAt);
        return `Cập nhật tháng ${d.getMonth() + 1} năm ${d.getFullYear()}`;
    };

    return (
        <div
            className={
                isShowMenuTrack
                    ? styles.wrapper
                    : `${styles.wrapper} ${styles.fullWidth}`
            }
        >
            <LearningVideo />
            <div className={styles.content}>
                <div className={styles.contentTop}>
                    <div className={styles.heading}>
                        <h3>{learningLesson?.title}</h3>
                        <p>{getUpdatedAt()}</p>
                    </div>

                    <LearningNote
                        button={
                            <button className={styles.addNoteButton}>
                                <i className='fa-solid fa-plus'></i>
                                <span className={styles.label}>
                                    Thêm ghi chú tại{' '}
                                    <span className={styles.duration}>
                                        {formatHHMMSS(currentTime)}
                                    </span>
                                </span>
                            </button>
                        }
                    />
                </div>
                <div className={styles.aboutMessage}>
                    <p>
                        Tham gia nhóm{' '}
                        <a
                            rel='noopener noreferrer'
                            target='_blank'
                            href={'https://www.facebook.com/groups/f8official/'}
                        >
                            Học lập trình tại F8
                        </a>{' '}
                        trên Facebook để cùng nhau trao đổi trong quá trình học
                        tập ❤️
                    </p>
                    <p>
                        Các bạn subscribe kênh Youtube{' '}
                        <a
                            rel='noopener noreferrer'
                            target='_blank'
                            href={
                                'https://url.mycv.vn/f8_youtube?ref=lesson_desc'
                            }
                        >
                            F8 Official
                        </a>{' '}
                        để nhận thông báo khi có các bài học mới nhé ❤️
                    </p>
                </div>
                <div
                    className={styles.commentButton}
                    onClick={() => setIsShowComment(true)}
                >
                    <button className={styles.button}>
                        <i className='fa-solid fa-comments'></i>
                        <span className={styles.title}>Hỏi đáp</span>
                    </button>
                </div>
                <CommentWrapper
                    open={isShowComment}
                    onClose={() => setIsShowComment(false)}
                    entity={{
                        entityId: learningLesson?._id,
                        type: 'lessons',
                    }}
                />
            </div>
            <div className={styles.poweredBy}>
                Made with <i className='fa-solid fa-heart'></i>{' '}
                <span className={styles.dot}>.</span> Powered by F8
            </div>
        </div>
    );
};

export default LearningContent;

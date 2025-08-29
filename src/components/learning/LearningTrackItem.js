import React, { useState, useContext, useEffect } from 'react';
import styles from './LearningTrackItem.module.scss';
import { Collapse } from 'react-bootstrap';
import { LearningContext } from '../../context/LearningContext';
import parseDuration from 'youtube-duration-format';

const LearningTrackItem = ({ episodes }) => {
    const [open, setOpen] = useState([]);
    const [active, setActive] = useState(true);

    const {
        isShowMenuTrack,
        handleIsShowMenuTrack,
        learningLessonId,
        playVideo,
        learningEpisode,
    } = useContext(LearningContext);

    useEffect(() => {
        if (!learningEpisode) return;
        setOpen((prev) => [
            ...prev.filter((id) => id != learningEpisode.episodeId),
            learningEpisode.episodeId,
        ]);
    }, [learningEpisode]);

    const handleOpen = (id) =>
        setOpen((prev) => {
            const isOpen = prev.includes(id);
            return isOpen ? prev.filter((item) => item !== id) : [...prev, id];
        });

    // Style lesson item
    const style = (learned, id) => {
        if (learningLessonId === id) {
            return `${styles.lessonItem} ${styles.active}`;
        }
        // if (!learned && active !== id) {
        //     return `${styles.lessonItem} ${styles.locked}`;
        // } else if (active === id) {
        //     return `${styles.lessonItem} ${styles.active}`;
        // }
        return styles.lessonItem;
    };

    if (!episodes) return null;

    return episodes?.map((episode, index) => (
        <div key={episode.episodeId}>
            <div
                className={styles.wrapper}
                onClick={() => handleOpen(episode.episodeId)}
            >
                <h3 className={styles.title}>{episode.title}</h3>
                <span className={styles.description}>2/2 | 22:09</span>
                <span className={styles.icon}>
                    {/* <i className="fa-solid fa-chevron-up"></i> */}
                    <i className='fa-solid fa-chevron-down'></i>
                </span>
            </div>
            <Collapse in={open.includes(episode.episodeId)}>
                <div className={styles.panelBody}>
                    {episode.lessons?.map((lesson, lessonIndex) => (
                        <div
                            className={style(lesson.learned, lesson._id)}
                            key={lesson._id}
                            onClick={() =>
                                playVideo({
                                    lesson,
                                    episode,
                                })
                            }
                        >
                            <div className={styles.lessonInfo}>
                                <h3>{lesson.title}</h3>
                                <p>
                                    <i
                                        className={
                                            active !== lesson._id
                                                ? 'fa-regular fa-circle-play'
                                                : `fa-regular fa-compact-disc ${styles.playingIcon}`
                                        }
                                    ></i>{' '}
                                    {lesson?.time
                                        ? parseDuration(lesson?.time)
                                        : 'N/A'}
                                </p>
                            </div>
                            <div
                                className={
                                    lesson.learned
                                        ? styles.statusIcon
                                        : `${styles.statusIcon} ${styles.locked}`
                                }
                            >
                                {lesson.learned && (
                                    <i className='fa-solid fa-circle-check'></i>
                                )}
                                {!lesson.learned && active !== lesson._id && (
                                    <i className='fa-solid fa-clock-five'></i>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </Collapse>
        </div>
    ));
};

export default LearningTrackItem;

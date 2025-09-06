import React, { useState, useContext, useEffect } from 'react';
import styles from './LearningTrackItem.module.scss';
import { Collapse } from 'react-bootstrap';
import { LearningContext } from '../../context/LearningContext';
import parseDuration from 'youtube-duration-format';
import {
    convertSecondsToHMS,
    formatHHMMSS,
    getTotalSecondsFromYoutubeDuration,
} from '../../helpers/time';

const LearningTrackItem = ({ episodes }) => {
    const [open, setOpen] = useState([]);

    const { getLessonStatus, learningLessonId, playVideo, learningEpisode } =
        useContext(LearningContext);

    useEffect(() => {
        if (!learningEpisode) return;
        setOpen((prev) => [
            ...prev.filter((id) => id != learningEpisode._id),
            learningEpisode._id,
        ]);
    }, [learningEpisode]);

    const handleOpen = (id) =>
        setOpen((prev) => {
            const isOpen = prev.includes(id);
            return isOpen ? prev.filter((item) => item !== id) : [...prev, id];
        });

    // Style lesson item
    const style = (id) => {
        if (learningLessonId === id) {
            return `${styles.lessonItem} ${styles.active}`;
        }
        if (getLessonStatus(id) === 'locked') {
            return `${styles.lessonItem} ${styles.locked}`;
        }
        return styles.lessonItem;
    };

    const totalLearnSeconds = (episode) => {
        return episode?.lessons?.reduce((totalSecondsOfEpisodes, lesson) => {
            return (
                totalSecondsOfEpisodes +
                getTotalSecondsFromYoutubeDuration(lesson?.time)
            );
        }, 0);
    };

    const completedLessons = (episode) => {
        return episode?.lessons?.reduce(
            (acc, cur) =>
                acc + (getLessonStatus(cur?._id) === 'completed' ? 1 : 0),
            0
        );
    };

    const getEpisodeInfo = (episode) => {
        return `${completedLessons(episode)}/${episode?.lessons?.length} |
                    ${formatHHMMSS(totalLearnSeconds(episode))}`;
    };

    if (!episodes) return null;

    return episodes?.map((episode) => (
        <div key={episode._id}>
            <div
                className={styles.wrapper}
                onClick={() => handleOpen(episode._id)}
            >
                <h3 className={styles.title}>{episode.title}</h3>
                <span className={styles.description}>
                    {getEpisodeInfo(episode)}
                </span>
                <span
                    className={`${styles.icon} ${
                        open.includes(episode._id) ? styles.open : ''
                    }`}
                >
                    <i className='fa-solid fa-chevron-up'></i>
                </span>
            </div>
            <Collapse in={open.includes(episode._id)}>
                <div className={styles.panelBody}>
                    {episode.lessons?.map((lesson) => (
                        <div
                            className={style(lesson._id)}
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
                                            learningLessonId !== lesson._id
                                                ? 'fa-regular fa-circle-play'
                                                : `fa-solid fa-compact-disc ${styles.playingIcon}`
                                        }
                                    ></i>{' '}
                                    {lesson?.time
                                        ? parseDuration(lesson?.time)
                                        : 'N/A'}
                                </p>
                            </div>
                            <div
                                className={
                                    getLessonStatus(lesson._id) === 'completed'
                                        ? styles.statusIcon
                                        : `${styles.statusIcon} ${styles.locked}`
                                }
                            >
                                {getLessonStatus(lesson._id) ===
                                    'completed' && (
                                    <i className='fa-solid fa-circle-check'></i>
                                )}
                                {getLessonStatus(lesson._id) === 'locked' && (
                                    <i className='fa-solid fa-lock'></i>
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

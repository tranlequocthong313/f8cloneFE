import React, { useState, useEffect, useMemo } from 'react';
import CourseCollapse from './CourseCollapse';
import styles from './CurriculumOfCourse.module.scss';
import '../../sass/_float.scss';
const CurriculumOfCourse = ({ episodeList, totalDuration, totalLesson }) => {
    const [collapsedCurriculum, setCollapsedCurriculum] = useState([]);
    const [collapsedCurriculumAll, setCollapsedCurriculumAll] = useState([]);
    const [isCollapsedCurriculumAll, setIsCollapsedCurriculumAll] =
        useState(false);

    useEffect(() => {
        episodeList?.map((episode) =>
            setCollapsedCurriculumAll((prev) => [...prev, episode.episodeId])
        );
    }, [episodeList]);

    const collapseCurriculumSingle = (id) =>
        setCollapsedCurriculum((prev) => {
            const isOpen = prev.includes(id);
            if (isOpen) {
                const newCollapsed = prev.filter((item) => item !== id);
                newCollapsed.length !== collapsedCurriculumAll.length &&
                    setIsCollapsedCurriculumAll(false);
                return newCollapsed;
            }
            const newCollapsed = [...prev, id];
            newCollapsed.length === collapsedCurriculumAll.length &&
                setIsCollapsedCurriculumAll(true);
            return newCollapsed;
        });

    const handleCollapseCurriculumAll = () => {
        if (!isCollapsedCurriculumAll) {
            setCollapsedCurriculum((prev) => [
                ...prev,
                ...collapsedCurriculumAll,
            ]);
            setIsCollapsedCurriculumAll(true);
            return;
        }
        setCollapsedCurriculum([]);
        setIsCollapsedCurriculumAll(false);
    };

    return (
        <div className={styles.curriculumOfCourse}>
            <div className={styles.headerSticky}>
                <div className={styles.headerBlock}>
                    <h3 className={'floatLeft'}>Nội dung khóa học</h3>
                </div>
            </div>
            <div className={styles.subHeadWrapper}>
                <ul>
                    <li>
                        <strong>{episodeList?.length}</strong> chương
                    </li>
                    <li className={styles.dot}>.</li>
                    <li>
                        <strong>{totalLesson}</strong> bài học
                    </li>
                    <li className={styles.dot}>.</li>
                    <li>
                        Thời lượng <strong>{totalDuration}</strong>
                    </li>
                </ul>
                <div
                    className={styles.toggleBtn}
                    onClick={handleCollapseCurriculumAll}
                >
                    {!isCollapsedCurriculumAll
                        ? 'Mở rộng tất cả'
                        : 'Thu nhỏ tất cả'}
                </div>
            </div>
            <div className={styles.curriculumPanel}>
                <div className={styles.panelGroup}>
                    {episodeList?.map((episode, index) => (
                        <div className={styles.panel} key={episode.episodeId}>
                            <div
                                className={styles.panelHeading}
                                onClick={() =>
                                    collapseCurriculumSingle(episode.episodeId)
                                }
                            >
                                <h5 className={styles.panelTitle}>
                                    <div className={styles.headLine}>
                                        {collapsedCurriculum.includes(
                                            episode.episodeId
                                        ) ? (
                                            <i className='fa-solid fa-dash'></i>
                                        ) : (
                                            <i className='fa-solid fa-plus'></i>
                                        )}
                                        <div
                                            className={`${styles.floatLeft} ${styles.groupName}`}
                                        >
                                            <strong>{episode.title}</strong>
                                        </div>
                                        <span
                                            className={`floatRight ${styles.timeOfSection}`}
                                        >
                                            {episode.lessons.length} bài học
                                        </span>
                                    </div>
                                </h5>
                            </div>
                            <CourseCollapse
                                open={collapsedCurriculum}
                                episodeId={episode.episodeId}
                                lessons={episode.lessons}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CurriculumOfCourse;

import { Link } from 'react-router-dom';
import MainButton from '../../utils/button/MainButton';
import MainCard from '../../utils/card/MainCard';
import VerticalProgressBar from '../../utils/vertical-progress-bar/VerticalProgressBar';
import styles from './CourseItem.module.scss';
import { useSelector } from 'react-redux';
import {
    convertSecondsToHMS,
    formatHHMMSS,
    getTotalSecondsFromYoutubeDuration,
} from '../../../helpers/time';
import { useMemo } from 'react';
import { Placeholder } from 'react-bootstrap';

const CourseItem = ({ course, path }) => {
    const user = useSelector((state) => state.user);

    const formatStudentCount = (studentCount) =>
        new Intl.NumberFormat(['ban', 'id']).format(+studentCount);

    const enrolledCourse = () => {
        return user?.coursesEnrolled?.includes(course?._id);
    };

    const totalLearnSeconds = useMemo(() => {
        return course?.episodes?.reduce((totalSeconds, episode) => {
            return (
                totalSeconds +
                episode?.lessons?.reduce((totalSecondsOfEpisodes, lesson) => {
                    return (
                        totalSecondsOfEpisodes +
                        getTotalSecondsFromYoutubeDuration(lesson?.time)
                    );
                }, 0)
            );
        }, 0);
    }, [course]);

    const totalLessons = useMemo(() => {
        return course?.episodes?.flatMap((ep) => ep.lessons)?.length || 0;
    }, [course]);

    const getTotalLearnTime = () => {
        const { hours, minutes } = convertSecondsToHMS(totalLearnSeconds);
        if (hours > 0) {
            return `${hours}h${minutes}p`;
        }
        return `${minutes}p`;
    };

    return (
        <MainCard className={styles.card}>
            <Link
                to={
                    enrolledCourse()
                        ? `/learning/${course?.slug}`
                        : `/courses/${course?.slug}`
                }
            >
                <section
                    title={course?.title}
                    style={{ backgroundImage: `url(${course?.image})` }}
                />
            </Link>
            <div className={styles.body}>
                <h4 className={styles.title}>
                    <Link
                        to={
                            enrolledCourse()
                                ? `/learning/${course?.slug}`
                                : `/courses/${course?.slug}`
                        }
                    >
                        {course?.title}
                    </Link>
                </h4>
                {!path && (
                    <div className={styles.info}>
                        <p>
                            <i className='fa-solid fa-users'></i>
                            <span>
                                {formatStudentCount(course?.studentCount)}
                            </span>
                        </p>
                        <p>
                            <i className='fa-solid fa-circle-play'></i>
                            <span>{totalLessons}</span>
                        </p>
                        <p>
                            <i className='fa-solid fa-clock'></i>
                            <span>{getTotalLearnTime()}</span>
                        </p>
                    </div>
                )}
            </div>
            {/* {path && (
                <div className={styles.progress}>
                    <p>Học cách đây 23 ngày trước</p>
                    <VerticalProgressBar tooltip={'50%'} />
                </div>
            )} */}
        </MainCard>
    );
};

export const SkeletonCourseItem = () => {
    return (
        <MainCard className={styles.card}>
            <Placeholder style={{ paddingTop: '56.25%' }} />
            <div className={styles.body}>
                <Placeholder xs={8} style={{ marginBottom: 44 }} />
                <div className={styles.info}>
                    <Placeholder xs={3} />
                    <Placeholder xs={2} />
                    <Placeholder xs={2} />
                </div>
            </div>
        </MainCard>
    );
};

export default CourseItem;

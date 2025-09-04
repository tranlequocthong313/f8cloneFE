import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import MainButton from '../utils/button/MainButton';
import styles from './CourseEnroll.module.scss';
import { COURSE_LEVEL } from './CourseSlug';

const CourseEnroll = ({
    show,
    course,
    handleEnrollCourse,
    totalLesson,
    totalDuration,
}) => {
    return (
        <div className={styles.purchaseBadge}>
            <div className={styles.imgPreview} onClick={show}>
                <div
                    className={styles.backgroundImg}
                    style={{ backgroundImage: `url(${course?.image})` }}
                ></div>
                <i className={`${styles.icon} fa-solid fa-circle-play`}></i>
                <p>Xem giới thiệu khóa học</p>
            </div>
            <h5>Miễn phí</h5>
            <MainButton
                className={styles.button}
                primary={true}
                onClick={handleEnrollCourse}
            >
                Đăng ký học
            </MainButton>
            <ul>
                <li>
                    <i className={`${styles.icon} fa-solid fa-compass`}></i>
                    <span>
                        Trình độ {COURSE_LEVEL[course?.level?.toLowerCase()]}
                    </span>
                </li>
                <li>
                    <i className={`${styles.icon} fa-solid fa-film`} />
                    <span>
                        Tổng số <strong>{totalLesson}</strong> bài học
                    </span>
                </li>
                <li>
                    <i className={`${styles.icon} fa-solid fa-clock`}></i>
                    <span>
                        Thời lượng <strong>{totalDuration}</strong>
                    </span>
                </li>
                <li>
                    <i
                        className={`${styles.icon} fa-solid fa-battery-full`}
                    ></i>
                    <span>Học mọi lúc, mọi nơi</span>
                </li>
            </ul>
        </div>
    );
};

export default CourseEnroll;

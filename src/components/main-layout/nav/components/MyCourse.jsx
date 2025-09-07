import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import styles from './MyCourse.module.scss';
import Tippy from '../../../utils/tippy/Tippy';
import { useSelector } from 'react-redux';
import { apiURL } from '../../../../context/constants';
import Cookies from 'js-cookie';
import timeSince from '../../../utils/timeSince/timeSince';

const CourseItem = ({ course }) => {
    const user = useSelector((state) => state.user);

    const enrolledCourse = () => {
        return user?.coursesEnrolled?.includes(course?._id);
    };

    const to = enrolledCourse()
        ? `/learning/${course?.slug}`
        : `/courses/${course?.slug}`;

    return (
        <div className={styles.body}>
            <Link to={to} className={styles.thumb}>
                <Image src={course?.image} />
            </Link>
            <div className={styles.info}>
                <h3>
                    <Link to={to}>{course?.title}</Link>
                </h3>
                {!course?.progress ? (
                    <>
                        <p>Bạn chưa học khóa này</p>
                        <Link to={to} className={styles.startButton}>
                            Bắt đầu học
                        </Link>
                    </>
                ) : (
                    <>
                        <p>Học cách đây {timeSince(course?.lastLearnedAt)}</p>
                        <OverlayTrigger
                            placement='bottom'
                            overlay={<Tooltip>{course?.progress}%</Tooltip>}
                        >
                            <div
                                className={styles.progress}
                                style={{ '--progress': `${course?.progress}%` }}
                            ></div>
                        </OverlayTrigger>
                    </>
                )}
            </div>
        </div>
    );
};

const MyCourse = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const getCourses = async () => {
            const token = Cookies.get('token');
            if (!token) return;

            try {
                const res = await fetch(`${apiURL}/me/enrolled-courses`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();

                setCourses(data?.courses || []);
            } catch (error) {
                console.log('🚀 ~ getCourses ~ error:', error);
            }
        };

        getCourses();
    }, []);

    return (
        <>
            <Tippy
                button={
                    <span className={styles.userCourse}>Khóa học của tôi</span>
                }
                className={styles.wrapper}
            >
                <div onClick={(e) => e.stopPropagation()}>
                    <header className={styles.header}>
                        <h5>Khóa học của tôi</h5>
                        {/* <Link to='/my-course' className={styles.viewAll}>
                            Xem tất cả
                        </Link> */}
                    </header>

                    {!courses ||
                        (!courses.length && (
                            <p className={styles.emptyMessage}>
                                Bạn chưa đăng ký khóa học nào
                            </p>
                        ))}
                    {courses?.map((course) => (
                        <CourseItem key={course._id} course={course} />
                    ))}
                </div>
            </Tippy>
        </>
    );
};

export default MyCourse;

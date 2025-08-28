import React from 'react';
import styles from './ProfileCourses.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CoursesEnrolled = ({ user }) => {
    const loginUser = useSelector((state) => state.user);

    const enrolledCourse = (course) => {
        return loginUser?.coursesEnrolled?.includes(course?._id);
    };

    const to = (course) =>
        enrolledCourse(course)
            ? `/learning/${course?.slug}`
            : `/courses/${course?.slug}`;

    if (!user) return null;

    return (
        <div className={styles.wrapper}>
            <h4 className={styles.title}>Các khóa học đã tham gia</h4>
            {!user?.coursesEnrolled ||
                (!user?.coursesEnrolled.length && (
                    <p className={styles.noResult}>
                        Chưa có khóa học nào được đăng ký
                    </p>
                ))}
            {user?.coursesEnrolled?.map((course) => {
                return (
                    <div key={course._id} className={styles.course}>
                        <Link to={to(course)} className={styles.image}>
                            <img alt='' src={course.image} />
                        </Link>
                        <div className={styles.info}>
                            <h3 className={styles.title}>
                                <Link to={to(course)}>{course.title}</Link>
                            </h3>
                            <p className={styles.description}>
                                {course.description}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CoursesEnrolled;

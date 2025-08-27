import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import styles from './MyCourse.module.scss';
import Tippy from '../../../utils/tippy/Tippy';

const CourseItem = () => {
    return (
        <div className={styles.body}>
            <Link to='/my-course' className={styles.thumb}>
                <Image src='https://files.fullstack.edu.vn/f8-prod/courses/7.png' />
            </Link>
            <div className={styles.info}>
                <h3>
                    <Link to='/my-course'>Kiến Thức Nhập Môn IT</Link>
                </h3>
                <p>Bạn chưa học khóa này</p>
                <Link to='/my-course' className={styles.startButton}>
                    Bắt đầu học
                </Link>
            </div>
        </div>
    );
};

const MyCourse = () => {
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
                        <Link to='/my-course' className={styles.viewAll}>
                            Xem tất cả
                        </Link>
                    </header>
                    <CourseItem />
                </div>
            </Tippy>
        </>
    );
};

export default MyCourse;

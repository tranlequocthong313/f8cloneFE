import React, { useEffect, useState } from 'react';
import styles from './LearningList.module.scss';
import SecondaryCard from '../utils/card/SecondaryCard';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import CircularProgressBar from '../utils/circular-progress-bar/CircularProgressBar';
import thumb1 from '../../asset/images/61a0439062b82.png';
import thumb2 from '../../asset/images/61a0439cc779b.png';
import MainButton from '../utils/button/MainButton';
import Cookies from 'js-cookie';
import { apiURL } from '../../context/constants';

const LearningList = () => {
    const [fetCourses, setFeCourses] = useState([]);
    const [beCourses, setBeCourses] = useState([]);

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

                setFeCourses(
                    data?.courses.filter((course) =>
                        ['FE', 'Fullstack'].includes(course.role)
                    )
                );
                setBeCourses(
                    data?.courses.filter((course) =>
                        ['BE', 'Fullstack'].includes(course.role)
                    )
                );
            } catch (error) {
                console.log('🚀 ~ getCourses ~ error:', error);
            }
        };

        getCourses();
    }, []);

    return (
        <div className={styles.content}>
            <div className={styles.wrapper}>
                <SecondaryCard forPage={'learningPath'}>
                    <div className={styles.body}>
                        <div className={styles.info}>
                            <h2 className={styles.title}>
                                Lộ trình học Front-end
                            </h2>
                            <p>
                                Lập trình viên Front-end là người xây dựng ra
                                giao diện websites. Trong phần này F8 sẽ chia sẻ
                                cho bạn lộ trình để trở thành lập trình viên
                                Front-end nhé.
                            </p>
                        </div>
                        <div className={styles.thumbWrap}>
                            <div className={styles.thumbRound}>
                                <Image src={thumb1} className={styles.thumb} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.cta}>
                        {fetCourses?.map((course) => {
                            if (!course?.icon) return;
                            return (
                                <Link to={`/learning/${course?.slug}`} key={course?._id}>
                                    <CircularProgressBar
                                        logo={course?.icon}
                                        numberPercent={course?.progress / 100}
                                        tooltip={course?.title}
                                        strokedColor={'#d4d4d4'}
                                    />
                                </Link>
                            );
                        })}
                    </div>
                </SecondaryCard>
            </div>
            <div className={styles.wrapper}>
                <SecondaryCard forPage={'learningPath'}>
                    <div className={styles.body}>
                        <div className={styles.info}>
                            <h2 className={styles.title}>
                                Lộ trình học Back-end
                            </h2>
                            <p>
                                Trái với Front-end thì lập trình viên Back-end
                                là người làm việc với dữ liệu, công việc thường
                                nặng tính logic hơn. Chúng ta sẽ cùng tìm hiểu
                                thêm về lộ trình học Back-end nhé.
                            </p>
                        </div>
                        <div className={styles.thumbWrap}>
                            <div className={styles.thumbRound}>
                                <Image src={thumb2} className={styles.thumb} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.cta}>
                        {beCourses?.map((course) => {
                            if (!course?.icon) return;
                            return (
                                <Link to={`/learning/${course?.slug}`} key={course?._id}>
                                    <CircularProgressBar
                                        logo={course?.icon}
                                        numberPercent={course?.progress / 100}
                                        tooltip={course?.title}
                                        strokedColor={'#d4d4d4'}
                                    />
                                </Link>
                            );
                        })}
                    </div>
                </SecondaryCard>
            </div>
        </div>
    );
};

export default LearningList;

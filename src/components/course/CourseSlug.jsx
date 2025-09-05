import React, { useEffect, useState, Suspense, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Row, Col, Modal } from 'react-bootstrap';
import Header from '../main-layout/nav/Header';
import SideBar from '../main-layout/sidebar/SideBar';
import CourseDetail from './CourseDetail';
import CourseEnroll from './CourseEnroll';
import styles from './CourseSlug.module.scss';
import CurriculumOfCourse from './CurriculumOfCourse';
import PreviewCourse from './PreviewCourse';
import { apiURL } from '../../context/constants';
import MainButton from '../utils/button/MainButton';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import {
    convertSecondsToHMS,
    getTotalSecondsFromYoutubeDuration,
} from '../../helpers/time';
import { enrollCourse } from '../../actions/userAction';
import VideoPlayer from './VideoPlayer';

const Footer = React.lazy(() => import('../main-layout/footer/Footer'));

export const COURSE_LEVEL = {
    begineer: 'cơ bản',
    intermediate: 'trung cấp',
    advance: 'nâng cao',
};

const CourseSlug = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [course, setCourse] = useState();
    const [isShowVideoPreviewCourse, setIsShowVideoPreviewCourse] =
        useState(false);

    const user = useSelector((state) => state.user);

    const showVideoPreviewCourse = () =>
        setIsShowVideoPreviewCourse((prev) => !prev);

    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            try {
                const res = await fetch(`${apiURL}${location.pathname}`, {
                    signal: controller.signal,
                });
                const data = await res.json();
                setCourse(data);
                document.title = `${data.title} | by F8`;
            } catch (error) {
                console.log(error.message);
            }
        })();

        return () => controller?.abort();
    }, []);

    const handleEnrollCourse = async () => {
        if (!course || !course._id || !user.isLoggedIn) return;
        const token = Cookies.get('token');
        if (!token) return;
        try {
            await fetch(`${apiURL}/courses/${course._id}/enroll`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch(enrollCourse(course._id));
            navigate(`/learning/${course.slug}`);
        } catch (error) {
            console.log('🚀 ~ handleEnrollCourse ~ error:', error);
        }
    };

    const totalLesson = useMemo(() => {
        return course?.episodes?.reduce((acc, cur) => {
            return cur?.lessons?.length + acc;
        }, 0);
    }, [course]);

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

    const getTotalDuration = () => {
        const { hours, minutes } =
            convertSecondsToHMS(totalLearnSeconds);
        let result = '';

        if (hours > 0) {
            result += `${hours} giờ`;
        }

        if (minutes > 0) {
            result += ` ${minutes} phút`;
        }

        return result;
    };

    return (
        <>
            <Header />
            <Row>
                <Col xs={0} sm={0} md={1} lg={1} xl={1}>
                    <SideBar />
                </Col>
                <Col xs={12} sm={12} md={12} lg={11} xl={11}>
                    <div className='withSidebarContent'>
                        <Row className={styles.wrapper}>
                            <Col lg={12} xl={8}>
                                <div className={styles.topHeading}>
                                    <h3>{course?.title}</h3>
                                    <p>{course?.description}</p>
                                </div>
                                <div className={styles.purchaseBadge}>
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
                                            <i
                                                className={`${styles.icon} fa-solid fa-compass`}
                                            ></i>
                                            <span>
                                                Trình độ{' '}
                                                {
                                                    COURSE_LEVEL[
                                                        course?.level?.toLowerCase()
                                                    ]
                                                }
                                            </span>
                                        </li>
                                        <li>
                                            <i
                                                className={`${styles.icon} fa-solid fa-film`}
                                            />
                                            <span>
                                                Tổng số{' '}
                                                <strong>{totalLesson}</strong>{' '}
                                                bài học
                                            </span>
                                        </li>
                                        <li>
                                            <i
                                                className={`${styles.icon} fa-solid fa-clock`}
                                            ></i>
                                            <span>
                                                Thời lượng{' '}
                                                <strong>
                                                    {getTotalDuration()}
                                                </strong>
                                            </span>
                                        </li>
                                        <li>
                                            <i
                                                className={`${styles.icon} fa-solid fa-clock`}
                                            ></i>
                                            <span>Học mọi lúc, mọi nơi</span>
                                        </li>
                                    </ul>
                                </div>
                                <CourseDetail
                                    topicList={course?.topics || []}
                                    title={'Bạn sẽ học được gì?'}
                                />
                                <CurriculumOfCourse
                                    episodeList={course?.episodes || []}
                                    totalDuration={getTotalDuration()}
                                    totalLesson={totalLesson}
                                />
                                <CourseDetail
                                    topicList={course?.requirement || []}
                                    title={'Yêu cầu'}
                                />
                            </Col>
                            <Col lg={12} xl={4}>
                                <CourseEnroll
                                    handleEnrollCourse={handleEnrollCourse}
                                    showVideo={showVideoPreviewCourse}
                                    course={course}
                                    totalLesson={totalLesson}
                                    totalDuration={getTotalDuration()}
                                />
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>

            <div className={styles.mobileButtonWrapper}>
                <Link to={`/learning/${course ? course.slug : ''}`}>
                    <MainButton className={styles.mobileButton} primary={true}>
                        ĐĂNG KÝ MIỄN PHÍ
                    </MainButton>
                </Link>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <Footer />
            </Suspense>
            {isShowVideoPreviewCourse && (
                <PreviewCourse
                    previewVideo={course?.videoId}
                    showVideo={showVideoPreviewCourse}
                />
            )}

        </>
    );
};

export default CourseSlug;

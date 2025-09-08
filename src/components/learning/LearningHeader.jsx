import React, { useContext, useEffect, useRef } from 'react';
import { Navbar, Image } from 'react-bootstrap';
import styles from './LearningHeader.module.scss';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import logo from '../../asset/images/f8_icon.png';
import CircularProgressBar from '../utils/circular-progress-bar/CircularProgressBar';
import { LearningContext } from '../../context/LearningContext';
import LearningNoteList from './LearningNoteList';
import { useTour } from '@reactour/tour';
import { useDispatch, useSelector } from 'react-redux';
import { apiURL, LEARNING_TUTORIAL_STEPS } from '../../context/constants';
import { completeTutorial } from '../../actions/userAction';

const LearningHeader = () => {
    const {
        totalCompletedLessons,
        totalLessons,
        learningEpisode,
        pauseVideo,
        showMenuTrack,
        unPauseVideo,
    } = useContext(LearningContext);

    const dispatch = useDispatch();
    const hasOpened = useRef(false);

    const user = useSelector((state) => state.user);

    const { isOpen, setIsOpen, setSteps } = useTour();

    useEffect(() => {
        if (!user || !user.isLoggedIn) return;
        if (!user.completedTutorial) {
            pauseVideo()
            setIsOpen(true);
            setSteps(LEARNING_TUTORIAL_STEPS({ user }));
        }
    }, [user]);

    useEffect(() => {
        if (isOpen) {
            pauseVideo();
            hasOpened.current = true;
        } else {
            unPauseVideo();

            if (!hasOpened.current) return;

            if (user.completedTutorial) return;

            const token = Cookies.get('token');
            if (!token) return;

            fetch(`${apiURL}/me/completed-tutorial`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(() => {
                    console.log('run here?');
                    dispatch(() => completeTutorial());
                })
                .catch((err) => {
                    console.log('🚀 ~ LearningHeader ~ err:', err);
                });
        }
    }, [isOpen, user]);

    return (
        <Navbar className={styles.navHeader}>
            <Link to='/' className={styles.backHome}>
                <i className='fa-solid fa-chevron-left'></i>
            </Link>
            <Navbar.Brand className={styles.logo}>
                <Link to='/'>
                    <Image src={logo} className={styles.logoNavbar} />
                </Link>
                <h4 className={styles.logoHeading}>{learningEpisode?.title}</h4>
            </Navbar.Brand>
            <div className={styles.userAction}>
                <div className={styles.progressBar}>
                    <CircularProgressBar
                        numberPercent={totalCompletedLessons / totalLessons}
                        className={styles.circularProgress}
                    />
                    <p>
                        <strong>
                            {totalCompletedLessons}/{totalLessons}
                        </strong>{' '}
                        bài học
                    </p>
                </div>
                <LearningNoteList
                    button={
                        <button className={styles.actionButton}>
                            <i className='fa-solid fa-file'></i>{' '}
                            <span>Ghi chú</span>
                        </button>
                    }
                />
                <button
                    className={`${styles.actionButton} ${styles.actionHelpButton}`}
                    onClick={(e) => {
                        pauseVideo();
                        setIsOpen(true);
                        setSteps(LEARNING_TUTORIAL_STEPS({ user }));
                        showMenuTrack();
                    }}
                >
                    <i className='fa-solid fa-circle-question'></i>{' '}
                    <span>Hướng dẫn</span>
                </button>
            </div>
        </Navbar>
    );
};

export default LearningHeader;

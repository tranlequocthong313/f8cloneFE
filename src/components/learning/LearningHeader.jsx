import React, { useContext } from 'react';
import { Navbar, Image } from 'react-bootstrap';
import styles from './LearningHeader.module.scss';
import { Link } from 'react-router-dom';
import logo from '../../asset/images/f8_icon.png';
import CircularProgressBar from '../utils/circular-progress-bar/CircularProgressBar';
import { LearningContext } from '../../context/LearningContext';
import Panel from '../utils/panel/Panel';
import LearningNoteList from './LearningNoteList';

const LearningHeader = () => {
    const { totalCompletedLessons, totalLessons } = useContext(LearningContext);

    return (
        <Navbar className={styles.navHeader}>
            <Link to='/' className={styles.backHome}>
                <i className='fa-solid fa-chevron-left'></i>
            </Link>
            <Navbar.Brand className={styles.logo}>
                <Link to='/'>
                    <Image src={logo} className={styles.logoNavbar} />
                </Link>
                <h4 className={styles.logoHeading}>Học Lập Trình Để Đi Làm</h4>
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
                <button className={styles.actionButton}>
                    <i className='fa-solid fa-circle-question'></i>{' '}
                    <span>Hướng dẫn</span>
                </button>
            </div>
        </Navbar>
    );
};

export default LearningHeader;

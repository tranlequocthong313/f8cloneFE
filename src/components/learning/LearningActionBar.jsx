import styles from './LearningActionBar.module.scss';
import Panel from '../utils/panel/Panel';
import LearningTrackItem from './LearningTrackItem';
import { useContext } from 'react';
import { LearningContext } from '../../context/LearningContext';

const LearningActionBar = ({
    episodes,
    toggleShowMenuTrack,
    isShowMenuTrack,
    loading,
}) => {
    const { goNextLesson, goPrevLesson, learningLessonId, learningEpisode } =
        useContext(LearningContext);

    return (
        <div className={styles.wrapper}>
            {learningLessonId && (
                <>
                    <button className={styles.button} onClick={goPrevLesson}>
                        <i className='fa-solid fa-chevron-left'></i>
                        <span>BÀI TRƯỚC</span>
                    </button>
                    <button
                        className={`${styles.button} ${styles.primary} ${styles.disabled}`}
                        onClick={goNextLesson}
                    >
                        <span>BÀI TIẾP THEO</span>
                        <i className='fa-solid fa-chevron-right'></i>
                    </button>
                </>
            )}
            <div
                className={styles.toggleTrackMenu}
                onClick={toggleShowMenuTrack}
            >
                <h4 className={styles.title}>{learningEpisode?.title}</h4>
                <button className={styles.toggleButton}>
                    {!isShowMenuTrack && <i className='fa-solid fa-bars'></i>}
                    {isShowMenuTrack && (
                        <i className='fa-solid fa-arrow-right'></i>
                    )}
                </button>
            </div>

            <div className={styles.mobileAndTabletTrack}>
                <Panel
                    button={
                        <div className={styles.toggleTrackMenu}>
                            <h4 className={styles.title}>
                                {learningEpisode?.title}
                            </h4>
                            <button className={styles.toggleButton}>
                                <i className='fa-solid fa-bars'></i>
                            </button>
                        </div>
                    }
                    closeButton={true}
                    hideOnComputer={true}
                    header={
                        <h4 style={{ fontSize: 16, fontWeight: 600 }}>
                            Nội dung khóa học
                        </h4>
                    }
                    className={styles.modalWrapper}
                >
                    <div className={styles.container}>
                        <div className={styles.body}>
                            <LearningTrackItem episodes={episodes} />
                        </div>
                    </div>
                </Panel>
            </div>
        </div>
    );
};

export default LearningActionBar;

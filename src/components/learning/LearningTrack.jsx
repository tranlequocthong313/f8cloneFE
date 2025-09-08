import React from 'react';
import styles from './LearningTrack.module.scss';
import LearningTrackItem from './LearningTrackItem';

const LearningTrack = ({ episodes }) => {
    return (
        <div className={styles.wrapper} id='learning-track'>
            <div className={styles.container}>
                <header className={styles.heading}>
                    <h4>Nội dung khóa học</h4>
                </header>
                <div className={styles.body}>
                    <LearningTrackItem episodes={episodes} />
                </div>
            </div>
        </div>
    );
};

export default LearningTrack;

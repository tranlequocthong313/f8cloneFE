import React, { useContext } from 'react';
import { LearningContext } from '../../context/LearningContext';
import VideoPlayer from '../course/VideoPlayer';
import styles from './LearningVideo.module.scss';

const LearningVideo = () => {
    const { onEnd, show, videoId, setPlay, play } = useContext(LearningContext);

    return (
        <div
            className={
                show ? styles.wrapper : `${styles.wrapper} ${styles.fullWidth}`
            }
        >
            <VideoPlayer
                onEnd={onEnd}
                onClick={() => setPlay(true)}
                videoId={videoId ? videoId : ''}
                play={play}
            />
        </div>
    );
};

export default LearningVideo;

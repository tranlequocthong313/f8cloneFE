import React, { useContext } from 'react';
import { LearningContext } from '../../context/LearningContext';
import VideoPlayer from '../course/VideoPlayer';
import styles from './LearningVideo.module.scss';

const LearningVideo = () => {
    const { onEnd, show, videoId, setPlay, isPause, setCurrentTime, playAt } =
        useContext(LearningContext);

    return (
        <div
            className={
                show ? styles.wrapper : `${styles.wrapper} ${styles.fullWidth}`
            }
        >
            <VideoPlayer
                playAt={playAt}
                isPause={isPause}
                onEnd={onEnd}
                onClick={() => setPlay(true)}
                videoId={videoId ? videoId : ''}
                setCurrentTime={setCurrentTime}
            />
        </div>
    );
};

export default LearningVideo;

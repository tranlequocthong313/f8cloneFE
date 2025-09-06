import React, { useEffect, useRef } from 'react';
import Youtube from 'react-youtube';
import styles from './VideoPlayer.module.scss';

const VideoPlayer = ({
    videoId = null,
    onClick = () => {},
    onEnd = () => {},
    isPause = false,
    autoPlay = true,
    setCurrentTime,
    playAt = 0,
}) => {
    const ref = useRef(null);

    const youtubeVideoOptions = {
        playerVars: {
            autoplay: autoPlay ? 1 : 0,
            start: playAt,
        },
    };

    const handleReady = (event) => {
        ref.current = event.target;
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (ref.current) {
                setCurrentTime?.(Math.round(ref.current.getCurrentTime()));
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [setCurrentTime]);

    useEffect(() => {
        if (!ref.current) return;
        if (!videoId) return;

        try {
            if (isPause) {
                ref.current.pauseVideo();
            } else {
                ref.current.playVideo();
            }
        } catch (error) {
            console.log('🚀 ~ VideoPlayer ~ error:', error);
        }
    }, [isPause, videoId]);

    return (
        <div className={styles.wrapper}>
            {videoId && (
                <Youtube
                    videoId={videoId}
                    opts={youtubeVideoOptions}
                    onEnd={onEnd}
                    onReady={handleReady}
                />
            )}
            {!videoId && (
                <div className={styles.player} onClick={onClick}>
                    <div className={styles.noVideo}>
                        <div className={styles.playButton}>
                            <div className={styles.playIcon}></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoPlayer;

import React, { useEffect, useRef } from 'react';
import Youtube from 'react-youtube';
import styles from './VideoPlayer.module.scss';

const VideoPlayer = ({
    videoId,
    onClick,
    page,
    onEnd,
    play,
    autoPlay = true,
    setCurrentTime,
}) => {
    const ref = useRef(null);

    const youtubeVideoOptions = {
        playerVars: {
            autoplay: autoPlay ? 1 : 0,
        },
    };

    const handleReady = (event) => {
        ref.current = event.target;
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime?.(Math.round(ref.current?.getCurrentTime()));
        }, 1000);

        return () => clearInterval(intervalId);
    }, [ref.current]);

    return (
        <div className={styles.wrapper}>
            {play && (
                <Youtube
                    videoId={videoId}
                    opts={youtubeVideoOptions}
                    onEnd={onEnd}
                    onReady={handleReady}
                />
            )}
            {!play && (
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

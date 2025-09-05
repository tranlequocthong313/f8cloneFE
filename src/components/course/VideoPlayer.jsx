import React from 'react';
import Youtube from 'react-youtube';
import styles from './VideoPlayer.module.scss';

const VideoPlayer = ({
    videoId,
    onClick,
    page,
    onEnd,
    play,
    autoPlay = true,
}) => {
    console.log('🚀 ~ VideoPlayer ~ videoId:', videoId);
    const youtubeVideoOptions = {
        playerVars: {
            autoplay: autoPlay ? 1 : 0,
        },
    };

    return (
        <div className={styles.wrapper}>
            {play && (
                <Youtube
                    videoId={videoId}
                    opts={youtubeVideoOptions}
                    onEnd={onEnd}
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

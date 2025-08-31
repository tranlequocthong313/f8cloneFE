import React from 'react';
import CardButton from '../../utils/card/CardButton';
import MainCard from '../../utils/card/MainCard';
import styles from './VideoItem.module.scss';
import youtubeDurationFormat from 'youtube-duration-format';
import MainButton from '../../utils/button/MainButton';

const VideoItem = ({ video }) => {
    const formatYoutubeStatistic = (number) =>
        new Intl.NumberFormat(['ban', 'id']).format(number);

    const formatYoutubeDuration = (duration) => {
        try {
            const durationFormatted = youtubeDurationFormat(duration);
            return durationFormatted;
        } catch (error) {
            return duration;
        }
    };

    return (
        <MainCard>
            <a
                rel='noopener noreferrer'
                target='_blank'
                href={`https://www.youtube.com/watch?v=${video.videoId}`}
            >
                <section
                    title={video.title}
                    style={{ backgroundImage: `url(${video.image})` }}
                >
                    <MainButton className={styles.button}>Xem video</MainButton>
                    <div className={styles.videoInfo}>
                        <div className={styles.playWrap}>
                            <i className='fa-solid fa-play'></i>
                        </div>
                        <div className={styles.duration}>
                            {formatYoutubeDuration(video.duration)}
                            {/* {video.duration} */}
                        </div>
                        <div></div>
                    </div>
                </section>
            </a>
            <h4 className={styles.title}>
                <a
                    rel='noopener noreferrer'
                    target='_blank'
                    href={`https://www.youtube.com/watch?v=${video.videoId}`}
                >
                    {video.title}
                </a>
            </h4>
            <ul className={styles.stats}>
                <li>
                    <i className='fa-solid fa-eye'></i>
                    <span>{formatYoutubeStatistic(video.viewCount)}</span>
                </li>
                <li>
                    <i className='fa-solid fa-thumbs-up'></i>
                    <span>{formatYoutubeStatistic(video.likeCount)}</span>
                </li>
                <li>
                    <i className='fa-solid fa-comment'></i>
                    <span>{formatYoutubeStatistic(video.commentCount)}</span>
                </li>
            </ul>
        </MainCard>
    );
};

export default VideoItem;

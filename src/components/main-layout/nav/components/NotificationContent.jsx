import { Link } from 'react-router-dom';
import styles from './Notification.module.scss';
import f8logo from '../../../../asset/images/f8_icon.png';
import timeSince from '../../../utils/timeSince/timeSince';
import { TippyItem } from '../../../utils/tippy/Tippy';

const CommonContent = ({ title, description }) => {
    return (
        <div>
            <span className={styles.title}>{title}</span>{' '}
            <span className={styles.description}>{description}</span>
        </div>
    );
};

const ContentMapping = {
    like_blog: ({ n }) => (
        <CommonContent
            title={n?.sender?.fullName}
            description={'đã thích bài viết của bạn.'}
        />
    ),
    comment_blog: ({ n }) => (
        <CommonContent
            title={n?.sender?.fullName}
            description={'đã bình luận bài viết của bạn.'}
        />
    ),
    reply_comment_blog: ({ n }) => (
        <CommonContent
            title={n?.sender?.fullName}
            description={'đã phản hồi bình luận của bạn.'}
        />
    ),
    react_comment_blog: ({ n }) => {
        const reacts = n?.entity && n?.entity?.reacts;
        const reaction = reacts?.find((r) => r.reactedBy === n?.sender?._id);
        const isLike = reaction.emoji === 'like';
        return (
            <CommonContent
                title={n?.sender?.fullName}
                description={
                    isLike
                        ? 'đã thích bình luận của bạn.'
                        : 'đã bày tỏ cảm xúc về  bình luận của bạn.'
                }
            />
        );
    },
    system: ({ n }) => 'system',
};

const SlugMapping = {
    like_blog: (n) => `/blog/${n?.entity?.slug}`,
    comment_blog: (n) => `/blog/${n?.entity?.slug}?commentId=${n?.entity?._id}`,
    reply_comment_blog: (n) =>
        `/blog/${n?.entity?.slug}?commentId=${n?.entity?._id}&parentCommentId=${n?.entity?.parentComment}`,
    react_comment_blog: (n) =>
        `/blog/${n?.entity?.slug}?commentId=${n?.entity?._id}&parentCommentId=${n?.entity?.parentComment}`,
    system: '#',
};

const NotificationContent = ({ notification, seen }) => {
    const Content = ContentMapping[notification?.type];

    return (
        <TippyItem
            className={
                notification?.read
                    ? styles.item
                    : `${styles.item} ${styles.noSeen}`
            }
            key={notification?._id}
            onClick={() => seen([notification?._id])}
            to={SlugMapping[notification?.type](notification)}
            as={Link}
        >
            <div className={styles.avatar}>
                <img alt='' src={notification?.sender?.photoURL || f8logo} />
            </div>
            <div className={styles.content}>
                <Content n={notification} />
                <div className={styles.createdTime}>
                    {timeSince(notification?.updatedAt)}
                </div>
            </div>
        </TippyItem>
    );
};

export default NotificationContent;

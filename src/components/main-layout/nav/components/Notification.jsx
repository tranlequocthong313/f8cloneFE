import { useEffect, useState } from 'react';
import styles from './Notification.module.scss';
import '../../../../sass/_custom.scss';
import Tippy, { TippyItem } from '../../../utils/tippy/Tippy';
import { Link } from 'react-router-dom';
import f8logo from '../../../../asset/images/f8_icon.png';
import { apiURL } from '../../../../context/constants';
import timeSince from '../../../utils/timeSince/timeSince';
import Cookies from 'js-cookie';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import NotificationContent from './NotificationContent';

const socket = io.connect(apiURL);

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [noSeenCount, setNoSeenCount] = useState(0);

    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (!user || !user.isLoggedIn) return;

        const handleNotificationSocket = (notification) => {
            console.log(
                '🚀 ~ handleNotificationSocket ~ notification:',
                notification,
                user
            );
            if (notification.receiver !== user._id) return;

            setNotifications((prev) => {
                const noti = prev.filter((n) => n._id !== notification._id);
                return [notification, ...noti];
            });
        };
        socket.on('notification', handleNotificationSocket);

        return () => socket.off('notification', handleNotificationSocket);
    }, [user]);

    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            try {
                const token = Cookies.get('token');
                if (!token) return;

                const res = await fetch(
                    `${apiURL}/notification/`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    },
                    {
                        signal: controller.signal,
                    }
                );

                const data = await res.json();
                setNotifications(data.notifications);
            } catch (error) {
                console.log(error.message);
            }
        })();

        return () => controller?.abort();
    }, []);

    const seen = async (notificationIds) => {
        try {
            const token = Cookies.get('token');
            if (!token) return;

            await fetch(`${apiURL}/notification/seen`, {
                method: 'PUT',
                body: JSON.stringify({
                    notificationId: notificationIds,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            setNotifications((prev) =>
                prev.map((n) => {
                    if (notificationIds.includes(n._id)) {
                        return {
                            ...n,
                            read: true,
                        };
                    }
                    return n;
                })
            );
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        setNoSeenCount(
            notifications.reduce((acc, cur) => acc + (cur?.read ? 0 : 1), 0)
        );
    }, [notifications]);

    return (
        <Tippy
            button={
                <i className={`${styles.userNotification} fa-solid fa-bell`}>
                    {!!noSeenCount && (
                        <div className={styles.notificationCount}>
                            {noSeenCount}
                        </div>
                    )}
                </i>
            }
            className={styles.wrapper}
        >
            <header className={styles.header}>
                <h6>Thông báo</h6>
                <Tippy
                    button={
                        <i
                            style={{ cursor: 'pointer' }}
                            className='bi bi-three-dots'
                        ></i>
                    }
                    className={styles.markAll}
                >
                    <TippyItem
                        className={styles.markAllItem}
                        onClick={() => seen(notifications.map((n) => n._id))}
                    >
                        <i className='bi bi-check'></i>
                        <span>Đánh dấu tất cả đẫ đọc</span>
                    </TippyItem>
                </Tippy>
            </header>
            <div className={styles.body}>
                <ul className={styles.list}>
                    {notifications?.map((notification) => (
                        <NotificationContent
                            key={notification._id}
                            notification={notification}
                            seen={seen}
                        />
                    ))}
                    <TippyItem className={`${styles.item} ${styles.noSeen}`}>
                        <div className={styles.avatar}>
                            <img alt='' src={f8logo} />
                        </div>
                        <div className={styles.content}>
                            <div>
                                Chào mừng{' '}
                                <span className={styles.name}>
                                    Thống Trần Lê Quốc{' '}
                                </span>
                                đã gia nhập F8. Hãy luôn đam mê, kiên trì và
                                theo đuổi mục tiêu tới cùng bạn nhé ❤️
                            </div>
                            <div className={styles.createdTime}>
                                vài giây trước
                            </div>
                        </div>
                    </TippyItem>
                </ul>
            </div>
        </Tippy>
    );
};

export default Notification;

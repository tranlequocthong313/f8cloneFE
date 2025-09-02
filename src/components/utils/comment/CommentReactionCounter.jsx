import styles from './CommentReactionCounter.module.scss';
import { useMemo } from 'react';
import { EMOJI_MAP } from '../../../context/constants';

const CommentReactionCounter = ({ showModal, reactData }) => {
    const emojies = useMemo(() => {
        const order = {};
        const emojies = reactData?.map((r) => r.emoji);

        emojies.forEach((e) => {
            if (e in order) {
                order[e]++;
            } else {
              order[e] = 1;
            }
        });

        const entries = Object.entries(order);
        entries.sort(([, a], [, b]) => -(a - b));

        return entries.slice(0, 3).map((entry) => entry[0]);
    }, [reactData]);

    return (
        <div className={styles.wrapper} onClick={showModal}>
            <div className={styles.container}>
                {emojies?.map((emoji) => (
                    <div
                        key={emoji}
                        className={styles.icon}
                        style={{ backgroundImage: `url(${EMOJI_MAP[emoji]?.icon})` }}
                    ></div>
                ))}
                <div className={styles.count}>
                    {reactData ? reactData.length : ''}
                </div>
            </div>
        </div>
    );
};

export default CommentReactionCounter;

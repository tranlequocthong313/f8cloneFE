import { Link } from 'react-router-dom';
import styles from './Topics.module.scss';

const Topics = () => {
    return (
        <div className={styles.wrapper}>
            <h3>Các chủ đề được đề xuất</h3>
            <ul className={styles.topics}>
                <li>
                    <Link to='/blog/topic/front-end-mobile-apps'>
                        Front-end / Mobile apps
                    </Link>
                </li>
                <li>
                    <Link to='/blog/topic/back-end-devops'>
                        Back-end / Devops
                    </Link>
                </li>
                <li>
                    <Link to='/blog/topic/ui-ux-design'>UI / UX / Design</Link>
                </li>
                <li>
                    <Link to='/blog/topic/others'>Others</Link>
                </li>
            </ul>
        </div>
    );
};

export default Topics;

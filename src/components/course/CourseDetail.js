import React from 'react';
import styles from './CourseDetail.module.scss';

const CourseDetail = ({ topicList, title }) => {
    if (!topicList || !topicList.length) return null;

    return (
        <div className={styles.topicList}>
            <h3>{title}</h3>
            <ul className={title === 'Yêu cầu' ? styles.column : null}>
                {topicList?.map((topic) => (
                    <li key={topic}>
                        <i className='fa-solid fa-check'></i>
                        <span>{topic}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseDetail;

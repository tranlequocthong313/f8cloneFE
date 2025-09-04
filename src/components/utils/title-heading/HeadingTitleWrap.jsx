import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HeadingTitleWrap.module.scss';

const HeadingTitleWrap = (props) => {
    return (
        <div className={styles.headingWrap}>
            <h2 className={styles.heading}>
                <Link to={props.viewModeTo || '#'}>
                    {props.title}
                    <span className={styles.viewAllIcon}>
                        {props.viewMode !== null && (
                            <i className='fa-solid fa-arrow-right'></i>
                        )}
                    </span>
                </Link>
                {props.label && (
                    <span className={styles.label}>{props.label}</span>
                )}
            </h2>
            {props.viewMode && (
                <Link to={props.viewModeTo} className={styles.viewAll}>
                    <span>{props.viewMode}</span>
                    <i className='fa-solid fa-chevron-right'></i>
                </Link>
            )}
        </div>
    );
};

export default HeadingTitleWrap;

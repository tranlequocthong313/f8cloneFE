import { LearningContext } from '../../context/LearningContext';
import Panel from '../utils/panel/Panel';
import panelStyles from '../utils/panel/Panel.module.scss';
import styles from './LearningNoteItem.module.scss';
import { memo, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { apiURL } from '../../context/constants';
import { Button, Form } from 'react-bootstrap';
import { formatHHMMSS } from '../../helpers/time';

const LearningNoteItem = ({ note, onDelete, onEdit, onClosePanel }) => {
    const { playVideoAt } = useContext(LearningContext);

    const deleteNote = async () => {
        if (!note) return;

        const { _id: id } = note;

        try {
            const token = Cookies.get('token');
            if (!token) return;

            await fetch(`${apiURL}/notes/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            onDelete(id);
        } catch (error) {
            console.log(error.message);
        }
    };

    const playVideo = () => {
        if (!note) return;
        playVideoAt(note?.lessonId, note?.time);
        onClosePanel?.();
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.time} onClick={playVideo}>
                    {formatHHMMSS(note?.time)}
                </div>
                <div className={styles.lesson} onClick={playVideo}>
                    {note?.lesson?.title}
                </div>
                <div className={styles.episode}>{note?.episode?.title}</div>
                <div className={styles.actions}>
                    <Button variant='link'>
                        <i className='fa-solid fa-pen'></i>
                    </Button>
                    <Button variant='link' onClick={deleteNote}>
                        <i className='fa-solid fa-trash'></i>
                    </Button>
                </div>
            </div>
            <div className={styles.content}>{note?.content}</div>
        </div>
    );
};

export default memo(LearningNoteItem);

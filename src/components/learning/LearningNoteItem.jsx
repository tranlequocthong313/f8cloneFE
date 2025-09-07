import { LearningContext } from '../../context/LearningContext';
import Panel from '../utils/panel/Panel';
import panelStyles from '../utils/panel/Panel.module.scss';
import styles from './LearningNoteItem.module.scss';
import { memo, useContext, useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { apiURL } from '../../context/constants';
import { Button, Form } from 'react-bootstrap';
import { formatHHMMSS } from '../../helpers/time';
import Editor from 'react-markdown-editor-lite';
import ReactMarkdown from 'react-markdown';

const LearningNoteItem = ({ note, onDelete, onEdit, onClosePanel }) => {
    const { playVideoAt } = useContext(LearningContext);

    const mdEditor = useRef(null);

    const [text, setText] = useState(note?.content);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        setText(note?.content);
    }, [note]);

    const editorChange = ({ text }) => {
        setText(text);
    };

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

    const editNote = async () => {
        if (!note) return;

        const { _id: id } = note;

        try {
            const token = Cookies.get('token');
            if (!token) return;

            await fetch(`${apiURL}/notes/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ content: text }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            setIsEdit(false);
            onEdit(id, text);
        } catch (error) {
            console.log(error.message);
        }
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
                    <Button variant='link' onClick={() => setIsEdit(true)}>
                        <i className='fa-solid fa-pen'></i>
                    </Button>
                    <Button variant='link' onClick={deleteNote}>
                        <i className='fa-solid fa-trash'></i>
                    </Button>
                </div>
            </div>
            {!isEdit && <pre className={styles.content}>{note?.content}</pre>}
            {isEdit && (
                <div className={styles.editor}>
                    <Editor
                        style={{
                            border: '1px solid #ebebeb',
                            borderRadius: 6,
                            marginBottom: 16,
                            height: 125,
                        }}
                        ref={mdEditor}
                        value={text}
                        onChange={editorChange}
                        renderHTML={(text) => <ReactMarkdown children={text} />}
                    />

                    <div className={styles.actions}>
                        <Button
                            size='sm'
                            variant='outline-secondary'
                            onClick={() => setIsEdit(false)}
                        >
                            Hủy bỏ
                        </Button>
                        <Button
                            size='sm'
                            variant='primary'
                            disabled={!text}
                            onClick={editNote}
                        >
                            Tạo ghi chú
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default memo(LearningNoteItem);

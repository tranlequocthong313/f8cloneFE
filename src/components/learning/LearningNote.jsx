import Editor from 'react-markdown-editor-lite';
import Panel from '../utils/panel/Panel';
import styles from './LearningNote.module.scss';
import ReactMarkdown from 'react-markdown';
import { useContext, useRef, useState } from 'react';
import 'react-markdown-editor-lite/lib/index.css';
import '../../sass/_markdownEditor.scss';
import { formatHHMMSS } from '../../helpers/time';
import { LearningContext } from '../../context/LearningContext';
import { Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { apiURL } from '../../context/constants';

const LearningNote = ({ button }) => {
    const mdEditor = useRef(null);

    const { currentTime, course, learningEpisode, learningLesson } =
        useContext(LearningContext);

    const [note, setNote] = useState('');
    const [open, setOpen] = useState(false);

    const editorChange = ({ text }) => {
        setNote(text);
    };

    const onClose = () => setOpen(false);

    const createNote = async () => {
        if (!note) return;

        try {
            const token = Cookies.get('token');
            if (!token) return;

            await fetch(`${apiURL}/notes/`, {
                method: 'POST',
                body: JSON.stringify({
                    content: note,
                    time: currentTime,
                    courseId: course?._id,
                    episodeId: learningEpisode?._id,
                    lessonId: learningLesson?._id,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            setOpen(false);
            setNote('');
        } catch (error) {
            console.log('🚀 ~ createNote ~ error:', error);
        }
    };

    return (
        <Panel
            placement={'bottom'}
            button={button}
            closeButton={false}
            scroll={true}
            backdrop={false}
            className={styles.wrapper}
            headerClassName={styles.panelHeader}
            header={
                <div className={styles.header}>
                    <h2>Thêm ghi chú tại</h2>
                    <span>{formatHHMMSS(currentTime)}</span>
                </div>
            }
            open={open}
            onClose={onClose}
            onShow={() => setOpen(true)}
        >
            <Editor
                style={{
                    border: '1px solid #ebebeb',
                    borderRadius: 6,
                    marginBottom: 16,
                }}
                ref={mdEditor}
                value={note}
                onChange={editorChange}
                renderHTML={(text) => <ReactMarkdown children={text} />}
            />

            <div className={styles.actions}>
                <Button size='sm' variant='outline-secondary' onClick={onClose}>
                    Hủy bỏ
                </Button>
                <Button
                    size='sm'
                    variant='primary'
                    disabled={!note}
                    onClick={createNote}
                >
                    Tạo ghi chú
                </Button>
            </div>
        </Panel>
    );
};

export default LearningNote;

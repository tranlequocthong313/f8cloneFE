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
import MainToast from '../utils/toast/MainToast';

const LearningNote = ({ isShowMenuTrack, button }) => {
    const mdEditor = useRef(null);

    const {
        currentTime,
        course,
        learningEpisode,
        learningLesson,
        unPauseVideo,
    } = useContext(LearningContext);

    const [note, setNote] = useState('');
    const [open, setOpen] = useState(false);
    const [createNoteStatus, setCreateNoteStatus] = useState({
        isSuccess: false,
        show: false,
    });

    const editorChange = ({ text }) => {
        setNote(text);
    };

    const onClose = () => {
        setOpen(false);
        unPauseVideo();
    };

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

            setNote('');
            onClose();
            setCreateNoteStatus({
                isSuccess: true,
                show: true,
            });
        } catch (error) {
            console.log('🚀 ~ createNote ~ error:', error);
            setCreateNoteStatus({
                isSuccess: false,
                show: true,
            });
        }
    };

    return (
        <>
            <Panel
                placement={'bottom'}
                button={button}
                closeButton={false}
                scroll={true}
                backdrop={false}
                className={styles.wrapper}
                style={{ width: isShowMenuTrack ? '77%' : '100%' }}
                headerClassName={styles.panelHeader}
                hideButtonOnShow={true}
                header={
                    <div className={styles.header}>
                        <h2>Thêm ghi chú tại</h2>
                        <span>{formatHHMMSS(currentTime)}</span>
                    </div>
                }
                open={open}
                onShow={() => setOpen(true)}
            >
                <Editor
                    style={{
                        border: '1px solid #ebebeb',
                        borderRadius: 6,
                        marginBottom: 16,
                        flex: 1,
                    }}
                    ref={mdEditor}
                    value={note}
                    onChange={editorChange}
                    renderHTML={(text) => <ReactMarkdown children={text} />}
                />

                <div className={styles.actions}>
                    <Button
                        size='sm'
                        variant='outline-secondary'
                        onClick={onClose}
                    >
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

            <MainToast
                successText={'Tạo ghi chú thành công'}
                failText={'Tạo ghi chú thất bại'}
                position='top-end'
                status={createNoteStatus}
                setStatus={() =>
                    setCreateNoteStatus((prev) => ({ ...prev, show: false }))
                }
                variant={createNoteStatus.isSuccess ? 'success' : 'danger'}
            />
        </>
    );
};

export default LearningNote;

import { LearningContext } from '../../context/LearningContext';
import Panel from '../utils/panel/Panel';
import panelStyles from '../utils/panel/Panel.module.scss';
import styles from './LearningNoteList.module.scss';
import { memo, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { apiURL } from '../../context/constants';
import { Form } from 'react-bootstrap';
import LearningNoteItem from './LearningNoteItem';

const LearningNoteList = ({ button }) => {
    const { pauseVideo, unPauseVideo, course, learningEpisode, isPause } =
        useContext(LearningContext);

    const [filter, setFilter] = useState({
        sort: '-1',
        type: 'current',
    });
    const [notes, setNotes] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!course || !open) return;

        const getNotes = async () => {
            try {
                const token = Cookies.get('token');
                if (!token) return;

                const params = new URLSearchParams();
                params.append('courseId', course?._id);
                params.append('sort', filter.sort);

                if (filter.type === 'current') {
                    params.append('episodeId', learningEpisode?._id);
                }

                const res = await fetch(
                    `${apiURL}/notes?${params.toString()}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await res.json();
                setNotes(data?.notes);
            } catch (error) {
                console.log(error.message);
            }
        };

        getNotes();
    }, [course, learningEpisode, filter, open]);

    const onDelete = (id) =>
        setNotes((prev) => prev.filter((n) => n._id !== id));

    const onEdit = (id, content) =>
        setNotes((prev) =>
            prev.map((n) => {
                if (n._id === id) {
                    return {
                        ...n,
                        content,
                    };
                }
                return n;
            })
        );

    return (
        <Panel
            button={button}
            placement={'end'}
            closeButton={true}
            className={panelStyles.wrapper}
            open={open}
            onClose={() => {
                setOpen(false);
                unPauseVideo();
            }}
            onShow={() => {
                setOpen(true);
                pauseVideo();
            }}
        >
            <div className={styles.panelWrapper}>
                <header className={styles.header}>
                    <h2>Ghi chú của tôi</h2>

                    <div className={styles.selects}>
                        <Form.Select
                            onChange={(e) =>
                                setFilter((prev) => ({
                                    ...prev,
                                    type: e.target.value,
                                }))
                            }
                        >
                            <option value='current'>
                                Trong chương hiện tại
                            </option>
                            <option value='all'>Trong tất cả các chương</option>
                        </Form.Select>
                        <Form.Select
                            onChange={(e) =>
                                setFilter((prev) => ({
                                    ...prev,
                                    sort: e.target.value,
                                }))
                            }
                        >
                            <option value='-1'>Mới nhất</option>
                            <option value='1'>Cũ nhất</option>
                        </Form.Select>
                    </div>
                </header>

                <div className={styles.list}>
                    {notes?.map((note) => (
                        <LearningNoteItem
                            key={note._id}
                            note={note}
                            onDelete={onDelete}
                            onEdit={onEdit}
                            onClosePanel={() => setOpen(false)}
                        />
                    ))}
                </div>

                {(!notes || !notes.length) && (
                    <div className={styles.emptyMessage}>
                        <img src='https://fullstack.edu.vn/assets/no-note-yet-Cz1TLb5Q.svg' />
                        <p>Bạn chưa có ghi chú nào</p>
                        <span>Hãy ghi chép để nhớ những gì bạn đã học!</span>
                    </div>
                )}
            </div>
        </Panel>
    );
};

export default memo(LearningNoteList);

import { useEffect, useState } from 'react';
import { Modal, Button, Form, Spinner, Row, Col } from 'react-bootstrap';
import { apiURL } from '../../../context/constants';
import { useDispatch } from 'react-redux';
import styles from './CreateCourse.module.scss';
import MainToast from '../../utils/toast/MainToast';
import removeActions from '../../utils/remove-accents/removeActions';
import MainButton from '../../utils/button/MainButton';
import youtubeDurationFormat from 'youtube-duration-format';
import { createCourse } from '../../../actions/userAction';

const INITIAL_DATA = {
    title: '',
    description: '',
    videoId: '',
    image: '',
    level: 'beginner',
    topics: [],
    requirements: [],
    role: 'FE',
};

const CreateCourse = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState(INITIAL_DATA);

    const handleDataChange = (key, value) => {
        setData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const [createStatus, setCreateStatus] = useState({
        isSuccess: false,
        show: false,
    });
    const [isShowCreateModal, setIsShowCreateModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [episodes, setEpisodes] = useState([]);

    const addEpisode = () => {
        setEpisodes([
            ...episodes,
            {
                title: '',
                lessons: [
                    {
                        title: '',
                        videoId: '',
                        time: '',
                        lesseonId: Date.now().toString(),
                    },
                ],
            },
        ]);
    };

    // Remove episode
    const removeEpisode = (index) => {
        setEpisodes(episodes.filter((_, i) => i !== index));
    };

    // Handle episode title change
    const handleEpisodeChange = (index, value) => {
        const updated = [...episodes];
        updated[index].title = value;
        setEpisodes(updated);
    };

    // Handle lesson field change
    const handleLessonChange = (epIndex, lessonIndex, field, value) => {
        const updated = [...episodes];
        updated[epIndex].lessons[lessonIndex][field] = value;
        setEpisodes(updated);
    };

    // Add new lesson into an episode
    const addLesson = (epIndex) => {
        const updated = [...episodes];
        updated[epIndex].lessons.push({ title: '', videoId: '', time: '' });
        setEpisodes(updated);
    };

    // Remove lesson
    const removeLesson = (epIndex, lessonIndex) => {
        const updated = [...episodes];
        updated[epIndex].lessons = updated[epIndex].lessons.filter(
            (_, i) => i !== lessonIndex
        );
        setEpisodes(updated);
    };

    const showCreateCourseModal = () => setIsShowCreateModal((prev) => !prev);

    const fetchYoutubeData = async (videoId, epIndex, lessonIndex) => {
        if (!videoId) return;
        try {
            const res = await fetch(
                `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&part=snippet,contentDetails,statistics,status`
            );
            const data = await res.json();
            if (data.items && data.items.length > 0) {
                const video = data.items[0];
                const title = video.snippet.localized.title?.replace(
                    /^[0-9]+\.\s*/,
                    ''
                );
                const duration = video.contentDetails.duration;

                const updated = [...episodes];
                updated[epIndex].lessons[lessonIndex].title = title;
                updated[epIndex].lessons[lessonIndex].time = duration;
                updated[epIndex].lessons[lessonIndex].videoId = videoId;
                setEpisodes(updated);
            }
        } catch (err) {
            console.error('YouTube fetch error:', err);
        }
    };

    const handleAddCourse = async () => {
        try {
            const res = await fetch(`${apiURL}/admin/course/create`, {
                method: 'POST',
                body: JSON.stringify({
                    ...data,
                    level: data.level.toLowerCase(),
                    episodes,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const resData = await res.json();

            dispatch(createCourse({ courseData: resData.course }));
            setCreateStatus((prev) => {
                return {
                    ...prev,
                    isSuccess: true,
                    show: true,
                };
            });
            setIsShowCreateModal(false);
            setData(INITIAL_DATA);
            setEpisodes([]);
        } catch (error) {
            console.log(error.message);
            setCreateStatus((prev) => {
                return {
                    ...prev,
                    isSuccess: false,
                    show: true,
                };
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <MainButton
                outline={true}
                className={styles.videoCreate}
                onClick={showCreateCourseModal}
            >
                <i className='fa-solid fa-plus'></i> Thêm khóa học
            </MainButton>
            <Modal
                show={isShowCreateModal}
                onHide={showCreateCourseModal}
                className={styles.createModal}
            >
                <Modal.Header
                    closeButton
                    style={{ border: 'none' }}
                ></Modal.Header>
                <Form className={styles.createForm}>
                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Control
                            type='text'
                            placeholder='Nhập title'
                            value={data.title}
                            onChange={(e) =>
                                handleDataChange('title', e.target.value)
                            }
                            className={styles.createVideoInput}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Control
                            type='text'
                            as='textarea'
                            rows='5'
                            placeholder='Nhập description'
                            onChange={(e) =>
                                handleDataChange('description', e.target.value)
                            }
                            className={styles.createVideoInput}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Control
                            type='text'
                            placeholder='Nhập preview youtube video id'
                            onChange={(e) =>
                                handleDataChange('videoId', e.target.value)
                            }
                            className={styles.createVideoInput}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Control
                            type='text'
                            placeholder='Nhập thumbnail url'
                            onChange={(e) =>
                                handleDataChange('image', e.target.value)
                            }
                            className={styles.createVideoInput}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Select
                            aria-label='Level'
                            onChange={(e) =>
                                handleDataChange('level', e.target.value)
                            }
                        >
                            <option value='beginner'>Beginner</option>
                            <option value='intermediate'>Intermediate</option>
                            <option value='advance'>Advance</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Control
                            type='text'
                            as={'textarea'}
                            rows='5'
                            placeholder='Nhập topics'
                            onChange={(e) =>
                                handleDataChange(
                                    'topics',
                                    e.target.value
                                        .split('\n')
                                        .map((line) => line.trim())
                                        .filter((line) => line !== '')
                                )
                            }
                            className={styles.createVideoInput}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Control
                            type='text'
                            as={'textarea'}
                            rows='5'
                            placeholder='Nhập requirements'
                            onChange={(e) =>
                                handleDataChange(
                                    'requirements',
                                    e.target.value
                                        .split('\n')
                                        .map((line) => line.trim())
                                        .filter((line) => line !== '')
                                )
                            }
                            className={styles.createVideoInput}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Select
                            aria-label='Role'
                            onChange={(e) =>
                                handleDataChange('role', e.target.value)
                            }
                        >
                            <option value='FE'>Frontend</option>
                            <option value='BE'>Backend</option>
                            <option value='Fullstack'>Fullstack</option>
                        </Form.Select>
                    </Form.Group>
                    {episodes?.map((episode, epIndex) => (
                        <div key={epIndex} className='mb-4 p-3 border rounded'>
                            <Row className='align-items-center mb-2'>
                                <Col>
                                    <Form.Control
                                        type='text'
                                        placeholder='Episode title'
                                        value={episode.title}
                                        onChange={(e) =>
                                            handleEpisodeChange(
                                                epIndex,
                                                e.target.value
                                            )
                                        }
                                    />
                                </Col>
                                <Col xs='auto'>
                                    <Button
                                        variant='danger'
                                        size='sm'
                                        onClick={() => removeEpisode(epIndex)}
                                    >
                                        Xóa Episode
                                    </Button>
                                </Col>
                            </Row>

                            <h6>Bài học</h6>
                            {episode?.lessons?.map((lesson, lessonIndex) => (
                                <Row key={lessonIndex} className='mb-2'>
                                    <Col>
                                        <Form.Control
                                            type='text'
                                            placeholder='Youtube Video ID'
                                            value={lesson.videoId}
                                            onChange={(e) =>
                                                handleLessonChange(
                                                    epIndex,
                                                    lessonIndex,
                                                    'videoId',
                                                    e.target.value
                                                )
                                            }
                                            onBlur={(e) =>
                                                fetchYoutubeData(
                                                    e.target.value,
                                                    epIndex,
                                                    lessonIndex
                                                )
                                            }
                                            className='mb-2'
                                        />
                                        <div>
                                            <strong>Title:</strong>{' '}
                                            {lesson.title || 'Chưa có dữ liệu'}
                                        </div>
                                        <div>
                                            <strong>Thời lượng:</strong>{' '}
                                            {lesson?.time
                                                ? youtubeDurationFormat(
                                                      lesson.time
                                                  )
                                                : 'Chưa có dữ liệu'}
                                        </div>
                                    </Col>
                                    <Col
                                        xs='auto'
                                        className='d-flex align-items-start'
                                    >
                                        <Button
                                            variant='outline-danger'
                                            size='sm'
                                            onClick={() =>
                                                removeLesson(
                                                    epIndex,
                                                    lessonIndex
                                                )
                                            }
                                        >
                                            Xóa
                                        </Button>
                                    </Col>
                                </Row>
                            ))}

                            <Button
                                variant='outline-primary'
                                size='sm'
                                onClick={() => addLesson(epIndex)}
                            >
                                + Thêm Lesson
                            </Button>
                        </div>
                    ))}

                    <Button variant='success' size='sm' onClick={addEpisode}>
                        + Thêm Episode
                    </Button>
                </Form>

                <Modal.Footer style={{ border: 'none' }}>
                    <MainButton
                        onClick={handleAddCourse}
                        primary={true}
                        className={
                            !isLoading
                                ? styles.button
                                : `${styles.button} ${styles.disabled}`
                        }
                    >
                        Thêm
                        {isLoading && (
                            <Spinner
                                animation='border'
                                size='sm'
                                style={{ marginLeft: 8, color: '#fff' }}
                            />
                        )}
                    </MainButton>
                    <MainButton
                        className={
                            !isLoading
                                ? `${styles.button} ${styles.cancel}`
                                : `${styles.button} ${styles.cancel} ${styles.disabled}`
                        }
                        onClick={isShowCreateModal}
                    >
                        Hủy
                    </MainButton>
                </Modal.Footer>
            </Modal>
            <MainToast
                status={createStatus}
                setStatus={() =>
                    setCreateStatus((prev) => {
                        return {
                            ...prev,
                            show: false,
                        };
                    })
                }
                successText={'Tạo course thành công!'}
                failText={'Tạo course không thành công!'}
            />
        </>
    );
};

export default CreateCourse;

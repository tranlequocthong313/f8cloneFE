import { useEffect, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createVideo } from '../../actions/userAction';
import { apiURL } from '../../context/constants';
import MainButton from '../utils/button/MainButton';
import MainTable from '../utils/table/MainTable';
import styles from './AdminVideo.module.scss';
import youtubeDurationFormat from 'youtube-duration-format';

const AdminVideo = ({ videoData }) => {
    const dispatch = useDispatch();

    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
    const [checkboxChosen, setCheckboxChosen] = useState([]);
    const [checkboxChosenAll, setCheckboxChosenAll] = useState([]);
    const [isCheckboxChosenAll, setIsCheckboxChosenAll] = useState(false);

    useEffect(() => {
        const videoId = videoData?.map((video) => video._id);
        setCheckboxChosenAll(videoId);
    }, [videoData]);

    const showDeleteModal = () => setIsShowDeleteModal((prev) => !prev);

    const formatYoutubeDuration = (duration) => {
        try {
            const durationFormatted = youtubeDurationFormat(duration);
            return durationFormatted;
        } catch (error) {
            return duration;
        }
    };

    const formatDateToLocaleString = (date) => new Date(date).toLocaleString();

    const checkBoxChosenSingle = (id) =>
        setCheckboxChosen((prev) => {
            const isChosen = prev.includes(id);
            if (isChosen) {
                const newChosen = prev.filter((item) => item !== id);
                setIsCheckboxChosenAll(false);
                return newChosen;
            }
            const newChosen = [...prev, id];
            newChosen.length === checkboxChosenAll.length &&
                setIsCheckboxChosenAll(true);
            return newChosen;
        });

    const handleCheckBoxChosenAll = () => {
        if (!isCheckboxChosenAll) {
            setCheckboxChosen(checkboxChosenAll);
            setIsCheckboxChosenAll(true);
        } else {
            setCheckboxChosen([]);
            setIsCheckboxChosenAll(false);
        }
    };

    const deleteVideoIsChosen = async () => {
        try {
            showDeleteModal();
            const res = await fetch(`${apiURL}/admin/video/delete-soft`, {
                method: 'POST',
                body: JSON.stringify({ videoId: checkboxChosen }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await res.json();
            dispatch(createVideo({ videoData: data.video }));
        } catch (error) {
            console.log(error.message);
        } finally {
            setCheckboxChosen([]);
            setIsCheckboxChosenAll(false);
        }
    };

    const changePopularState = async (videoId, isPopular) => {
        try {
            const res = await fetch(`${apiURL}/admin/video/add-popular`, {
                method: 'POST',
                body: JSON.stringify({ videoId, isPopular }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await res.json();
            dispatch(createVideo({ videoData: data.video }));
        } catch (error) {
            console.log(error.message);
        } finally {
            setCheckboxChosen([]);
            setIsCheckboxChosenAll(false);
        }
    };

    return (
        <>
            <MainTable>
                <thead>
                    <tr>
                        <th>
                            <Form>
                                <Form.Check
                                    checked={isCheckboxChosenAll}
                                    onChange={handleCheckBoxChosenAll}
                                />
                            </Form>
                        </th>
                        <th className={styles.tableItem}>STT</th>
                        <th className={styles.tableItem}>Tên video</th>
                        <th className={styles.tableItem}>Thời gian</th>
                        <th className={styles.tableItem}>Tình trạng</th>
                        <th className={styles.tableItem}>Thời gian tạo</th>
                    </tr>
                </thead>
                <tbody>
                    {videoData?.map((video, index) => (
                        <tr key={video._id}>
                            <td>
                                <Form>
                                    <Form.Check
                                        checked={checkboxChosen.includes(
                                            video._id
                                        )}
                                        type={'checkbox'}
                                        onChange={() =>
                                            checkBoxChosenSingle(video._id)
                                        }
                                    />
                                </Form>
                            </td>
                            <td className={styles.tableItem}>{index + 1}</td>
                            <td className={styles.breakWord}>{video.title}</td>
                            <td className={styles.tableItem}>
                                {formatYoutubeDuration(video.duration)}
                            </td>
                            <td className={styles.tableItem}>
                                {video.isPopular ? 'Hiện' : 'Ẩn'}
                            </td>
                            <td className={styles.tableItem}>
                                {formatDateToLocaleString(video.createdAt)}
                            </td>
                            <td>
                                {!checkboxChosen.includes(video._id) && (
                                    <i
                                        onClick={() =>
                                            changePopularState(
                                                video._id,
                                                video.isPopular
                                            )
                                        }
                                        title={
                                            video.isPopular
                                                ? 'Xóa khỏi video nổi bật'
                                                : 'Thêm vào video nổi bật'
                                        }
                                        className={
                                            video.isPopular
                                                ? `fa-solid fa-circle-minus ${styles.buttonIcon} ${styles.removePopular}`
                                                : `fa-solid fa-circle-plus ${styles.buttonIcon} ${styles.addPopular}`
                                        }
                                    ></i>
                                )}
                                {checkboxChosen.includes(video._id) && (
                                    <i
                                        className={
                                            video.isPopular
                                                ? `fa-solid fa-circle-minus ${styles.buttonIcon} ${styles.removePopular} ${styles.disabled}`
                                                : `fa-solid fa-circle-plus ${styles.buttonIcon} ${styles.addPopular} ${styles.disabled}`
                                        }
                                    ></i>
                                )}
                                <i
                                    onClick={showDeleteModal}
                                    title={'Xóa video'}
                                    className={
                                        checkboxChosen.includes(video._id)
                                            ? `fa-solid fa-trash ${styles.buttonIcon} ${styles.delete}`
                                            : `fa-solid fa-trash ${styles.buttonIcon} ${styles.delete} ${styles.disabled}`
                                    }
                                ></i>
                                <a
                                    rel='noopener noreferrer'
                                    target='_blank'
                                    href={`https://www.youtube.com/watch?v=${video.videoId}`}
                                >
                                    <i
                                        title={'Truy cập video'}
                                        className={`fa-solid fa-arrow-up-right-from-square ${styles.buttonIcon}`}
                                    ></i>
                                </a>
                            </td>
                        </tr>
                    ))}
                    {videoData.length === 0 && (
                        <tr>
                            <td colSpan='10' className={styles.tableItem}>
                                Không có dữ liệu.
                            </td>
                        </tr>
                    )}
                </tbody>
            </MainTable>
            <Modal show={isShowDeleteModal} onHide={isShowDeleteModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Xóa video</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Đồng ý xóa video?</p>
                </Modal.Body>

                <Modal.Footer>
                    <MainButton onClick={deleteVideoIsChosen}>
                        Đồng ý
                    </MainButton>
                    <MainButton onClick={showDeleteModal}>Hủy</MainButton>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AdminVideo;

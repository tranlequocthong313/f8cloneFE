import { useState, useEffect, useCallback, useContext, useRef } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import ContentEditable from '../utils/content-editable/ContentEditable';
import moment from 'moment';
import { apiURL } from '../../context/constants';
import styles from './Modal.module.scss';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { createBlog } from '../../actions/userAction';
import removeActions from '../utils/remove-accents/removeActions';
import { useSelector } from 'react-redux';
import { BlogContext } from '../../context/BlogContext';
import io from 'socket.io-client';
import MainToast from '../utils/toast/MainToast';
import { uploadMedia } from '../../helpers/upload';

const socket = io.connect(apiURL);

const Modal = ({ blogContent }) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const { setShowModal } = useContext(BlogContext);

    const titleDisplayRef = useRef();

    // Get city living
    const timezone = Intl.DateTimeFormat()
        .resolvedOptions()
        .timeZone.split('/')[1];

    const date = moment().add(1, 'hours').format('yyyy-MM-DDTHH:mm');

    const [preview, setPreview] = useState(null);
    const [isSchedule, setIsSchedule] = useState(false);
    const [schedule, setSchedule] = useState(date);
    const [allowRecommend, setAllowRecommend] = useState(true);
    const [titleDisplay, setTitleDisplay] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [tags, setTags] = useState(null);
    const [tag, setTag] = useState('');
    const [invalidTag, setInvalidTag] = useState(null);

    const LIMIT_TITLE_DISPLAY_LENGTH = '100';
    const LIMIT_DESCRIPTION_LENGTH = '160';

    const SHOW_HELP_NUMBER_TITLE_DISPLAY = 67;
    const SHOW_HELP_NUMBER_DESCRIPTION = 108;

    useEffect(() => {
        return () => preview && URL.revokeObjectURL(preview);
    }, [preview]);

    const onDrop = useCallback((acceptedFiles) => {
        const image = URL.createObjectURL(acceptedFiles[0]);
        setPreview(image);
        setImage(acceptedFiles[0]);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        name: 'image',
    });

    useEffect(() => {
        titleDisplayRef.current.innerText = blogContent.title;
    }, [blogContent.title]);

    const readingTime = (content) => {
        const WORDS_PER_MINUTE = 200; // People read 200 words/min https://infusion.media/content-marketing/how-to-calculate-reading-time/
        const SMALLEST_READING_TIME = 1;

        const wordCount = content.split(' ').length;
        const minute = Math.floor(wordCount / WORDS_PER_MINUTE);

        return minute <= SMALLEST_READING_TIME ? SMALLEST_READING_TIME : minute;
    };

    const uploadImageToStorage = async () => {
        setLoading(true);
        if (image) {
            const url = await uploadMedia(image);
            postBlog(url);
        } else {
            postBlog();
        }
    };

    const postBlog = async (image) => {
        try {
            const token = Cookies.get('token');
            if (!token) return;

            const blogData = {
                image,
                tags,
                schedule: isSchedule ? schedule : null,
                allowRecommend,
                description,
                title: blogContent.title,
                content: blogContent.content,
                readingTime: readingTime(blogContent.content),
                search: removeActions(
                    titleDisplay.length === 0 ? blogContent.title : titleDisplay
                ),
                titleDisplay:
                    titleDisplay.length === 0
                        ? blogContent.title
                        : titleDisplay,
                isPopular: false,
                isVerified: user.isAdmin ? true : false,
                isPosted: true,
            };

            const res = await fetch(`${apiURL}/new-post`, {
                method: 'POST',
                body: JSON.stringify(blogData),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            dispatchAndNavigate(data);
            setShowModal(false);
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    const dispatchAndNavigate = (data) => {
        createBlog({ blogData: data.blog });
        navigate(
            !data.blog.schedule
                ? `/blog/${data.blog.slug}`
                : '/my-post/published'
        );
    };

    const addTag = (e) => {
        const isFullTagsSize = tags && tags.length === 5;
        if (isFullTagsSize) return;

        const isEnterPressed = e.keyCode === 13;
        if (isEnterPressed) {
            const isExistTagAlready = tags.includes(tag);
            if (isExistTagAlready) return setInvalidTag('Bạn đã thêm thẻ này');

            const isValidTagAddInput = !tag.match(
                /[`!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/
            );
            if (!isValidTagAddInput)
                return setInvalidTag(
                    'Thẻ chỉ hỗ trợ chữ cái, số, dấu cách và dấu gạch ngang'
                );

            setInvalidTag(null);
            setTags((prev) => [...prev, tag.trim()]);
            setTag('');
        }
    };

    const removeTag = (tag) =>
        setTags((prev) => prev.filter((item) => item !== tag));

    return (
        <div className={styles.modal}>
            <div className={styles.close} onClick={() => setShowModal(false)}>
                x
            </div>
            <Row className={styles.wrapper}>
                <Col md={12} lg={6} xl={6} className={styles.colLeft}>
                    <h3>Xem trước</h3>
                    <form
                        {...getRootProps()}
                        role='button'
                        tabIndex='0'
                        className={styles.postButtonThumb}
                        style={
                            preview && { backgroundImage: `url(${preview})` }
                        }
                    >
                        <input
                            type='file'
                            accept='image/*'
                            autoComplete='off'
                            name='image'
                            tabIndex='-1'
                            hidden
                            {...getInputProps()}
                        />
                        <p>
                            Thêm một ảnh đại diện hấp dẫn sẽ giúp bài viết của
                            bạn cuốn hút hơn với độc giả.
                        </p>
                        <span>Kéo thả ảnh vào đây, hoặc bấm để chọn ảnh</span>
                    </form>
                    <ContentEditable
                        className={`${styles.contentEditable} ${styles.title}`}
                        text={'Tiêu đề khi tin được hiển thị'}
                        onInput={(e) => setTitleDisplay(e.target.innerText)}
                        maxLength={LIMIT_TITLE_DISPLAY_LENGTH}
                        ref={titleDisplayRef}
                    />
                    {titleDisplay.length >= SHOW_HELP_NUMBER_TITLE_DISPLAY && (
                        <div
                            className={styles.help}
                        >{`${titleDisplay.length}/100`}</div>
                    )}
                    <ContentEditable
                        className={`${styles.contentEditable} ${styles.description}`}
                        text={'Mô tả khi tin được hiển thị'}
                        onInput={(e) => setDescription(e.target.innerText)}
                        maxLength={LIMIT_DESCRIPTION_LENGTH}
                    />
                    {description.length >= SHOW_HELP_NUMBER_DESCRIPTION && (
                        <div
                            className={styles.help}
                        >{`${description.length}/160`}</div>
                    )}
                    <p className={styles.note}>
                        <strong>Lưu ý:</strong> Chỉnh sửa tại đây sẽ thay đổi
                        cách bài viết được hiển thị tại trang chủ, tin nổi bật -
                        Chứ không ảnh hưởng tới nội dung bài viết của bạn.
                    </p>
                </Col>
                <Col md={12} lg={6} xl={6} className={styles.colRight}>
                    <span>
                        Thêm tối đa 5 thẻ để độc giả biết bài viết của bạn nói
                        về điều gì.
                    </span>
                    Bạn đã thêm thẻ này
                    <div
                        className={
                            invalidTag !== null
                                ? `${styles.tagWrapper} ${styles.invalid}`
                                : styles.tagWrapper
                        }
                    >
                        {tags &&
                            tags?.map((tag) => (
                                <div
                                    key={tag}
                                    id={`tag_${tag}`}
                                    tabIndex={1}
                                    className={styles.tagCard}
                                >
                                    <span>{tag}</span>
                                    <button onClick={() => removeTag(tag)}>
                                        x
                                    </button>
                                </div>
                            ))}
                        {(!tags || tags.length !== 5) && (
                            <input
                                type='text'
                                placeholder={
                                    tags && tags.length === 5
                                        ? ''
                                        : 'Ví dụ: Front-end, ReactJS, UI, UX'
                                }
                                className={styles.tagsInput}
                                disabled={tags && tags.length === 5}
                                onKeyDown={addTag}
                                value={tag}
                                onChange={(e) => setTag(e.target.value)}
                            />
                        )}
                    </div>
                    {invalidTag !== null && (
                        <div className={styles.invalidText}>{invalidTag}</div>
                    )}
                    <form className={styles.allow}>
                        <input
                            type='checkbox'
                            checked={allowRecommend}
                            className={styles.checkMark}
                            onChange={() => setAllowRecommend((prev) => !prev)}
                        />
                        <label>
                            Đề xuất bài viết của bạn đến các độc giả quan tâm
                            tới nội dung này.
                        </label>
                    </form>
                    {isSchedule && (
                        <form className={styles.schedule}>
                            <label>Thời gian xuất bản:</label>
                            <input
                                type='datetime-local'
                                value={schedule}
                                onChange={(e) => setSchedule(e.target.value)}
                            />
                            <div className={styles.help}>
                                {timezone} time (GMT+7)
                            </div>
                            <p>
                                Bài viết này sẽ được xuất bản tự động theo thời
                                gian đã lên lịch phía trên.
                            </p>
                        </form>
                    )}
                    <div className={styles.actions}>
                        <button
                            className={
                                !loading
                                    ? styles.postButton
                                    : `${styles.postButton} ${styles.disabled}`
                            }
                            onClick={uploadImageToStorage}
                        >
                            {isSchedule ? 'Lên lịch xuất bản' : 'Xuất bản ngay'}
                            {loading && (
                                <Spinner
                                    animation='border'
                                    size='sm'
                                    style={{ marginLeft: 8, color: '#fff' }}
                                />
                            )}
                        </button>
                        <button
                            className={styles.postScheduleButton}
                            onClick={() => setIsSchedule((prev) => !prev)}
                        >
                            {!isSchedule ? 'Lên lịch xuất bản' : 'Hủy lên lịch'}
                        </button>
                    </div>
                    <img
                        width={200}
                        src={
                            'http://localhost:5000/f8-prod/blog_posts/250951029_2310653682405428_2097463697023468442_n.jpg'
                        }
                        alt=''
                    />
                </Col>
            </Row>
        </div>
    );
};

export default Modal;

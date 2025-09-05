import React, {
    useRef,
    useState,
    useEffect,
    Suspense,
    useContext,
} from 'react';
import styles from './NewPost.module.scss';
import Editor from 'react-markdown-editor-lite';
import ReactMarkdown from 'react-markdown';
import 'react-markdown-editor-lite/lib/index.css';
import '../../sass/_myIcon.scss';
import Header from '../../components/main-layout/nav/Header';
import '../../sass/_markdownEditor.scss';
import ContentEditable from '../../components/utils/content-editable/ContentEditable';
import Modal from '../../components/new-post/Modal';
import { useLocation } from 'react-router-dom';
import { apiURL } from '../../context/constants';
import { BlogContext } from '../../context/BlogContext';
import Cookies from 'js-cookie';

const Footer = React.lazy(() =>
    import('../../components/main-layout/footer/Footer')
);

const NewPost = () => {
    const mdEditor = useRef(null);
    const titleRef = useRef(null);

    const { showModal, setIsValid } = useContext(BlogContext);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        document.title = title ? title : 'Viết blog | F8';

        title && content ? setIsValid(true) : setIsValid(false);
    }, [title, content, setIsValid]);

    const LIMIT_TITLE_LENGTH = '190';
    const blogData = () => {
        if (
            mdEditor.current &&
            title.length > 0 &&
            title.length <= LIMIT_TITLE_LENGTH
        ) {
            const data = {
                title: titleRef.current.innerText.trim(),
                content: mdEditor.current.getMdValue().trim(),
            };

            titleRef.current.innerText = data.title;

            setTitle(data.title);
            setContent(data.content);
        }
    };

    const readingTime = (content) => {
        const WORDS_PER_MINUTE = 200; // People read 200 words/min https://infusion.media/content-marketing/how-to-calculate-reading-time/
        const SMALLEST_READING_TIME = 1;

        const wordCount = content.split(' ').length;
        const minute = Math.floor(wordCount / WORDS_PER_MINUTE);

        return minute <= SMALLEST_READING_TIME ? SMALLEST_READING_TIME : minute;
    };

    const editorChange = ({ text }) => setContent(text);

    return (
        <>
            {!showModal && (
                <>
                    <Header blogData={blogData} />
                    <div className={styles.wrapper}>
                        <ContentEditable
                            text={'Tiêu đề'}
                            className={styles.contentEditable}
                            onInput={(e) => setTitle(e.target.innerText)}
                            maxLength={LIMIT_TITLE_LENGTH}
                            ref={titleRef}
                        />
                        <Editor
                            ref={mdEditor}
                            value={content}
                            onChange={editorChange}
                            renderHTML={(text) => (
                                <ReactMarkdown children={text} />
                            )}
                        />
                    </div>
                </>
            )}
            {showModal && <Modal blogContent={{ title, content }} />}
            <Suspense fallback={<div>Loading...</div>}>
                <Footer />
            </Suspense>
        </>
    );
};

export default NewPost;

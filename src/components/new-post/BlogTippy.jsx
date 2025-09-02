import { useSelector } from 'react-redux';
import Tippy, { TippyItem } from '../utils/tippy/Tippy';
import styles from './BlogTippy.module.scss';
import { reportBlog } from '../utils/report/report';
import { copyToClipboard } from '../../helpers/text';
import { Link } from 'react-router-dom';

const BlogTippy = ({ blog }) => {
    const user = useSelector((state) => state.user);

    return (
        <Tippy
            button={
                <i
                    style={{ cursor: 'pointer' }}
                    className={`fa-solid fa-ellipsis ${styles.option}`}
                ></i>
            }
            className={styles.menuWrapper}
        >
            {user.userId === blog.postedBy._id && (
                <TippyItem
                    as={Link}
                    to={`/edit-blog/${blog.slug}`}
                    className={styles.menuItem}
                >
                    <i className='fa-solid fa-pen'></i>
                    <span>Sửa bài viết</span>
                </TippyItem>
            )}
            <TippyItem
                rel='noopener noreferrer'
                target='_blank'
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    `${window.location.origin}/blog/${blog.slug}`
                )}`}
                className={styles.menuItem}
            >
                <i className='fa-brands fa-facebook'></i>
                <span>Chia sẻ lên Facebook</span>
            </TippyItem>
            <TippyItem
                rel='noopener noreferrer'
                target='_blank'
                href={`https://twitter.com/share?ref_src=twsrc%5Etfw&url=${window.location.origin}/blog/${blog.slug}`}
                className={styles.menuItem}
                data-show-count='false'
            >
                <i className='fa-brands fa-twitter'></i>
                <span>Chia sẻ lên Twitter</span>
            </TippyItem>

            <TippyItem
                href={`mailto:mail@mail.com?subject=${encodeURIComponent(
                    'Check out this blog'
                )}&body=${encodeURIComponent(
                    window.location.origin + '/blog/' + blog.slug
                )}`}
                className={styles.menuItem}
            >
                <i className='fa-solid fa-envelope'></i>
                <span>Chia sẻ tới Email</span>
            </TippyItem>
            <TippyItem
                className={styles.menuItem}
                onClick={() =>
                    copyToClipboard(
                        `${window.location.origin}/blog/${blog.slug}`
                    )
                }
            >
                <i className='fa-solid fa-link'></i>
                <span>Sao chép liên kết</span>
            </TippyItem>
            {user.userId !== blog.postedBy._id && (
                <TippyItem
                    className={styles.menuItem}
                    onClick={() => reportBlog(blog._id)}
                >
                    <i className='fa-solid fa-flag'></i>
                    <span>Báo cáo bài viết</span>
                </TippyItem>
            )}
        </Tippy>
    );
};

export default BlogTippy;

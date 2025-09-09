import React, { useEffect, useState } from 'react';
import styles from './BlogSameAuthor.module.scss';
import { Link } from 'react-router-dom';
import { apiURL } from '../../context/constants';

const BlogSameAuthor = ({ postedBy, blogId }) => {
    const [blogSameAuthor, setBlogSameAuthor] = useState([]);

    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            try {
                const res = await fetch(`${apiURL}/blog/${blogId}/${postedBy}`);
                const data = await res.json();
                setBlogSameAuthor(data);
            } catch (error) {
                console.log(error.message);
            }
        })();

        return () => controller?.abort();
    }, [blogId, postedBy]);

    return (
        <div className={styles.wrapper}>
            <h3 className={styles.heading}>Bài đăng cùng tác giả</h3>

            <ul className={styles.list}>
                {blogSameAuthor.length === 0 && (
                    <p className={styles.noBlogSameAuthor}>
                        Tác giả chưa có bài đăng nào khác.
                    </p>
                )}
                {blogSameAuthor.length > 0 &&
                    blogSameAuthor?.map((blog) => (
                        <li key={blog._id}>
                            <Link to={`/blog/${blog.slug}`}>
                                {blog.titleDisplay}
                            </Link>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default BlogSameAuthor;

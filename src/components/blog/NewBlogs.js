import React, { useState, useEffect } from 'react';
import SecondaryCard from '../utils/card/SecondaryCard';
import { Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styles from './NewBlogs.module.scss';
import { apiURL } from '../../context/constants';
import noPhotoUser from '../../asset/images/nobody_m.256x256.jpg';
import timeSince from '../utils/timeSince/timeSince';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

const NewBlogs = ({ blogs }) => {
  const navigate = useNavigate();

  const [bookmarkData, setBookmarkData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const token = Cookies.get('token');
        if (!token) return;

        const res = await fetch(
          `${apiURL}/me/bookmark`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
          {
            signal: controller.signal,
          }
        );
        const data = await res.json();
        setBookmarkData(data.bookmark);
      } catch (error) {
        console.log(error.message);
      }
    })();

    return () => controller?.abort();
  }, []);

  const bookmark = async (blogId) => {
    try {
      const token = Cookies.get('token');
      if (!token) return navigate('/login');

      const res = await fetch(`${apiURL}/me/bookmark`, {
        method: 'PUT',
        body: JSON.stringify({ blogId }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setBookmarkData(data.bookmark);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {blogs?.map((blog) => (
        <SecondaryCard key={blog._id}>
          <div className={styles.header}>
            <div className={styles.author}>
              <Link to={`/blog/${blog.slug}`}>
                <Image src={blog.postedBy.photoURL} />
              </Link>
              <Link to={`/blog/${blog.slug}`}>
                <span>{blog.postedBy.fullName}</span>
              </Link>
            </div>
            <div className={styles.action} onClick={() => bookmark(blog._id)}>
              <i
                className={
                  bookmarkData && bookmarkData.includes(blog._id)
                    ? `${styles.bookmarkActive} fa-solid fa-bookmark`
                    : 'fa-regular fa-bookmark'
                }
              ></i>
              <i className="fa-solid fa-ellipsis"></i>
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.content}>
              <Link to={`/blog/${blog.slug}`}>
                <h3>{blog.titleDisplay}</h3>
                <p>{blog.description ? blog.description : blog.content}</p>
              </Link>
              <div className={styles.info}>
                <span>{timeSince(blog.createdAt)}</span>
                <span className={styles.dot}>.</span>
                {blog.readingTime} phút đọc
              </div>
            </div>
            {blog.image && (
              <div className={styles.image}>
                <Link to={`/blog/${blog.slug}`}>
                  <Image src={blog.image} />
                </Link>
              </div>
            )}
          </div>
        </SecondaryCard>
      ))}
    </>
  );
};

export default NewBlogs;

import React, { Suspense, useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './BookmarkPost.module.scss';
import '../../sass/_withSidebarContent.scss';
import '../../sass/_mainHeadingTitle.scss';
import { Row } from 'react-bootstrap';
import Header from '../../components/main-layout/nav/Header';
import SideBar from '../../components/main-layout/sidebar/SideBar';
import Cookies from 'js-cookie';
import { apiURL } from '../../context/constants';
import timeSince from '../../components/utils/timeSince/timeSince';
import Tabs from '../../components/utils/tabs/Tabs';

const Footer = React.lazy(() =>
  import('../../components/main-layout/footer/Footer')
);

const BookmarkPost = () => {
  const [bookmarkData, setBookmarkData] = useState(null);

  useEffect(() => {
    document.title = 'Bài viết đã lưu tại F8';
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const token = Cookies.get('token');
        if (!token) return;

        const res = await fetch(
          `${apiURL}/me/bookmark-post`,
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

        setBookmarkData(data);
      } catch (error) {
        console.log(error.message);
      }
    })();

    return () => controller?.abort();
  }, []);

  return (
    <>
      <Header />
      <Row>
        <Col xs={0} sm={0} md={1} lg={1} xl={1}>
          <SideBar />
        </Col>
        <Col xs={12} sm={12} md={12} lg={8} xl={8}>
          <div className="withSidebarContent">
            <div className={styles.wrapper}>
              <h1 className="mainHeadingTitle">Bài viết đã lưu</h1>
              <div className={styles.tabs}>
                <Tabs
                  isActive={true}
                  tab={'Bài viết'}
                  quantity={bookmarkData ? `(${bookmarkData.length})` : `(0)`}
                  path={'/bookmark-post'}
                />
              </div>
              {bookmarkData && bookmarkData.length === 0 && (
                <div className={styles.message}>
                  <p>Bạn chưa lưu bài viết nào.</p>
                  <p>
                    Bấm vào đây để{' '}
                    <Link to="/blog">xem các bài viết nổi bật.</Link>
                  </p>
                </div>
              )}
              {bookmarkData &&
                bookmarkData.map((bookmark) => (
                  <ul key={bookmark._id} className={styles.bookmarkList}>
                    <li>
                      <h3>
                        <a href={`blog/${bookmark.slug}`}>
                          <span>{bookmark.titleDisplay}</span>
                        </a>
                      </h3>
                      <div className={styles.author}>
                        <a href={`blog/${bookmark.slug}`}>
                          Đã đăng {timeSince(bookmark.createdAt)}
                        </a>
                        <span className={styles.dot}>.</span>
                        <span>
                          Tác giả <strong>{bookmark.postedBy.fullName}</strong>
                        </span>
                      </div>
                      <span className={styles.option}>
                        <i className="fa-solid fa-ellipsis"></i>
                      </span>
                    </li>
                  </ul>
                ))}
            </div>
          </div>
        </Col>
      </Row>
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </>
  );
};

export default BookmarkPost;

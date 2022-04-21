import React, { Suspense, useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../../components/main-layout/nav/Header';
import SideBar from '../../components/main-layout/sidebar/SideBar';
import '../../sass/_withSidebarContent.scss';
import '../../sass/_container.scss';
import styles from './MyBlog.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { apiURL } from '../../context/constants';
import Cookies from 'js-cookie';
import timeSince from '../../components/utils/timeSince/timeSince';
import Tabs from '../../components/utils/tabs/Tabs';

const Footer = React.lazy(() =>
  import('../../components/main-layout/footer/Footer')
);

const MyBlog = () => {
  const location = useLocation();

  const [tabs, setTabs] = useState(location.pathname);
  const [myBlog, setMyBlog] = useState([]);
  const [myDraftBlog, setMyDraftBlog] = useState([]);

  useEffect(() => {
    document.title = 'Bài viết của tôi tại F8';
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const token = Cookies.get('token');
        if (!token) return;

        const res = await Promise.all([
          fetch(
            `${apiURL}/blog/draft`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            },
            {
              signal: controller.signal,
            }
          ),
          fetch(
            `${apiURL}/help/my-post`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            },
            {
              signal: controller.signal,
            }
          ),
        ]);

        const myDraftBlogData = await res[0].json();
        const myBlogData = await res[1].json();

        console.log(myDraftBlogData);

        setMyDraftBlog(myDraftBlogData);
        setMyBlog(myBlogData);
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
        <SideBar />
        <Col xs={12} sm={12} md={12} lg={11} xl={11} style={{ padding: '8px' }}>
          <div className="withSidebarContent">
            <div className="container" style={{ marginBottom: 100 }}>
              <div className="containerTop">
                <h2>Bài viết của tôi</h2>
              </div>
              <Container fluid style={{ padding: 0 }}>
                <Row style={{ marginTop: 0 }}>
                  <Col xs={12} md={12} xl={8}>
                    <div className={styles.tabs}>
                      <Tabs
                        path={'/my-post/drafts'}
                        tab={'Bản nháp'}
                        quantity={`(${myDraftBlog.length})`}
                        onActive={() => setTabs('/my-post/drafts')}
                        isActive={tabs === '/my-post/drafts'}
                      />
                      <Tabs
                        path={'/my-post/published'}
                        tab={'Đã xuất bản'}
                        quantity={`(${myBlog.length})`}
                        onActive={() => setTabs('/my-post/published')}
                        isActive={tabs === '/my-post/published'}
                      />
                    </div>
                    {tabs === '/my-post/drafts' && myDraftBlog.length === 0 && (
                      <div className={styles.message}>
                        <p>Chưa có bản nháp nào.</p>
                        <p>
                          Bấm vào đây để{' '}
                          <Link to="/blog">xem các bài viết nổi bật.</Link>
                        </p>
                      </div>
                    )}
                    {tabs === '/my-post/drafts' &&
                      myDraftBlog &&
                      myDraftBlog.map((blog) => (
                        <ul key={blog._id} className={styles.blogList}>
                          <li>
                            <h3>
                              <Link to={`/new-post/${blog._id}`}>
                                <span>{blog.title}</span>
                              </Link>
                            </h3>
                            <div className={styles.author}>
                              <Link to={`/new-post/${blog._id}`}>
                                Chỉnh sửa {timeSince(blog.createdAt)}
                              </Link>
                              <span className={styles.dot}>.</span>
                              <span>{blog.readingTime} phút đọc</span>
                            </div>
                            <span className={styles.option}>
                              <i className="fa-solid fa-ellipsis"></i>
                            </span>
                          </li>
                        </ul>
                      ))}
                    {tabs === '/my-post/published' && myBlog.length === 0 && (
                      <div className={styles.message}>
                        <p>Chưa có xuất bản nào.</p>
                        <p>
                          Bấm vào đây để{' '}
                          <Link to="/blog">xem các bài viết nổi bật.</Link>
                        </p>
                      </div>
                    )}
                    {tabs === '/my-post/published' &&
                      myBlog &&
                      myBlog.map((blog) => (
                        <ul key={blog._id} className={styles.blogList}>
                          <li>
                            <h3>
                              <a href={`/blog/${blog.slug}`}>
                                {blog.schedule !== null && (
                                  <i
                                    className={`fa-solid fa-clock ${styles.clockIcon}`}
                                  ></i>
                                )}
                                <span>{blog.titleDisplay}</span>
                              </a>
                            </h3>
                            <div className={styles.author}>
                              <a href={`/blog/${blog.slug}`}>
                                Chỉnh sửa {timeSince(blog.createdAt)}
                              </a>
                              <span className={styles.dot}>.</span>
                              <span>{blog.readingTime} phút đọc</span>
                            </div>
                            <span className={styles.option}>
                              <i className="fa-solid fa-ellipsis"></i>
                            </span>
                          </li>
                        </ul>
                      ))}
                  </Col>
                </Row>
              </Container>
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

export default MyBlog;

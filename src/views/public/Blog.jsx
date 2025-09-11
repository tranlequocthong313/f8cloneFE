import React, { useState, useEffect, Suspense } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './Blog.module.scss';
import '../../sass/_withSidebarContent.scss';
import NewBlogs, { SkeletonNewBlogs } from '../../components/blog/NewBlogs';
import Topics from '../../components/blog/Topics';
import Header from '../../components/main-layout/nav/Header';
import SideBar from '../../components/main-layout/sidebar/SideBar';
import { apiURL, TOPICS } from '../../context/constants';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import Footer from '../../components/main-layout/footer/Footer';

const Blog = () => {
    const { topic = '' } = useParams();
    const [searchParams] = useSearchParams();

    const [blogs, setBlogs] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.title =
            'Danh sách bài viết về lĩnh vực IT / CNTT / Phần mềm / lập trình tại F8';
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            try {
                setIsLoading(true);
                const res = await fetch(
                    `${apiURL}/blog?topic=${topic}&tag=${
                        searchParams.get('tag') || ''
                    }`,
                    {
                        signal: controller.signal,
                    }
                );
                const data = await res.json();

                setBlogs(data);
            } catch (error) {
                console.log(error.message);
            } finally {
                setIsLoading(false);
            }
        })();

        return () => controller?.abort();
    }, [topic, searchParams.get('tag')]);

    const getTitle = () => {
        if (topic && TOPICS[topic]?.title) {
            return TOPICS[topic]?.title;
        }

        if (searchParams.get('tag')) {
            return `Tag: ${searchParams.get('tag')}`;
        }

        return 'Bài viết nổi bật';
    };

    const getDescription = () => {
        if (topic && TOPICS[topic]?.description) {
            return TOPICS[topic]?.description;
        }

        if (searchParams.get('tag')) {
            return `Tổng hợp các bài viết được gắn thẻ "${searchParams.get(
                'tag'
            )}" trong nội dung.`;
        }

        return 'Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và các kỹ thuật lập trình web.';
    };

    return (
        <>
            <Header />
            <Row>
                <SideBar />
                <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={11}
                    xl={11}
                    style={{ marginBottom: 80 }}
                >
                    <div className='withSidebarContent'>
                        <Row className={styles.wrapper}>
                            <div className={styles.containerTop}>
                                <h2>{getTitle()}</h2>
                                <p>{getDescription()}</p>
                            </div>
                            <Col
                                xs={12}
                                lg={8}
                                xl={8}
                                className={styles.leftLayout}
                            >
                                {isLoading ? (
                                    <SkeletonNewBlogs />
                                ) : (
                                    <>
                                        {blogs && blogs.length !== 0 && (
                                            <NewBlogs blogs={blogs} />
                                        )}
                                        {(!blogs || blogs.length === 0) && (
                                            <p>
                                                Không có bài viết nào{' '}
                                                <Link to='/new-post'>
                                                    thêm bài viết.
                                                </Link>
                                            </p>
                                        )}
                                    </>
                                )}
                            </Col>
                            <Col
                                xs={12}
                                lg={4}
                                xl={4}
                                className={styles.rightLayout}
                            >
                                <Topics />
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <Footer />
        </>
    );
};

export default Blog;

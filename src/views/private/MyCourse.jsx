import React, { useState, useEffect, Suspense } from 'react';
import Header from '../../components/main-layout/nav/Header';
import SideBar from '../../components/main-layout/sidebar/SideBar';
import { Col, Row } from 'react-bootstrap';
import { apiURL } from '../../context/constants';
import CourseList from '../../components/home/courses/CourseList';
import MainCardAdd from '../../components/utils/card/MainCardAdd';
import Footer from '../../components/main-layout/footer/Footer';

const MyCourse = () => {
    const [courseFE, setCourseFE] = useState([]);

    useEffect(() => {
        document.title = 'Thiết lập về tôi tại F8';
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            try {
                const res = await fetch(`${apiURL}`, {
                    signal: controller.signal,
                });
                const data = await res.json();

                setCourseFE(data.courseFE);
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
                <Col xs={12} sm={12} md={12} lg={11} xl={11}>
                    <div className='withSidebarContent'>
                        <div className='container'>
                            <div className='containerTop'>
                                <h2>Khóa học của tôi</h2>
                                <p>Bạn chưa hoàn thành khóa học nào.</p>
                            </div>
                            <CourseList courses={courseFE} path={'/courses'} />
                        </div>
                    </div>
                </Col>
            </Row>
            <Footer />
        </>
    );
};

export default MyCourse;

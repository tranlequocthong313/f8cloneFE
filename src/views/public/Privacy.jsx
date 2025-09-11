import React, { Suspense, useEffect } from 'react';
import styles from './Privacy.module.scss';
import Header from '../../components/main-layout/nav/Header';
import SideBar from '../../components/main-layout/sidebar/SideBar';
import { Row, Col, Container } from 'react-bootstrap';
import Footer from '../../components/main-layout/footer/Footer';

const Privacy = () => {
    useEffect(() => {
        document.title = 'Chính sách bảo mật';
    }, []);

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
                    style={{ height: 1000 }}
                >
                    <div className='withSidebarContent'>
                        <div className='container'>
                            <div className='containerTop'>
                                <h2>Chính sách bảo mật</h2>
                                <p>Chính sách bảo mật</p>
                            </div>
                            <Container fluid style={{ padding: 0 }}>
                                <Row style={{ marginTop: 0 }}>
                                    <Col xs={12} lg={8} xl={8}>
                                        Nội dung chính sách bảo mật
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </div>
                </Col>
            </Row>
            <Footer />
        </>
    );
};

export default Privacy;

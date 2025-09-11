import React, { Suspense, useEffect } from 'react';
import '../../sass/_withSidebarContent.scss';
import ctaImage from '../../asset/images/fb-group-cards@2x.png';
import Suggestion from '../../components/utils/suggestion/Suggestion';
import { Col, Row } from 'react-bootstrap';
import LearningList from '../../components/learning-path/LearningList';
import SideBar from '../../components/main-layout/sidebar/SideBar';
import Header from '../../components/main-layout/nav/Header';
import styles from './LearningPath.module.scss';
import Footer from '../../components/main-layout/footer/Footer';

const LearningPath = () => {
    useEffect(() => {
        document.title =
            'Lộ trình học lập trình cho người mới tại F8 | Tự học lập trình từ đầu ở nhà';
    }, []);

    return (
        <>
            <Header />
            <Row>
                <SideBar />
                <Col xs={12} sm={12} md={12} lg={11} xl={11}>
                    <div className='withSidebarContent'>
                        <Row className={styles.wrapper}>
                            <div className={styles.containerTop}>
                                <h2>Lộ trình học</h2>
                                <p>
                                    Để bắt đầu một cách thuận lợi, bạn nên tập
                                    trung vào một lộ trình học. Ví dụ: Để đi làm
                                    với vị trí “Lập trình viên Front-end” bạn
                                    nên tập trung vào lộ trình “Front-end”.
                                </p>
                            </div>
                            <LearningList />
                            <Suggestion
                                title={
                                    'Tham gia cộng đồng học viên F8 trên Facebook'
                                }
                                description={
                                    'Hàng nghìn người khác đang học lộ trình giống như bạn. Hãy tham gia hỏi đáp, chia sẻ và hỗ trợ nhau trong quá trình học nhé.'
                                }
                                button={'Tham gia nhóm'}
                                image={ctaImage}
                            />
                        </Row>
                    </div>
                </Col>
            </Row>
            <Footer />
        </>
    );
};

export default LearningPath;

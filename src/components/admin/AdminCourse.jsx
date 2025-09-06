import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import MainTable from '../utils/table/MainTable';
import styles from './AdminCourse.module.scss';
import { apiURL } from '../../context/constants';

const AdminCourse = ({ courseData }) => {
    const formatStudentCount = (number) =>
        new Intl.NumberFormat(['ban', 'id']).format(number);

    // useEffect(() => {
    //     fetch(`${apiURL}/courses/lessons`)
    //         .then((res) => res.json())
    //         .then((lessons) => {
    //             lessons.forEach(async (lesson) => {
    //                 const res = await fetch(
    //                     `https://www.googleapis.com/youtube/v3/videos?id=${lesson.videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&part=snippet,contentDetails,statistics,status`
    //                 );
    //                 const data = await res.json();
    //                 const video = data.items[0];
    //                 const title = video.snippet.localized.title;
    //                 fetch(`${apiURL}/courses/lessons/${lesson._id}`, {
    //                     method: 'PUT',
    //                     body: JSON.stringify({
    //                         title: title.replace(/^[0-9]+\.\s*/, ''),
    //                     }),
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                     },
    //                 });
    //             });
    //         });
    // }, []);

    return (
        <MainTable>
            <thead>
                <tr>
                    <th>
                        <Form>
                            <Form.Check type={'checkbox'} />
                        </Form>
                    </th>
                    <th className={styles.tableItem}>STT</th>
                    <th>Tên khóa học</th>
                    <th className={styles.tableItem}>Cấp độ</th>
                    <th className={styles.tableItem}>Vai trò</th>
                    <th className={styles.tableItem}>Yêu cầu</th>
                    <th className={styles.tableItem}>Số lượng học sinh</th>
                    <th className={styles.tableItem}>Thời gian tạo</th>
                    <th className={styles.tableItem}>Thời gian sửa</th>
                </tr>
            </thead>
            <tbody>
                {courseData?.map((course, index) => (
                    <tr key={course._id}>
                        <td>
                            <Form>
                                <Form.Check type={'checkbox'} />
                            </Form>
                        </td>
                        <td className={styles.tableItem}>{index + 1}</td>
                        <td>{course.title}</td>
                        <td className={styles.tableItem}>{course.level}</td>
                        <td className={styles.tableItem}>{course.role}</td>
                        <td className={styles.tableItem}>
                            {course.requirement ? 'Yes' : 'No'}
                        </td>
                        <td className={styles.tableItem}>
                            {formatStudentCount(course.studentCount)}
                        </td>
                        <td className={styles.tableItem}>{course.createdAt}</td>
                        <td className={styles.tableItem}>{course.updatedAt}</td>
                    </tr>
                ))}
            </tbody>
        </MainTable>
    );
};

export default AdminCourse;

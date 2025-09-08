import React, { useContext, useState, useEffect } from 'react';
import LearningActionBar from '../../components/learning/LearningActionBar';
import LearningContent from '../../components/learning/LearningContent';
import LearningHeader from '../../components/learning/LearningHeader';
import LearningTrack from '../../components/learning/LearningTrack';
import { LearningContext } from '../../context/LearningContext';

const Learning = () => {
    const {
        isShowMenuTrack,
        toggleShowMenuTrack,
        course,
        loading,
        learningLesson,
        resetStates,
    } = useContext(LearningContext);

    useEffect(() => {
        return () => resetStates();
    }, []);

    return (
        <>
            <LearningHeader />
            <LearningContent
                isShowMenuTrack={isShowMenuTrack}
                learningLesson={learningLesson}
            />
            {isShowMenuTrack && (
                <LearningTrack loading={loading} episodes={course?.episodes} />
            )}

            <LearningActionBar
                toggleShowMenuTrack={toggleShowMenuTrack}
                isShowMenuTrack={isShowMenuTrack}
                loading={loading}
                episodes={course?.episodes}
            />
        </>
    );
};

export default Learning;

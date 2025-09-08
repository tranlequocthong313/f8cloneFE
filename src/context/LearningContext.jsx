import React, { createContext, useState, useEffect, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { apiURL } from './constants';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

export const LearningContext = createContext();

const LearningContextProvider = ({ children }) => {
    const location = useLocation();
    const user = useSelector((state) => state.user);
    const [searchParams, setSearchParams] = useSearchParams();

    const [isShowMenuTrack, setIsShowMenuTrack] = useState(true);
    const [query, setQuery] = useState(searchParams.get('id'));
    const [videoId, setVideoId] = useState('');
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [learningEpisode, setLearningEpisode] = useState(null);
    const [learningLesson, setLearningLesson] = useState(null);
    const [learningProgress, setLearningProgress] = useState([]);
    const [currentTime, setCurrentTime] = useState(0);
    const [isPause, setIsPause] = useState(false);
    const [playAt, setPlayAt] = useState(0);

    const getTotalLessonAtCurrentEpisode = (
        episodes = [],
        episodeIndex = 0
    ) => {
        return episodes
            ?.slice(0, episodeIndex)
            ?.reduce((acc, cur) => acc + cur?.lessons?.length, 0);
    };

    const getLessonStatus = (lessonId, progress) => {
        return (
            (progress || learningProgress)?.find(
                (ls) => ls.lessonId === lessonId
            )?.status || 'locked'
        );
    };

    useEffect(() => {
        if (!learningProgress || !course || learningLesson) return;

        const lessonId = searchParams.get('id');
        if (
            lessonId &&
            ['in-progress', 'completed'].includes(getLessonStatus(lessonId))
        ) {
            const ep = course.episodes.find(
                (ep) => !!ep.lessons.find((l) => l._id === lessonId)
            );
            return playVideo({
                lesson: ep.lessons.find((l) => l._id === lessonId),
                episode: ep,
            });
        }

        const episode = course.episodes.find((ep) =>
            ep.lessons.some((l) => getLessonStatus(l._id) === 'in-progress')
        );

        if (!episode) {
            const allCompleted = course.episodes.find((ep) =>
                ep.lessons.every((l) => getLessonStatus(l._id) === 'completed')
            );

            if (!allCompleted) return;

            const lastEpisode = course.episodes[course.episodes.length - 1];
            playVideo({
                lesson: lastEpisode.lessons[lastEpisode.lessons.length - 1],
                episode: lastEpisode,
            });

            return;
        }

        const lesson = episode.lessons.find(
            (l) => getLessonStatus(l._id) === 'in-progress'
        );

        playVideo({
            lesson,
            episode,
        });
    }, [learningProgress, course, searchParams, learningLesson]);

    useEffect(() => {
        if (!course) return;
        getLearningProgress(course._id);
    }, [course]);

    const resetStates = () => {
        setLearningProgress([]);
        setLearningEpisode(null);
        setLearningLesson(null);
        setQuery(null);
    };

    useEffect(() => {
        if (!user.isLoggedIn) {
            resetStates();
        }
    }, [user]);

    const getLearningProgress = async (courseId) => {
        const token = Cookies.get('token');
        if (!token) return;

        try {
            const res = await fetch(`${apiURL}/courses/${courseId}/progress`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            setLearningProgress(data?.progress?.lessons || []);
        } catch (error) {
            console.log('🚀 ~ getLearningProgress ~ error:', error);
        }
    };

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${apiURL}${location.pathname}`);
                if (!res.ok) throw new Error('Failed to fetch course');
                const data = await res.json();

                if (!data || !data.episodes) return;

                setCourse({
                    ...data,
                    episodes: data.episodes.map((ep, index) => ({
                        ...ep,
                        lessons: ep.lessons.map((ls, lsIndex) => ({
                            ...ls,
                            title: `${
                                getTotalLessonAtCurrentEpisode(
                                    data.episodes,
                                    index
                                ) +
                                lsIndex +
                                1
                            }. ${ls.title}`,
                        })),
                    })),
                });
            } catch (error) {
                console.error('Fetch course error:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [location.pathname]);

    const playVideo = ({ lesson, episode }, progress) => {
        if (getLessonStatus(lesson._id, progress) === 'locked') return;
        setPlayAt(0);
        setVideoId(lesson.videoId);
        setLearningEpisode(episode);
        setLearningLesson(lesson);
        createParams(lesson._id);
    };

    const createParams = (id) => {
        searchParams.set('id', id);
        setSearchParams(searchParams);
        setQuery(id);
    };

    const onEnd = async () => {
        const token = Cookies.get('token');
        if (!token) return;

        try {
            const res = await fetch(
                `${apiURL}/courses/${course._id}/progress`,
                {
                    method: 'PUT',
                    body: JSON.stringify({
                        lessonId: query,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await res.json();

            const progress = data?.progress?.lessons;

            setLearningProgress(progress);

            const result = getLessonAndEpisode(
                'next',
                query,
                learningEpisode,
                course
            );
            if (result) {
                if (getLessonStatus(result.lesson._id, progress) !== 'locked') {
                    playVideo(result, progress);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const toggleShowMenuTrack = () => setIsShowMenuTrack((prev) => !prev);
    const showMenuTrack = () => setIsShowMenuTrack(true);
    const closeMenuTrack = () => setIsShowMenuTrack(false);

    const getLessonAndEpisode = (
        direction,
        currentLessonId,
        currentEpisode,
        course
    ) => {
        if (!currentEpisode?.lessons?.length) return null;

        const lessons = currentEpisode.lessons;
        const lessonIndex = lessons.findIndex(
            (lesson) => lesson._id === currentLessonId
        );

        const offset = direction === 'next' ? 1 : -1;
        const nextLessonIndex = lessonIndex + offset;

        if (nextLessonIndex >= 0 && nextLessonIndex < lessons.length) {
            return {
                lesson: lessons[nextLessonIndex],
                episode: currentEpisode,
            };
        }

        const episodes = course?.episodes || [];
        const episodeIndex = episodes.findIndex(
            (ep) => ep._id === currentEpisode._id
        );

        if (episodeIndex === -1) return null;

        const nextEpisodeIndex =
            direction === 'next' ? episodeIndex + 1 : episodeIndex - 1;

        if (nextEpisodeIndex < 0 || nextEpisodeIndex >= episodes.length)
            return null;

        const targetEpisode = episodes[nextEpisodeIndex];
        if (!targetEpisode.lessons?.length) return null;

        const targetLesson =
            direction === 'next'
                ? targetEpisode.lessons[0]
                : targetEpisode.lessons[targetEpisode.lessons.length - 1];

        return {
            lesson: targetLesson,
            episode: targetEpisode,
        };
    };

    const goNextLesson = () => {
        const result = getLessonAndEpisode(
            'next',
            query,
            learningEpisode,
            course
        );
        if (result) playVideo(result);
    };

    const goPrevLesson = () => {
        const result = getLessonAndEpisode(
            'prev',
            query,
            learningEpisode,
            course
        );
        if (result) playVideo(result);
    };

    const totalLessons = useMemo(() => {
        return course?.episodes?.flatMap((ep) => ep.lessons).length;
    }, [course]);

    const totalCompletedLessons = useMemo(() => {
        return course?.episodes
            ?.flatMap((ep) => ep.lessons)
            ?.reduce((acc, cur) => {
                if (getLessonStatus(cur._id) === 'completed') {
                    return acc + 1;
                }
                return acc;
            }, 0);
    }, [course, learningProgress]);

    const pauseVideo = () => setIsPause(true);
    const unPauseVideo = () => setIsPause(false);

    const playVideoAt = (lessonId, time) => {
        if (getLessonStatus(lessonId) === 'locked') return;
        const episode = course.episodes.find((ep) =>
            ep.lessons.find((l) => l._id === lessonId)
        );
        const lesson = episode.lessons.find((l) => l._id === lessonId);
        setPlayAt(time);
        setVideoId(lesson.videoId);
        setLearningEpisode(episode);
        setLearningLesson(lesson);
        createParams(lessonId);
    };

    const value = {
        course,
        isShowMenuTrack,
        playVideo,
        toggleShowMenuTrack,
        showMenuTrack,
        closeMenuTrack,
        videoId,
        onEnd,
        loading,
        goNextLesson,
        goPrevLesson,
        learningEpisode,
        learningLessonId: query,
        learningLesson,
        learningProgress,
        getLessonStatus,
        totalLessons,
        resetStates,
        totalCompletedLessons,
        currentTime,
        setCurrentTime,
        isPause,
        pauseVideo,
        unPauseVideo,
        playVideoAt,
        playAt,
    };

    return (
        <LearningContext.Provider value={value}>
            {children}
        </LearningContext.Provider>
    );
};

export default LearningContextProvider;

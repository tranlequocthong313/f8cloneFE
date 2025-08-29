import React, { createContext, useState, useEffect, useContext } from 'react';
import {
    useLocation,
    useNavigate,
    createSearchParams,
    useSearchParams,
    useParams,
} from 'react-router-dom';
import { apiURL } from './constants';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

export const LearningContext = createContext();

const LearningContextProvider = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const [isShowMenuTrack, setIsShowMenuTrack] = useState(true);
    const [chosenLesson, setChosenLesson] = useState(null);
    const [lockedLesson, setLockedLesson] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('id'));
    const [play, setPlay] = useState(false);
    const [videoId, setVideoId] = useState('');
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [learningEpisode, setLearningEpisode] = useState(null);
    const [learningLesson, setLearningLesson] = useState(null);
    const [learningProgress, setLearningProgress] = useState([]);

    const getTotalLessonAtCurrentEpisode = (
        episodes = [],
        episodeIndex = 0
    ) => {
        return episodes
            ?.slice(0, episodeIndex)
            ?.reduce((acc, cur) => acc + cur?.lessons?.length, 0);
    };

    const getLessonStatus = (lessonId) => {
        return (
            learningProgress?.find((ls) => ls.lessonId === lessonId)?.status ||
            'locked'
        );
    };

    useEffect(() => {
        if (!learningProgress || !course) return;

        const episode = course.episode.find((ep) =>
            ep.lessons.some((l) => getLessonStatus(l._id) === 'in-progress')
        );

        if (!episode) {
            const allCompleted = course.episode.find((ep) =>
                ep.lessons.every((l) => getLessonStatus(l._id) === 'completed')
            );

            if (!allCompleted) return;

            const lastEpisode = course.episode[course.episode.length - 1];
            playVideo({
                lesson: lastEpisode.lessons[lastEpisode.lessons.length - 1],
                episode: lastEpisode,
            });

            return
        }

        const lesson = episode.lessons.find(
            (l) => getLessonStatus(l._id) === 'in-progress'
        );

        playVideo({
            lesson,
            episode,
        });
    }, [learningProgress, course]);

    useEffect(() => {
        if (!course || !user.isLoggedIn) return;
        getLearningProgress(course._id);
    }, [course, user]);

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

                setCourse({
                    ...data,
                    episode: data.episode.map((ep, index) => ({
                        ...ep,
                        title: `${index + 1}. ${ep.title}`,
                        lessons: ep.lessons.map((ls, lsIndex) => ({
                            ...ls,
                            title: `${
                                getTotalLessonAtCurrentEpisode(
                                    data.episode,
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

    const playVideo = ({ lesson, episode }) => {
        if (getLessonStatus(lesson._id) === 'locked') return;
        setPlay(true);
        setVideoId(lesson.videoId);
        setLearningEpisode(episode);
        setLearningLesson(lesson);
        createParams(lesson._id);
    };

    const createParams = (id) => {
        navigate({
            pathname: location.pathname,
            search: createSearchParams({
                id,
            }).toString(),
        });
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
            setLearningProgress(data?.progress?.lessons || []);

            setTimeout(goNextLesson, 0);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleIsShowMenuTrack = () => setIsShowMenuTrack((prev) => !prev);

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

        const episodes = course?.episode || [];
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
        console.log('🚀 ~ goNextLesson ~ result:', result);
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

    const value = {
        course,
        isShowMenuTrack,
        chosenLesson,
        lockedLesson,
        playVideo,
        handleIsShowMenuTrack,
        videoId,
        play,
        setPlay,
        onEnd,
        loading,
        goNextLesson,
        goPrevLesson,
        learningEpisode,
        learningLessonId: query,
        learningLesson,
        learningProgress,
        getLessonStatus,
    };

    return (
        <LearningContext.Provider value={value}>
            {children}
        </LearningContext.Provider>
    );
};

export default LearningContextProvider;

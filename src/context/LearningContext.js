import React, { createContext, useState, useEffect, useContext } from 'react';
import {
    useLocation,
    useNavigate,
    createSearchParams,
    useSearchParams,
} from 'react-router-dom';
import { apiURL } from './constants';

export const LearningContext = createContext();

const LearningContextProvider = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();

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

    const getTotalLessonAtCurrentEpisode = (
        episodes = [],
        episodeIndex = 0
    ) => {
        return episodes
            ?.slice(0, episodeIndex)
            ?.reduce((acc, cur) => acc + cur?.lessons?.length, 0);
    };

    useEffect(() => {
        const fetchCourse = async () => {
            if (location.pathname.startsWith('/learning/')) {
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
            }
        };

        fetchCourse();
    }, [location.pathname]);

    const active = async (id) => {
        try {
            setIsShowMenuTrack(id);
            createParams(id);
            await fetch(`${apiURL}${location.pathname}?id=${query}`);
        } catch (error) {
            console.log(error.message);
        }
    };

    const playVideo = ({ lesson, episode }) => {
        setIsShowMenuTrack((prev) => !prev);
        setPlay(true);
        active(lesson._id);
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
        try {
            await fetch(`${apiURL}${location.pathname}?id=${query}`);
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
    };

    return (
        <LearningContext.Provider value={value}>
            {children}
        </LearningContext.Provider>
    );
};

export default LearningContextProvider;

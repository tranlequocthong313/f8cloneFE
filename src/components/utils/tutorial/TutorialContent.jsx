import { Form } from 'react-bootstrap';
import styles from './TutorialContent.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useTour } from '@reactour/tour';

export const TutorialContent = ({ content, currentStep, setCurrentStep }) => {
    const { steps } = useTour();

    const [playAudio, setPlayAudio] = useState(false);

    const audioRef = useRef(null);

    useEffect(() => {
        const handleEnded = () => {
            if (currentStep < steps.length - 1) {
                setCurrentStep((prev) => prev + 1);
            }
        };

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.removeEventListener('ended', handleEnded);
        }

        if (playAudio && steps[currentStep]?.audio) {
            const audio = new Audio(steps[currentStep].audio);
            audioRef.current = audio;

            audio.addEventListener('ended', handleEnded);
            audio.play().catch(() => {
                console.warn(
                    'Audio playback failed (user gesture may be required)'
                );
            });
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.removeEventListener('ended', handleEnded);
            }
        };
    }, [currentStep, playAudio, steps]);

    useEffect(() => {
        if (!playAudio && audioRef.current) {
            audioRef.current.pause();
        }
    }, [playAudio]);

    return (
        <div className={styles.wrapper}>
            {content}
            <Form.Check
                className={styles.checkboxAudio}
                onChange={(e) => setPlayAudio(e.target.checked)}
                checked={playAudio}
                type='checkbox'
                id='tutorial-audio-checkbox'
                label='Nghe giọng Miu >_<'
            />
        </div>
    );
};

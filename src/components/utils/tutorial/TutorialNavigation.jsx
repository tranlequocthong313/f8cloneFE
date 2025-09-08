import styles from './TutorialNavigation.module.scss';

export const TutorialNextButton = ({
    currentStep,
    stepsLength,
    setIsOpen,
    setCurrentStep,
}) => {
    return (
        <button
            onClick={() => {
                setCurrentStep((step) => {
                    if (step < stepsLength - 1) {
                        return step + 1;
                    }
                    return 0;
                });
                if (currentStep === stepsLength - 1) {
                    setIsOpen(false);
                }
            }}
            className={`${styles.nextBtn} ${styles.tourBtn}`}
        >
            {currentStep === 0
                ? 'Theo Miu'
                : currentStep === stepsLength - 1
                ? 'Bye Miu ~'
                : 'Đi tiếp'}
        </button>
    );
};

export const TutorialPrevButton = ({ currentStep, setCurrentStep }) => {
    return (
        <button
            onClick={() => {
                if (currentStep === 0) return;
                setCurrentStep((step) => step - 1);
            }}
            className={`${styles.prevBtn} ${styles.tourBtn}`}
            disabled={currentStep === 0}
        >
            Quay lại
        </button>
    );
};

import { TourProvider } from '@reactour/tour';
import {
    TutorialNextButton,
    TutorialPrevButton,
} from '../components/utils/tutorial/TutorialNavigation';
import { TutorialContent } from '../components/utils/tutorial/TutorialContent';

function TutorialProvider({ children }) {
    return (
        <TourProvider
            showCloseButton={false}
            showBadge={false}
            disableInteraction={true}
            nextButton={TutorialNextButton}
            prevButton={TutorialPrevButton}
            components={{
                Content: TutorialContent,
            }}
        >
            {children}
        </TourProvider>
    );
}

export default TutorialProvider;

import styles from './CommentWrapper.module.scss';
import Comment from './Comment';
import VerticalModal from '../vertical-modal/VerticalModal';

const CommentWrapper = ({ button, entity }) => {
    return (
        <VerticalModal
            button={button}
            placement={'end'}
            closeButton={true}
            className={styles.wrapper}
        >
            <Comment entity={entity} />
        </VerticalModal>
    );
};

export default CommentWrapper;

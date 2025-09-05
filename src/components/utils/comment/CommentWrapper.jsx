import styles from './CommentWrapper.module.scss';
import Comment from './Comment';
import VerticalModal from '../vertical-modal/VerticalModal';
import { memo } from 'react';

const CommentWrapper = ({ open = false, button, entity, onClose }) => {
    return (
        <VerticalModal
            button={button}
            placement={'end'}
            closeButton={true}
            className={styles.wrapper}
            open={open}
            onClose={onClose}
        >
            <Comment entity={entity} />
        </VerticalModal>
    );
};

export default memo(CommentWrapper);

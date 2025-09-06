import Comment from './Comment';
import Panel from '../panel/Panel';
import styles from '../panel/Panel.module.scss';
import { memo } from 'react';

const CommentWrapper = ({ open = false, button, entity, onClose }) => {
    return (
        <Panel
            button={button}
            placement={'end'}
            closeButton={true}
            className={styles.wrapper}
            open={open}
            onClose={onClose}
        >
            <Comment entity={entity} />
        </Panel>
    );
};

export default memo(CommentWrapper);

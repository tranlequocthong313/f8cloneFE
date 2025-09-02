import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import styles from './Tippy.module.scss';

const Tippy = ({ button, children, className }) => {
    const [show, setShow] = useState(false);

    const CustomToggle = React.forwardRef(({ onClick }, ref) => (
        <div
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {button}
        </div>
    ));

    return (
        <Dropdown show={show} onToggle={setShow}>
            <Dropdown.Toggle as={CustomToggle} />
            <Dropdown.Menu
                className={`${styles.tippy} ${className}`}
                onSelect={() => setShow(false)}
            >
                {children}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export const TippyItem = ({ children, ...props }) => {
    return <Dropdown.Item {...props}>{children}</Dropdown.Item>;
};

export default Tippy;

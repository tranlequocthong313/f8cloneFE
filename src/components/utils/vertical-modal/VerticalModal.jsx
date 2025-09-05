import React, { useState, useEffect } from 'react';
import { Offcanvas } from 'react-bootstrap';
import styles from './VerticalModal.module.scss';
import '../../../sass/_offCanvas.scss';

const VerticalModal = ({
    button,
    buttonStyle,
    className,
    hideOnComputer,
    placement,
    header,
    closeButton,
    children,
    open = false,
    onClose,
}) => {
    const [show, setShow] = useState(open);

    useEffect(() => {
        setShow(open);
    }, [open]);

    const toggleShow = () => {
        if (show) {
            onClose();
        }
        setShow((prev) => !prev);
    };

    useEffect(() => {
        const resize = () => {
            const isWidthGreaterThanOrEqual1024px = window.innerWidth >= 1024;
            if (isWidthGreaterThanOrEqual1024px) return setShow(false);
        };
        hideOnComputer && window.addEventListener('resize', resize);

        return () => window.removeEventListener('resize', resize);
    }, [hideOnComputer]);

    return (
        <>
            {button && (
                <div onClick={toggleShow} className={buttonStyle}>
                    {button}
                </div>
            )}

            <Offcanvas
                show={show}
                onHide={toggleShow}
                className={`${styles.wrapper} ${className}`}
                placement={placement}
                name={placement}
            >
                <Offcanvas.Header closeButton={closeButton}>
                    <Offcanvas.Title>{header}</Offcanvas.Title>
                </Offcanvas.Header>
                {children}
            </Offcanvas>
        </>
    );
};

export default VerticalModal;

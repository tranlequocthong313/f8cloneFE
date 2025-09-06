import React, { useState, useEffect } from 'react';
import { Offcanvas } from 'react-bootstrap';
import '../../../sass/_offCanvas.scss';

const Panel = ({
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
    hideButtonOnShow = false,
    headerClassName,
    onShow,
    ...props
}) => {
    const [show, setShow] = useState(open);

    useEffect(() => {
        setShow(open);
    }, [open]);

    const toggleShow = () => {
        if (show) {
            onClose?.();
        } else {
            onShow?.();
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

    const shouldShowButton = () => {
        if (hideButtonOnShow && show) return false;
        if (!button) return false;
        return true;
    };

    return (
        <>
            {shouldShowButton() && (
                <div onClick={toggleShow} className={buttonStyle}>
                    {button}
                </div>
            )}

            <Offcanvas
                show={show}
                onHide={toggleShow}
                className={className}
                placement={placement}
                name={placement}
                {...props}
            >
                <Offcanvas.Header
                    closeButton={closeButton}
                    className={headerClassName}
                >
                    <Offcanvas.Title>{header}</Offcanvas.Title>
                </Offcanvas.Header>
                {children}
            </Offcanvas>
        </>
    );
};

export default Panel;

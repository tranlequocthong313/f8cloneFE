import { Link } from 'react-router-dom';
import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import styles from './CircularProgressBar.module.scss';

const CircularProgressBar = ({
    logo,
    numberPercent = 0,
    tooltip,
    className,
    filledColor = '#f05123',
    strokedColor = '#4d4f50',
}) => {
    const radius = 18;
    const stroke = 2;
    const normalizedRadius = radius - stroke * 0.5;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - numberPercent * circumference || 0;

    const renderTooltip = (props) => (
        <Tooltip id='button-tooltip' {...props}>
            {tooltip}
        </Tooltip>
    );

    return (
        <div className={`${styles.wrapper} ${className}`}>
            <svg
                height={radius * 2}
                width={radius * 2}
                className={styles.svgCircle}
            >
                <circle
                    stroke={strokedColor}
                    fill='transparent'
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <circle
                    stroke={filledColor}
                    fill='transparent'
                    strokeWidth={stroke}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset }}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
            </svg>
            {logo && (
                <OverlayTrigger
                    placement='top'
                    delay={{ show: 50, hide: 100 }}
                    overlay={renderTooltip}
                >
                    <Link to='/' className={styles.courseStep}>
                        <Image src={logo} />
                    </Link>
                </OverlayTrigger>
            )}
            {!logo && (
                <div className={styles.percent}>
                    {Math.round(numberPercent * 100)}%
                </div>
            )}
        </div>
    );
};

export default CircularProgressBar;

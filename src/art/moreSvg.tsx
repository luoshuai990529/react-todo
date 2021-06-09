import react from 'react';

interface PropsType {}
function MoreSvg(props: PropsType) {
    return (
        <svg width="24" height="24">
            <g fill="none" stroke="currentColor" strokeLinecap="round" transform="translate(3 10)">
                <circle cx="2" cy="2" r="2"></circle>
                <circle cx="9" cy="2" r="2"></circle>
                <circle cx="16" cy="2" r="2"></circle>
            </g>
        </svg>
    );
}

export default MoreSvg;

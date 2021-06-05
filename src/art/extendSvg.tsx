import react from 'react';

interface PropsType {}
function ExtendSvg(props: PropsType) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="3" data-svgs-path="sm1/more_small.svg">
            <path fill="currentColor" fillRule="evenodd" d="M1.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"></path>
        </svg>
    );
}

export default ExtendSvg;

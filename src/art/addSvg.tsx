import react from 'react';

interface PropsType {}
function AddSvg(props: PropsType) {
    return (
        <svg width="13" height="13">
            <path d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z" fill="currentColor" fillRule="evenodd"></path>
        </svg>
    );
}

export default AddSvg;

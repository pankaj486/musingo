import React from 'react';
const Advertisement = ({ size, backgroundImage, progress }) => {

    const style = {
        background: `url(${backgroundImage}) no-repeat`,
        backgroundSize: 'cover',
        minHeight: size === 'small' ? '230px' : '',
        maxWidth: size === 'small' ? '179px' : ''
    }

    return (
        <div className="text-white d-flex flex-column justify-content-start" style={style}>
            <div className="progress mx-3 mt-2" style={{ height: '18px', borderRadius: '10px' }}>
                <div className="progress-bar bg-primary font-weight-bold" role="progressbar"
                    style={{ width: `${progress}%` }} aria-valuenow={progress}
                    aria-valuemin="0" aria-valuemax="100">{progress === 100 && <span style={{ marginTop: '-1.37px' }}>Online</span>}</div>
            </div>
            <h6 className="text-center mt-5 mx-auto my-auto">Learn
            Djambe
            traditionally</h6>
        </div>
    )
}

export default Advertisement;

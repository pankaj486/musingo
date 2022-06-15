import React, { useEffect } from 'react';
import './musicianView.scss';
import { useHistory } from 'react-router-dom';
import { useActions } from 'src/hooks/use-actions';



const MusicianPackage = ({ backgroundImage, progress, text, dashboard, cardId }) => {
    const history = useHistory();
    const { getMusicianViewById } = useActions();

    const style = {
        background: `url(${backgroundImage}) no-repeat`,
        backgroundSize: 'cover',
        minHeight: dashboard ? '200px' : '245px',
        maxWidth: dashboard ? '125px' : '200px',
        borderRadius: dashboard ? '20px' : ''
    }
    //   useEffect(() => {
    //     // console.log('progress ', progress)

    //   }, [])

    const handleSelectedCard = () => {
        // console.log("cardId", cardId);
        getMusicianViewById(cardId);
        history.push('/experienceListing')
    }

    return (
        <div className="text-white p-3 mr-1 mb-1 d-flex flex-column justify-content-between" style={style}>
            <div className="progress mx-2 mt-2" style={{ height: '18px', borderRadius: '10px' }}>
                <div className="progress-bar bg-primary" role="progressbar" style={{ width: `${progress}%`, fontWeight: '800', lineHeight: '18px' }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">{(progress === '100') ? 'Online' : ''}</div>
            </div>
            <h5 className="text-center">{text}</h5>
            <div className="d-flex">
                <button onClick={() => handleSelectedCard(cardId)} className="btn btn-block btn-primary text-white mb-2 packButton">Bearbeiten</button>
            </div>
        </div>
    )
}

export default MusicianPackage;

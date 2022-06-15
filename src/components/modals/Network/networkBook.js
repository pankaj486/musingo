import React from 'react';
import Package from '../../package/Package';
import Background from '../../../assets/images/modalBackground.png';
import Model from '../../../assets/images/model.png';

const NetworkBook = ({ setProgress, text }) => {

    return (
        <div className="defContainer text-center">
            <h5 className="text-center">Antworten</h5>
            <p className="font-italic">{text}</p>
            <div className="d-flex flex-wrap">
                <div
                    style={{ maxWidth: '180px' }}
                    className="mx-auto swiper-slide mt-4">
                    <Package
                        backgroundImage={Background}
                        modelImage={Model}
                        title="Learn  traditionally"
                        fromSwiper={true}
                        price="15" />
                </div>
            </div>
            <button className="btn btn-primary text-white py-2 mx-auto mt-5 px-5" onClick={setProgress}>Antwort absenden</button>
        </div>
    )
}

export default NetworkBook;

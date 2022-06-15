import React from 'react';
import Package from '../../package/Package';
import Background from '../../../assets/images/modalBackground.png';
import Model from '../../../assets/images/model.png';
import { useState } from 'react';

const Existing = ({ setProgress }) => {

    const existingPackages = [1, 2, 3];
    const [selectedPackage, setSelectedPackage] = useState(null)

    return (
        <div className="defContainer networkForm text-center">
            <h5 className="text-center">Bestehende Experience verlinken</h5>
            <input style={{ maxWidth: '250px' }} type="text" placeholder="Meine Experiences durchsuchen" className="mx-auto br-20 text-center form-control musingoo-input my-4 p-2" />
            <div className="d-flex flex-column flex-md-row align-items-center">
                {existingPackages.map((pack, index) => {
                    return <div
                        style={{ maxWidth: '200px' }}
                        className={"mx-1 swiper-slide bookingPackage " + (index === selectedPackage ? 'activePackage' : '')}
                        onClick={() => { (index === selectedPackage) ? setSelectedPackage(null) : setSelectedPackage(index) }}>
                        <Package
                            key={index}
                            backgroundImage={Background}
                            modelImage={Model}
                            title="Learn  traditionally"
                            price="15"
                            fromSwiper={true}

                        />
                    </div>
                })}
            </div>
            <button className="btn btn-primary text-white py-2 mx-auto mt-2 px-5" onClick={setProgress}>Weiter</button>
        </div>
    )
}

export default Existing;

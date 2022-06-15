import React from 'react';
import './feedback.scss';

const SubscriptionPackage = ({ price, discount, oneTimePayment, beliebt }) => {
    return (
        <div className="priceBoxBorder px-3 pb-5 pt-4 mx-md-3 mb-2 mb-md-0" style={{ position: 'relative' }}>
            {beliebt && <div className="beliebt">Beliebt</div>}
            <p className="mb-0 font-32 font-weight-bold">{price}€</p>
            <p className="font-12">pro Einheit</p>
            <div className="badge badge-primary text-white mt-2 mb-3 px-3 py-2" style={{ borderRadius: '20px' }}>
                <p className="mb-0 font-14">{discount}% Rabatt</p>
            </div>
            <p className="font-14 mb-0">Einmalzahlung</p>
            <p className="font-14">{oneTimePayment}€</p>
            <div className="mx-4">
                <button className="btn btn-block btn-primary text-white ">
                    Auswählen
            </button>
            </div>
        </div>
    )
}

export default SubscriptionPackage;

import React from 'react';
import SubscriptionPackage from './subscriptionPackage';
import InfoIcon from '../../../assets/images/info.png';
import BG from '../../../assets/images/experience-bg.png';
import User from '../../../assets/images/instructor.png';
import './feedback.scss';

const Feedback = () => {
    const style = {
        background: `url(${BG}) no-repeat`,
        backgroundSize: 'cover',
        minHeight: '60px',
        width: '80px',
        borderRadius: '12px',
        backgroundPosition: 'center'
    }

    return (
        <div className="container">
            <div className="defContainer mx-2 mx-md-5 px-md-5 d-flex justify-content-center align-items-center text-center">
                <div className="flex-1 mx-md-5">
                    <h1>Du bist happy?</h1>
                    <p>
                        Verringere deinen Unterrichtspreis. Wähle ein Abo und spare bis zu 108€!
                        <br />
                        <span className="font-weight-bold">
                            Momentan zahlst du monatlich 35€.
                    </span>
                    </p>
                    <div className="d-flex flex-column mt-5 flex-md-row mx-2 mx-md-4">
                        <div className="flex-1">
                            <p className="font-32">3 Monate</p>
                            <SubscriptionPackage price={28} discount={10} oneTimePayment={20} />
                        </div>
                        <div className="flex-1">
                            <p className="font-32">6 Monate</p>
                            <SubscriptionPackage price={28} discount={10} oneTimePayment={20} />
                        </div>
                        <div className="flex-1">
                            <p className="font-32">12 Monate</p>
                            <SubscriptionPackage beliebt={true} price={28} discount={10} oneTimePayment={20} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="feedBackInfo d-flex flex-column">
                <div className="d-flex align-items-center defBorder mb-4">
                    <div style={style} className="d-flex justify-content-center align-items-center">
                        <img src={User} className="rounded-circle" width="25px" alt="user" style={{ border: '3px solid white' }} />
                    </div>
                    <p className="ml-3 pr-4 mb-0 font-weight-bold">Learn Djambe like a pro</p>
                </div>
                <div className="">
                    <div className="defBorder d-flex flex-column justify-content-center align-items-center px-4 py-3">
                        <img src={InfoIcon} alt="info" width="70px" />
                        <h5 className="mt-2">So funktioniert’s</h5>
                        <p className="font-12 text-center" style={{ lineHeight: '1.1' }}>Beim Abonnement leistet du
                        deine Service Gebühr lediglich
                        einmalig. Danach zahlst du
                        deine monatliche Rate zum
                        rabattierten Preis.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feedback

import React, { useState } from 'react'
import SepaImage from '../../../../assets/images/sepa.png';
import MasterCard from '../../../../assets/images/masterCard.png';
import Plus from '../../../../assets/images/paymentPlus.png';

const Bookingpayment = (props) => {

    const [selectedMethod, setSelectedMethod] = useState(null);

    return (
        <div className="mt-4">
            <div className={props.fromBooking ? "text-left" : "text-center"}>
                <button
                    onClick={() => setSelectedMethod(0)}
                    className={"btn paymentButton " + (selectedMethod === 0 ? 'activePaymentButton' : '')} >
                    <img width="88x" src={SepaImage} alt="sepa" />
                </button>
                <button
                    onClick={() => setSelectedMethod(1)}
                    className={"btn paymentButton " + (selectedMethod === 1 ? 'activePaymentButton' : '')} >
                    <img width="70px" src={MasterCard} alt="masterCard" />
                </button>
                <button
                    onClick={() => setSelectedMethod(2)}
                    className={"btn paymentButton " + (selectedMethod === 2 ? 'activePaymentButton' : '')} >
                    <img width="30px" src={Plus} alt="plus" />
                </button>
            </div>
            <div className="pl-5 pl-sm-4 pl-md-0">
                <div className="custom-control custom-checkbox mb-2 font-12">
                    <input type="checkbox" className="custom-control-input" id="desktopNotifications" />
                    <label className="custom-control-label bookingLabel" for="desktopNotifications">
                        <span>Ich akzeptiere die <a> allgemeinen Geschäftsbedingungen und Datenschutzbestimmungen</a></span>
                    </label>
                </div>
            </div>
        </div >

    )
}

export default Bookingpayment;
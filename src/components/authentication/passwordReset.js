import React, { useState } from 'react'
import { Modal, ModalBody } from 'reactstrap';
import './register.scss';
import { useHistory } from 'react-router-dom';
import { loginService } from './loginService';
import { toastifyErrorMessage, toastifySuccessMessage } from '../Toastify/toastify';
import { usePasswordResetCreate } from 'src/generated/apiFetchers'

const PasswordResetComponent = (props) => {

    const [email, setEmail] = useState('');

    let {
        modal,
        toggleModal,
        toggleLoginModalFromPasswordResetModal
    } = props;
    let [active, setActive] = useState(1);
    const history = useHistory();

    const { mutate: passwordReset } = usePasswordResetCreate({})

    // console.log("handle", handle)

    const toggle = (e) => {
        toggleModal(e);
    };

    const toggleLoginModal = (e) => {
        toggleLoginModalFromPasswordResetModal(e);
    }


    // const handlePasswordReset = (e) => {
    //     if (email) {
    //         loginService.passwordReset(email);
    //         toastifySuccessMessage("Email Sent")
    //         history.push('/passwordReset');
    //     }else{
    //         toastifyErrorMessage("Please Enter Email!");
    //     }
    //     toggle(e);
    // }

    //  const handlePasswordReset = (e) => {
    //     passwordReset({email: email}).then((res) => {
    //         toastifySuccessMessage("Email Sent")
    //         console.log("passwordReset Response", res)
    //         history.push('/passwordReset');
    //     }).catch((error) => {
    //         console.log("error", error)
    //         toastifyErrorMessage(error.message)
    //     });
    //     toggle(e);
    // }

    const handlePasswordReset = (e) => {
        passwordReset({ email: email }).then((res) => {
            toastifySuccessMessage("please check your email")
            console.log("passwordReset Response", res)
        }).catch((error) => {
            console.log("error", error)
            toastifyErrorMessage(error.data.email[0])
        });
    }

    return (
        <div>
            <div>
                <Modal isOpen={modal} toggle={toggle} centered={true} className="register">
                    <ModalBody style={{ background: 'none' }}>
                        <div className="passwordResetModal bg-white d-flex flex-column justify-content-center text-light pad-4">
                            <div key={active} className="modalText text-center passwordReset">
                                <h3 className="font-weight-bold">Log-In</h3>
                                <p className="mb-3">Gib deine Emailadresse ein, um ein Neus Passwort zu bestimmen</p>
                                <div className="d-flex flex-column justify-content-center text-center p-2 mt-5">
                                    <div className="input-group mb-3">
                                        <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control formFieldHeight" placeholder="Deine E-Mailadresse" aria-label="Deine E-Mailadresse" />
                                    </div>
                                    <button type="button" disabled={!email} className="btn btn-primary font-weight-bold btn-lg btn-block text-light small-font formFieldHeight mt-5" onClick={handlePasswordReset}>Link senden</button>
                                    <a href="" className="text-muted pt-1" onClick={toggleLoginModal} >Zurück</a>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        </div>
    )
}

export default PasswordResetComponent;
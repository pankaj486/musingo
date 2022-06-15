import React, { useState } from 'react';
import '../../authentication/register.scss';
import { loginService } from 'src/components/authentication/loginService';
import { useHistory } from 'react-router-dom';
import { toastifyErrorMessage, toastifySuccessMessage } from 'src/components/Toastify/toastify';

export const PasswordReset = () => {

    const [password, setPassword] = useState();
    const [repeatPassword, setRepeatPassword] = useState();

    const history = useHistory();

    const pathName = window.location.pathname
    const token = pathName.substring(15);

    const handlePasswordCofirm = () => {
        try {
            if (password && repeatPassword && token && password === repeatPassword) {
                loginService.passwordConfirm(password, token);
                toastifySuccessMessage("Password Reset")
                history.push('/');
            } else if (password !== repeatPassword) {
                toastifyErrorMessage("Password did't match")
            } else {
                toastifyErrorMessage("enter password & confirm password")
            }
        } catch (e) {
            throw new Error(e);
        }
    }


    return (
        <div className="modalText text-center passwordResetPage d-flex flex-column justify-content-center align-items-center">
            <div>
                <h3 className="font-weight-bold">Passwort Reset</h3>
                <p className="mb-3">Wähle ein neues Passwort, dass sicher ist</p>
                <div className="d-flex flex-column justify-content-center text-center p-2 mt-5">
                    <div className="input-group mb-3">
                        <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control formFieldHeight" placeholder="Neues Passwort" aria-label="Neues Passwort" />
                    </div>
                    <div className="input-group mb-3">
                        <input onChange={(e) => setRepeatPassword(e.target.value)} type="password" className="form-control formFieldHeight" placeholder="Neues Passwort wiederholen" aria-label="Neues Passwort wiederholen" />
                    </div>
                    <button onClick={handlePasswordCofirm} type="button" className="btn btn-primary font-weight-bold btn-lg btn-block text-light small-font formFieldHeight mt-5">Bestätigen</button>
                </div>
            </div>
        </div>
    )
}

export default PasswordReset;

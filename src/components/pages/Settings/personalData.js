import React, { useEffect, useState } from 'react';
import './settings.scss';
import { Link } from "react-router-dom";
import { service } from "src/services/AuthService/authService";
import { useUserMeProfilePartialUpdate } from "src/generated/apiFetchers"
import { toastifyErrorMessage, toastifySuccessMessage } from "src/components/Toastify/toastify";
import { Spinner } from 'reactstrap';




const PersonalData = () => {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [mobile, setMobile] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const { mutate: updateUserProfile } = useUserMeProfilePartialUpdate({})


    const getUser = async () => {
        service.get_user_profile().then((response) => {
            setFirstName(response.data.first_name);
            setLastName(response.data.last_name);
        });
        const response = await service.getUser();
        console.log(response)
        setEmail(response.data.email);
    }
    useEffect(() => {
        getUser();
    }, []);


    async function formSubmit() {
        let formData = new FormData();
        if (formData) {
          formData.append("first_name", firstName);
          formData.append("last_name", lastName);
          formData.append("email", email)
          updateUserProfile(formData);
          toastifySuccessMessage("form submitted")
        } else {
          toastifyErrorMessage("Not Valid Form")
        }
        setIsLoading(true)
      }


    return (
        <div>
            <h5>Persönliche Daten</h5>
            <p>Achte darauf, dass diese Infos korrekt sind, damit du als Kunde und als Anbieter kontaktiert und benachrichtigt werden kannst.</p>
            <div className="settings">
                <label htmlFor="Vorname" className="mb-2">Vorname</label>
                <input
                    type="text"
                    name="Vorname"
                    value={firstName || ''}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="form-control musingoo-input mb-2"
                />

                <label htmlFor="Nachname" className="mb-2">Nachname</label>
                <input
                    type="text"
                    name="Nachname"
                    value={lastName || ''}
                    onChange={(e) => setLastName(e.target.value)}
                    className="form-control musingoo-input mb-2"
                />

                <label htmlFor="E-Mail" className="mb-2">E-Mail</label>
                <input
                    type="text"
                    name="E-Mail"
                    value={email || ''}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control musingoo-input mb-2"
                />

                <label htmlFor="Mobilnummer" className="mb-2">Mobilnummer</label>
                <input
                    type="text"
                    name="Mobilnummer"
                    placeholder='Mobilenummer'
                    value={mobile || ''} 
                    onChange={(e) => setMobile(e.target.value)}
                    className="form-control musingoo-input mb-2"
                />

                <label htmlFor="Mobilnummer" className="mb-2">Mobilnummer</label>
                <div className="d-flex flex-column">
                    <div className="d-flex flex-column flex-md-row jointInput">
                        <input
                            type="text"
                            name="Straße"
                            placeholder="Straße"
                            className="form-control musingoo-input mb-2 mr-2"
                        />
                        <input
                            type="text"
                            name="Nr."
                            placeholder="Nr."
                            className="form-control musingoo-input mb-2"
                        />
                    </div>
                    <div className="d-flex flex-column flex-md-row jointInput">
                        <input
                            type="text"
                            name="PLZ" placeholder="PLZ"
                            className="form-control musingoo-input mb-2 mr-2"
                        />
                        <input
                            type="text"
                            name="Ort" placeholder="Ort"
                            className="form-control musingoo-input mb-2"
                        />
                    </div>
                </div>
            </div>
            <button onClick={formSubmit} className="btn btn-primary px-4 py-2 text-white mb-2 speichernButton">
                {isLoading ? <Spinner /> : 'Speichern'}
            </button>
            {/* <div className="d-flex justify-content-end">
                <Link to="/profile" className="btn btn-primary text-white">Speichern</Link>
            </div> */}
        </div>

    )
}

export default PersonalData

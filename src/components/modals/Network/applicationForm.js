import React from 'react'

const ApplicationForm = ({ setProgress }) => {
    return (
        <div className="text-center defContainer networkForm">
            <h5 className="text-center">Ich suche </h5>
            <div className="d-flex flex-column flex-md-row align-items-center">
                <input type="text" placeholder="Gitarrenunterricht" className="br-20 mr-2 flex-2 text-center form-control musingoo-input my-4 p-2" />
                <input type="text" placeholder="Preis" className="br-20 flex-1 text-center form-control musingoo-input my-4 p-2" />
            </div>
            <p className="text-center font-weight-bold font-12 mb-0">Beschreibung</p>
            <textarea type="text" placeholder="Ich suche …" className="br-20 mx-auto text-center form-control musingoo-input mt-2 mb-4 p-2" />
            <button className="btn btn-primary text-white py-2 mx-auto mt-2" onClick={setProgress}>Gesuch erstellen</button>
        </div>
    )
}

export default ApplicationForm

import React from 'react'

const Reply = ({ setProgress }) => {
    return (

        <div className="text-center networkForm">
            <h5 className="text-center">Antworten</h5>
            <textarea rows="5" type="text" placeholder="Hi, ich gerne biete ich das an." className="mt-5 br-20 text-center form-control musingoo-input mt-2 mb-4 p-2" />
            <div className="d-flex">
            <button className="btn btn-primary text-white py-4 px-3 mt-2 mr-2" onClick={setProgress}>Bestehende Experience verlinken</button>
            <button className="btn btn-primary text-white py-4 px-3 mt-2 ml-2" onClick={setProgress}>Neue Experience erstellen</button>
            </div>
        </div>
    )
}

export default Reply;

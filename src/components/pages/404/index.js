import React from 'react'
import './style.scss'

const Error404Page = ({

}) => {
    return (
        <div className="error404Page">
            <div className="error404PageHeader">
                <h1 className="error404PageHeaderTitle">
                    {'Hast du dich vertippt?'}
                </h1>
                <p className="error404PageHeaderDesc">
                    {'Diese Seite konnte leider nicht geladen werden. Gehe stattdessen zu:'}
                </p>
            </div>
            <div className="error404PageButtons">
                <div className="error404PageButtonsItem">
                    <button 
                        className="btn btn-outline-primary" 
                        onClick={() => console.log('clicked experience finden')}>
                        {'Experiences finden'}
                    </button>
                </div>
                <div className="error404PageButtonsItem">
                    <button 
                        className="btn btn-outline-danger" 
                        onClick={() => console.log('clicked Zum Feed')}
                        style={{paddingLeft: '30px', paddingRight: '30px'}}>
                        {'Zum Feed'}
                    </button>
                </div>
                <div className="error404PageButtonsItem">
                    <button 
                        className="btn btn-outline-warning" 
                        onClick={() => console.log('clicked Trainer werden')}>
                        {'Experiences finden'}
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Error404Page
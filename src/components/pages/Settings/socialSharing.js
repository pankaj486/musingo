import React from 'react'

const SocialSharing = () => {
    return (
        <div>
            <h5>Social Sharing - Für Anbieter</h5>
            <div className="ml-5">

                <p className="font-18 font-weight-bold mt-4 mb-1">Social Connections</p>
                <div className="custom-control custom-checkbox mb-2">
                    <input type="checkbox" className="custom-control-input" id="socialConnection" />
                    <label className="custom-control-label" for="socialConnection">Teile meine MUSINGOO Aktivität mit
                    meinen verbundenen Apps (empfohlen)</label>
                </div>

                <p className="font-18 font-weight-bold mt-4 mb-1">Facebook timeline</p>
                <div className="custom-control custom-checkbox mb-2">
                    <input type="checkbox" className="custom-control-input" id="facebookTimeline" />
                    <label className="custom-control-label" for="facebookTimeline">Zeige meine Inserate in meiner
                    Facebook Timeline (empfohlen)
                    </label>
                </div>

                <p className="font-18 font-weight-bold mt-4 mb-1">Search Engines</p>
                <div className="custom-control custom-checkbox mb-2">
                    <input type="checkbox" className="custom-control-input" id="searchEngine" />
                    <label className="custom-control-label" for="searchEngine">Zeige meine Inserate in Suchmaschinen (empfohlen)</label>
                </div>
            </div>
        </div>
    )
}

export default SocialSharing

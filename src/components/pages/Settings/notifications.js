import React from 'react'

const Notifications = () => {
    return (
        <div>
            <h5>Benachrichtigungen via</h5>
            <p className="text-primary text-right">Bearbeiten unter Profil</p>
            <div className="settings pl-5">
                <label htmlFor="E-mail">E-mail</label>
                <a href="felix@musingoo.de">felix@musingoo.de</a>

                <label htmlFor="">Account Alerts, Verifizierungen, Buchunganfragen</label>
                <p>+49 *** **** 655</p>

                <label htmlFor="">Nachrichten von Kunden</label>
                <p>+49 *** **** 655</p>
            </div>
            <h5 className="mt-4">Benachrichtigungen</h5>
            <div className="pl-5">
                <div className="custom-control custom-checkbox mb-2">
                    <input type="checkbox" className="custom-control-input" id="email" />
                    <label className="custom-control-label" for="email">E-mail</label>
                </div>
                <div className="custom-control custom-checkbox mb-2">
                    <input type="checkbox" className="custom-control-input" id="pushNotifications" />
                    <label className="custom-control-label" for="pushNotifications">Push notifications</label>
                </div>
                <div className="custom-control custom-checkbox mb-2">
                    <input type="checkbox" className="custom-control-input" id="desktopNotifications" />
                    <label className="custom-control-label" for="desktopNotifications">Desktop notifications</label>
                </div>
            </div>

            <h5 className="mt-4">Benachrichtigungen</h5>
            <div className="pl-5">
                <div className="custom-control custom-checkbox mb-2">
                    <input type="checkbox" className="custom-control-input" id="email" />
                    <label className="custom-control-label" for="email">SMS an +49 *** **** 655</label>
                </div>
            </div>
        </div>
    )
}

export default Notifications

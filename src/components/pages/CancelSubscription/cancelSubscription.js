import React, { useState } from 'react'
import CancelOptions from './cancelOptions';
import ExperienceBG from '../../../assets/images/experience-bg.png';
import Model from '../../../assets/images/model.png';
import CancelExperience from './cancelExperience';
import SubmitCancellation from './submitCancellation';
import ConfirmCancellation from './confirmCancellation';
import ConfirmCancellationReceived from './confirmCancellationReceived';
import SubscriptionRenewal from './subscriptionRenewal';

const CancelSubscription = () => {

    const [activeState, setActiveState] = useState(0);

    return (
        <div className="container">
            <div className="defContainer d-flex justify-content-center align-items-center pt-5">
                {activeState === 0 &&
                    < CancelOptions
                        bg={ExperienceBG}
                        model={Model}
                        text={'Learn Djambe traditionally'}
                        group={'Gruppe A'}
                        next={() => setActiveState(activeState + 1)} />
                }
                {activeState === 1 &&
                    < CancelExperience
                        bg={ExperienceBG}
                        model={Model}
                        text={'Learn Djambe traditionally'}
                        group={'Gruppe A'}
                        next={() => setActiveState(activeState + 1)} />
                }
                {activeState === 2 &&
                    < SubmitCancellation
                        bg={ExperienceBG}
                        model={Model}
                        text={'Learn Djambe traditionally'}
                        group={'Gruppe A'}
                        next={() => setActiveState(activeState + 1)} />
                }
                {
                    activeState === 3 &&
                    <ConfirmCancellation
                        title={'Kündigung noch nicht möglich'}
                        desc={'Da du ein Abonnement gebucht hast, kannst du den Unterricht nicht direkt kündigen. Mit dieser Kündigung Endet das Abonnement zu folgendem Datum. Dein Unterricht geht bis dahin weiter.'}
                        time={'12.01.2020'}
                        next={() => setActiveState(activeState + 1)}
                    />
                }
                {
                    activeState === 4 &&
                    <ConfirmCancellation
                        title={'Kündigung noch nicht möglich'}
                        desc={'Da dein Kunde ein Abonnement gebucht hat, kannst du diese Experience nicht direkt kündigen. Mit dieser Kündigung endet das Abonnement und deine Verpflichtung Unterricht zu geben zu folgendem Datum.'}
                        time={'02.02.2022'}
                        next={() => setActiveState(activeState + 1)}
                    />
                }
                {
                    activeState === 5 &&
                    <ConfirmCancellationReceived
                        title={'KUNDEXX hat gekündigt'}
                        desc={'Hallo Max, wir müssen leider den Unterricht für Tine Kündigen, da Sie jetzt in Grundschule geht. Wir empfehlen dich auf jedenfalls wärmstens weiter.'}
                        time={'02.02.2022'}
                        bg={ExperienceBG}
                        model={Model}
                        text={'Learn Djambe traditionally'}
                        group={'Gruppe A'}
                        next={() => setActiveState(activeState + 1)}
                    />
                }
                {
                    activeState === 6 &&
                    <ConfirmCancellationReceived
                        title={'Kündigung noch nicht möglich'}
                        desc={'Hallo Max, wir müssen leider den Unterricht für Tine Kündigen, da Sie jetzt in Grundschule geht. Wir empfehlen dich auf jedenfalls wärmstens weiter.'}
                        time={'02.02.2022'}
                        warning={'Da KUNDE ein Abonnement bei dir gebucht hat wird dein Unterricht und deine Zahlungen fortgeführt bis das Abo endet. Der Unterricht und die Zahlungen enden am'}
                        bg={ExperienceBG}
                        model={Model}
                        text={'Learn Djambe traditionally'}
                        group={'Gruppe A'}
                        next={() => setActiveState(activeState + 1)}
                    />
                }
                {
                    activeState === 7 &&
                    <ConfirmCancellationReceived
                        title={'TRAINERNAME hat gekündigt'}
                        desc={'Hallo Max, wir müssen leider den Unterricht für Tine Kündigen, da Sie jetzt in Grundschule geht. Wir empfehlen dich auf jedenfalls wärmstens weiter.'}
                        time={'02.02.2022'}
                        bg={ExperienceBG}
                        model={Model}
                        text={'Learn Djambe traditionally'}
                        group={'Gruppe A'}
                        next={() => setActiveState(activeState + 1)}
                    />
                }
                {
                    activeState === 8 &&
                    <ConfirmCancellationReceived
                        title={'Trainer hat gekündigt'}
                        desc={'Hallo Max, wir müssen leider den Unterricht für Tine Kündigen, da Sie jetzt in Grundschule geht. Wir empfehlen dich auf jedenfalls wärmstens weiter.'}
                        time={'02.02.2022'}
                        warning={'Da du ein Abonnement gebucht hast wird dein Unterricht und deine Zahlungen fortgeführt bis das Abo endet. Der Unterricht und die Zahlungen enden am'}
                        bg={ExperienceBG}
                        model={Model}
                        text={'Learn Djambe traditionally'}
                        group={'Gruppe A'}
                        next={() => setActiveState(activeState + 1)}
                    />
                }
                {
                    activeState === 9 &&
                    <SubscriptionRenewal
                        title={'Abonnement Erneuerung steht bevor'}
                        desc={'Momentan hat dein Kunde NAME ein ABONNEMENT TYPE bei dir gebucht. Dieses erneuert sich am RENEWAL DATE. Dadurch erhältst du den Vorteil, dass dein Kunde über den Abonnement Zeitraum nicht kündigen kann und du hast die Sicherheit des Einkommens.Bitte bestätige kurz die Erneuerung und damit deine Kenntnisnahme, dass du während des Abonnement Zeitraumes ebenfalls nicht kündigen kannst.Falls du dies nicht beantwortest wird das Abonnement automatisch erneuert und fortgesetzt.'}
                        buttonText={'Abonnement Verlängerung bestätigen'}
                        returnText={'Zu monatlicher Kündigungsfrist zurückkehren'}
                        bg={ExperienceBG}
                        model={Model}
                        text={'Learn Djambe traditionally'}
                        group={'Gruppe A'}
                        next={() => setActiveState(activeState + 1)}
                    />
                }
                {
                    activeState === 10 &&
                    <SubscriptionRenewal
                        title={'Abonnement Änderung durch Trainer'}
                        desc={'Momentan hast du bei TRAINER ein 3 Monats-Abonnement gebucht. Dieses erneuert sich am RENEWAL DATE. Jedoch hat sich dein TRAINER{name} dazu entschieden, die Abonnement Option nicht weiterzuführen, um zukünftig flexibler zu sein. Dein Unterricht läuft ab dem RENEWAL DATE zum regulären Preis ohne Abonnement Rabatt weiter.'}
                        buttonText={'Alles klar'}
                        bg={ExperienceBG}
                        model={Model}
                        text={'Learn Djambe traditionally'}
                        group={'Gruppe A'}
                        next={() => setActiveState(activeState + 1)}
                    />
                }
                {
                    activeState === 11 &&
                    <SubscriptionRenewal
                        title={'Abonnement Änderung durch Trainer'}
                        desc={'Momentan hast du bei TRAINER ein 3 Monats-Abonnement gebucht. Dieses erneuert sich am RENEWAL DATE. Jedoch hat sich dein Trainer dazu entschieden, die Abonnement Option nicht weiterzuführen, um flexibler zu sein. Dein Unterricht läuft ab dem RENEWAL DATE auf der regulären monatlichen Basis zum regulären Preis ohne Abonnement Rabatt.'}
                        buttonText={'Alles klar'}
                        bg={ExperienceBG}
                        model={Model}
                        text={'Learn Djambe traditionally'}
                        group={'Gruppe A'}
                        next={() => setActiveState(activeState + 1)}
                    />
                }
            </div>
        </div>
    )
}

export default CancelSubscription

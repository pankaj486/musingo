import React from "react";
import {
  Switch,
  Route,
  useRouteMatch,
  Link,
  useLocation,
} from "react-router-dom";
import Profile from "./profile";
import PersonalData from "./personalData";
import { Payment } from "./Payment/Payment";
import Notifications from "./notifications";
import Account from "./account";
import Privacy from "./privacy";
import SocialSharing from "./socialSharing";
import { RequiresLoggedIn } from "../../HigherOrderComponents/RequiresLoggedIn/RequiresLoggedIn";

const Settings = () => {
  let { path, url } = useRouteMatch();
  const { pathname } = useLocation();

  return (
    <div className="container">
      <div className="defContainer mx-2 mx-md-0 d-flex flex-column flex-md-row justify-content-center">
        <div className="sidebar d-flex flex-column flex-1 justify-content-start align-items-start mt-5">
          <Link
            to={path}
            className={
              "defBorder settingButton px-3 py-1 mb-2 " +
              (pathname === `${url}` ? "activeSettingsButton" : "")
            }
          >
            Profil
          </Link>
          <Link
            to={`${path}/personalData`}
            className={
              "defBorder settingButton px-3 py-1 mb-2 " +
              (pathname === `${url}/personalData` ? "activeSettingsButton" : "")
            }
          >
            Persönliche Daten
          </Link>
          <Link
            to={`${path}/payments`}
            className={
              "defBorder settingButton px-3 py-1 mb-2 " +
              (pathname.includes(`${url}/payments`)
                ? "activeSettingsButton"
                : "")
            }
          >
            Zahlungen und Auszahlungen
          </Link>
          <Link
            to={`${path}/notifications`}
            className={
              "defBorder settingButton px-3 py-1 mb-2 " +
              (pathname === `${url}/notifications`
                ? "activeSettingsButton"
                : "")
            }
          >
            Benachrichtigungen
          </Link>
          <Link
            to={`${path}/accounts`}
            className={
              "defBorder settingButton px-3 py-1 mb-2 " +
              (pathname === `${url}/accounts` ? "activeSettingsButton" : "")
            }
          >
            Account und Sicherheit
          </Link>
          <Link
            to={`${path}/privacy`}
            className={
              "defBorder settingButton px-3 py-1 mb-2 " +
              (pathname === `${url}/privacy` ? "activeSettingsButton" : "")
            }
          >
            Deine Privatsphäre
          </Link>
          <Link
            to={`${path}/socialSharing`}
            className={
              "defBorder settingButton px-3 py-1 mb-2 " +
              (pathname === `${url}/socialSharing`
                ? "activeSettingsButton"
                : "")
            }
          >
            Mit freunden teilen
          </Link>
        </div>
        <div className="flex-1 mt-5 pl-2">
          <Switch>
            <Route exact path={path}>
              <Profile />
            </Route>
            <Route path={`${path}/personalData`}>
              <PersonalData />
            </Route>
            <Route path={`${path}/payments`}>
              <Payment />
            </Route>
            <Route path={`${path}/notifications`}>
              <Notifications />
            </Route>
            <Route path={`${path}/accounts`}>
              <Account />
            </Route>
            <Route path={`${path}/privacy`}>
              <Privacy />
            </Route>
            <Route path={`${path}/socialSharing`}>
              <SocialSharing />
            </Route>
          </Switch>
        </div>
        <div
          className="flex-1 d-flex justify-content-end align-items-end"
          style={{ zIndex: -1 }}
        >
          {/* <Link to="/settings" className="btn btn-primary text-white mb-2">Speichern</Link> */}
        </div>
        {/* <Link
          to="/settings"
          className="btn btn-primary px-4 py-2 text-white mb-2 speichernButton"
        >
          Speichern
        </Link> */}
      </div>
    </div>
  );
};

export default RequiresLoggedIn(Settings);

import React from "react";
import { Router, Route, Switch, useHistory } from "react-router-dom";

import ExperienceChoice from "./components/ExperienceChoice/ExperienceChoice";
import ClassesForm from "./components/ClassesForm/ClassesForm";
import JobsForm from "./components/JobsForm/JobsForm";
import InstrumentsForm from "./components/InstrumentsForm/InstrumentsForm";
import ConcertsForm from "./components/ConcertsForm/ConcertsForm";
import { ExperienceType } from "./models/ExperienceType";

import { ROUTES } from "./routes";
import { RequiresLoggedIn } from "../../HigherOrderComponents/RequiresLoggedIn/RequiresLoggedIn";

const CreateExperience: React.FC = () => {
  const history = useHistory();

  return (
    <Router history={history}>
      <Switch>
        <Route exact path={ROUTES.createExperience()}>
          <ExperienceChoice
            onSelect={(type) => history.push(ROUTES.createExperienceForm(type))}
          />
        </Route>
        <Route path={ROUTES.createExperienceForm(ExperienceType.Lesson)}>
          <ClassesForm />
        </Route>
        <Route path={ROUTES.createExperienceForm(ExperienceType.Job)}>
          <JobsForm />
        </Route>
        <Route path={ROUTES.createExperienceForm(ExperienceType.Instrument)}>
          <InstrumentsForm />
        </Route>
        <Route path={ROUTES.createExperienceForm(ExperienceType.Concert)}>
          <ConcertsForm />
        </Route>
      </Switch>
    </Router>
  );
};

export default RequiresLoggedIn(CreateExperience);

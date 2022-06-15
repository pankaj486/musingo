import React, { useState, createContext } from "react";

import { CreateProfileNameForm } from "./CreateProfileNameForm";
import { CreateProfileTypeForm } from "./CreateProfileTypeForm";
import { CreateProfileAvatarForm } from "./CreateProfileAvatarForm";
// import { CreateProfileVerifyEmail } from "./VerifyEmailForm";
import { CreateModalOn } from "./CreateModalOn";
import { CreateProfileSearchForm } from './CreateProfileSearchForm';

export type ProfileCreationWizardProps = {
  width: number;
  onClose: () => void;
};

export enum ProfileCreationSteps {
  Name,
  Search,
  Type,
  Avatar,
  modalOn
}
export const UserContext = createContext<any>([]);

export const ProfileCreationWizard: React.FC<ProfileCreationWizardProps> = ({
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState(ProfileCreationSteps.Name);
  const handleNextStep = () => setCurrentStep(currentStep + 1);
  const [val, setVal] = useState();

  // export const UserContext = createContext({})

  return (<UserContext.Provider value={[val, setVal]}>
    <React.Fragment>
    {currentStep === ProfileCreationSteps.Name && <CreateProfileNameForm onNext={handleNextStep} />}
    {currentStep === ProfileCreationSteps.Search && <CreateProfileSearchForm onNext={handleNextStep} />}
    {currentStep === ProfileCreationSteps.Type && <CreateProfileTypeForm onNext={handleNextStep} />}
    {currentStep === ProfileCreationSteps.Avatar && <CreateProfileAvatarForm onNext={handleNextStep} />}
    {/* {currentStep === ProfileCreationSteps.Verification  && <CreateProfileVerifyEmail    onNext={handleNextStep}/>} */}
    {currentStep === ProfileCreationSteps.modalOn && <CreateModalOn onNext={onClose} />}
  </React.Fragment>
  </UserContext.Provider>);
}

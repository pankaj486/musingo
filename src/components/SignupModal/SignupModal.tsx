import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";

import "./register.scss";
import "../../assets/theme/react-transition-animation.scss";
import { EmailSignUpForm } from "./EmailSignUpForm";
import { MethodSelect } from "./MethodSelect";
import { ProfileCreationWizard } from "../ProfileCreation/ProfileCreationWizard";

export type SignUpProps = {
  width: number;
  open: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
};

export enum SignUpSteps {
  MethodSelect,
  Email,
  Profile,
}

export const SignupModal: React.FC<SignUpProps> = ({
  width,
  open,
  onClose,
  onSwitchToLogin,
}) => {
  const [currentStep, setCurrentStep] = useState(SignUpSteps.MethodSelect);
  //const [phoneNumber, setPhoneNumber] = useState<string | null>(null);

  // const refArray: Array<HTMLInputElement | HTMLButtonElement | null> = Array(
  //     7
  // ).map(() => {
  //     return null;
  // });

  // const inputRef = useRef(refArray);

  // const handleKeyUp = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
  //     if (/^\d+$/.test(e.target.value)) {
  //         (inputRef.current[i + 1] as any).focus();
  //     } else {
  //         (inputRef.current[i] as any).value = null;
  //     }
  // };
  //
  // const fileInputRef = useRef<HTMLInputElement>(null);
  // const [blobURL, setBlobURL] = useState(Plus);
  //
  // const handleFileUpload = (file: any) => {
  //     setBlobURL(URL.createObjectURL(file));
  // };
  //
  // const [selectedProfile, setSelectedProfile] = useState<number | null>(null);

  return (
    <div>
      <Modal
        isOpen={open}
        toggle={() => onClose()}
        centered={true}
        className="register"
      >
        <ModalBody
          className={
            width > 1024 && currentStep === SignUpSteps.MethodSelect
              ? "firstModal"
              : "firstModal otherModal"
          }
        >
          {currentStep === SignUpSteps.MethodSelect && (
            <MethodSelect
              width={width}
              onSelect={(nextStep: any) => setCurrentStep(nextStep)}
              onToLogin={() => onSwitchToLogin}
            />
          )}
          {currentStep === SignUpSteps.Email && (
            <EmailSignUpForm
              onContinue={() => setCurrentStep(SignUpSteps.Profile)}
            />
          )}
          {currentStep === SignUpSteps.Profile && (
            <ProfileCreationWizard width={width} onClose={onClose} />
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

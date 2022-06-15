import React from "react";
import MusingooButton from "../MusingooButton/MusingooButton";

export type WeiterCtaProps = {
  ctaText?: string;
  nextStep?: () => void;
  background?: string;
  disabled?: boolean;
};

const WeiterCta: React.FC<WeiterCtaProps> = ({
  ctaText,
  nextStep,
  background,
  disabled,
}) => {
  return (
    <MusingooButton
      onClick={nextStep}
      style={{ backgroundColor: background }}
      disabled={disabled}
    >
      {ctaText || "Weiter"}
    </MusingooButton>
  );
};

export default WeiterCta;

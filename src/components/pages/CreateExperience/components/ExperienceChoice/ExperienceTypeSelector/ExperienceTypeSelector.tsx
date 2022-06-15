import React from "react";
import { Link } from "@material-ui/core";

export type ExperienceTypeSelectorProps = {
  onSelect: () => void;
  className: string;
  background: string;
};

const ExperienceTypeSelector: React.FC<ExperienceTypeSelectorProps> = ({
  onSelect,
  className,
  background,
  children,
}) => {
  return (
    <Link
      component="button"
      style={{ textDecoration: "none" }}
      onClick={() => onSelect()}
    >
      <div className="experience-type-overlay" />
      <div
        className={className}
        style={{ backgroundImage: `url(${background})` }}
      >
        <span className="type__name">{children}</span>
      </div>
    </Link>
  );
};

export default ExperienceTypeSelector;

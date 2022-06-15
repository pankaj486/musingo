import React, { Fragment } from "react";
import { LessonLevel } from "../../../../../generated/apiFetchers";
import {
  createStyles,
  InputBase,
  MenuItem,
  Select,
  Theme,
  withStyles,
} from "@material-ui/core";
import WeiterCta from "../../../../weiterCta/weiterCta";

import "../../../../inputAgreement/inputAgreement.scss";

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  })
)(InputBase);

export type LessonLevelSelectProps = {
  lessonLevels: LessonLevel[];
  currentLessonLevel: LessonLevel | undefined;
  onChange: (value: LessonLevel | undefined) => void;
  onSubmit: () => void;
};

export const LessonLevelSelect: React.FC<LessonLevelSelectProps> = ({
  lessonLevels,
  currentLessonLevel,
  onChange,
  onSubmit,
}) => {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onChange(
      lessonLevels.find((lessonLevel) => lessonLevel.uid === event.target.value)
    );
  };

  return (
    <div
      className="classes--experience-name mx-auto"
      style={{ maxWidth: "700px" }}
    >
      <Fragment>
        <h2 className="mx-2 mx-sm-5 px-sm-5 pt-4 mb-4 agHeader">
          Erfahrung der Schüler
        </h2>
        <p className="mx-2 mx-sm-5 px-sm-5">
          Ist die Experience für Anfänger oder Fortgeschrittene?
        </p>
        <Select
          value={currentLessonLevel?.uid || ""}
          label="Altersgruppe"
          onChange={handleChange}
          input={<BootstrapInput />}
          style={{ width: "50%", margin: "1em" }}
        >
          {lessonLevels.map((lessonLevel, index) => (
            <MenuItem key={index} value={lessonLevel.uid}>
              {/*instrument.icon ? (
                <Avatar src={instrument.icon} style={{ marginRight: "1em" }} />
              ) : (
                <Avatar style={{ marginRight: "1em" }} />
              )*/}
              {lessonLevel.name}
            </MenuItem>
          ))}
        </Select>
      </Fragment>
      <WeiterCta nextStep={onSubmit} disabled={!currentLessonLevel} />
    </div>
  );
};

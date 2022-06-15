import React, { Fragment } from "react";
import { Instrument } from "../../../../../generated/apiFetchers";
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

export type InstrumentSelectProps = {
  instruments: Instrument[];
  currentInstrument: Instrument | undefined;
  onChange: (value: Instrument | undefined) => void;
  onSubmit: () => void;
};

export const InstrumentSelect: React.FC<InstrumentSelectProps> = ({
  instruments,
  currentInstrument,
  onChange,
  onSubmit,
}) => {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onChange(
      instruments.find((instrument) => instrument.uid === event.target.value)
    );
  };

  return (
    <div
      className="classes--experience-name mx-auto"
      style={{ maxWidth: "700px" }}
    >
      <Fragment>
        <h2 className="mx-2 mx-sm-5 px-sm-5 pt-4 mb-4 agHeader">
          Welches Instrument
        </h2>
        <p className="mx-2 mx-sm-5 px-sm-5">
          Welches Instrument möchtest du unterrichten
        </p>
        <Select
          value={currentInstrument?.uid || ""}
          label="Instrument"
          onChange={handleChange}
          input={<BootstrapInput />}
          style={{ width: "50%", margin: "1em" }}
        >
          {instruments.map((instrument, index) => (
            <MenuItem key={index} value={instrument.uid}>
              {/*instrument.icon ? (
                <Avatar src={instrument.icon} style={{ marginRight: "1em" }} />
              ) : (
                <Avatar style={{ marginRight: "1em" }} />
              )*/}
              {instrument.name}
            </MenuItem>
          ))}
        </Select>
      </Fragment>
      <WeiterCta
        nextStep={onSubmit}
        disabled={!instruments}
        background={!instruments ? "grey" : undefined}
      />
    </div>
  );
};

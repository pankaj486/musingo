import React from "react";
import { CircularProgress, Modal } from "@material-ui/core";

export type LoaderModalProps = {
  open: boolean;
};

export const LoaderModal: React.FC<LoaderModalProps> = ({ open }) => {
  return (
    <Modal
      open={open}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress style={{ width: "10vh", height: "10vh" }} />
    </Modal>
  );
};

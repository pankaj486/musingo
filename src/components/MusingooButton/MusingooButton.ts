import { Button, styled } from "@material-ui/core";

export default styled(Button)({
  width: "250px",
  height: "45px",
  margin: "3px auto",
  backgroundColor: "#4ad9ca",
  textTransform: "none",
  borderRadius: "8px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "15px",
  fontWeight: "bold",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#5ae9da",
    borderColor: "#0062cc",
  },
});

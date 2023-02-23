import { createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() =>
  createStyles({
    rootApp: {
      // overfowX: "scroll",
      // overflowY: "auto",
      padding: "40px 50px",
      backgroundColor: "transparent",
      fontSize: 14,
      boxSizing: "border-box",
      width: "100%",
      margin: 0,
      justifyContent: "center",
    },
  })
);

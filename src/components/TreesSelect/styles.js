import { createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() =>
  createStyles({
    treeContainer: {
      marginTop: 20,
      "& .MuiFormControlLabel-root": {
        width: "100%",
      },
    },
    rowCategory: {
      width: "100%",
      marginLeft: 10,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    rightViewActions: {
      width: "20%",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    actionsRow: {
      width: "50%",
      display: "flex",
      justifyContent: "space-between",
      verticalAlign: "baseline",
    },
    productView: {
      width: "28%",
      textAlign: "center",
    },
  })
);

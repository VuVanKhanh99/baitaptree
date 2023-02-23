import { createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      ".MuiButtonBase-root": {
        boxShadow: "none !important",
        color: "#fff",
      },
    },
    containerActions: {
      width: "100%",
      "& .MuiOutlinedInput-input": {
        padding: "10px 13px !important",
      },
    },
    inputSearch: {
      width: "100%",
      outline: "none",
    },
    displayPath: {
      border: "1px solid #000",
      borderRadius: 4,
      minHeight: 45,
    },
    containerPath: {
      display: "flex",
      alignItems: "center",
      height: "100%",
      paddingLeft: 10,
    },
    chipItem: {
      lineHeight: 1.6,
    },
  })
);

import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { useStyles } from "./styles";
import { Button, Grid } from "@material-ui/core";

function FiltersAction(props) {
  const classes = useStyles();
  const [textAdd, setTextAdd] = useState("");
  return (
    <div className={classes.containerActions}>
      <Grid container>
        <Grid item xs={3}>
          <TextField
            variant="outlined"
            placeholder="Add new category item"
            className={classes.inputSearch}
            value={textAdd}
            onChange={(e) => {
              setTextAdd(e.target.value);
              if (e.keyCode === 13 || e.which === 13) {
                props.setNodeAdd(e.target.value);
              }
            }}
          />
        </Grid>
        <Grid item xs={7} className={classes.displayPath}>
          <div className={classes.containerPath}>
            {props.selectedPath?.length ? (
              props.selectedPath
                .map((selected) => (
                  <Button variant="contained" className={classes.chipItem}>
                    {selected}
                  </Button>
                ))
                .reduce((prev, curr) => {
                  return !prev
                    ? [curr]
                    : [...prev, <p style={{ margin: "0 10px" }}>/</p>, curr];
                }, null)
            ) : (
              <></>
            )}
          </div>
        </Grid>
        <Button variant="contained" onClick={() => props.setNodeAdd(textAdd)}>
          Add
        </Button>
      </Grid>
    </div>
  );
}

export default FiltersAction;
